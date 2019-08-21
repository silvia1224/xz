// pages/comment/comment.js
//12.创建数据库实例对象
const db=wx.cloud.database({
  env:"silvia-hykyu"
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",       //输入框中显示的内容
    score:0,          //用户评分
    movieid:26794435, //当前电影id
    detail:{},        //当前电影详细信息
    image:[],         //保存用户选中图片（预览）
    fileIds:[]        //保存上传图片fileID??         
  },
  submit:function(){
  //功能一：将选中图片上传云存储
    //1.显示数据加载中提示框
    wx.showLoading({
      title: '评论中...',
    })
    //2.创建数组（添加promise对象）
    var rows=[];
    //3.创建循环遍历选中图片数组中的内容
    for(var i=0;i<this.data.images.length;i++){
    //4.为每张图片创建promise对象
      rows.push(new Promise((resolve,reject)=>{
       //5.获取数组中当前图片的名称
       var item=this.data.images[i];
       console.log(item); 
      //6.创建正则表达式解析图片名称后缀
        //123.jpg   .jpg
        var suffix=/\.\w+$/.exec(item)[0];
        //console.log(suffix);
        //6.1创建新文件名称
        //var newFile=new Date().getTime()+suffix;
        //特殊情况：网络非常好，防止1毫秒上传过多图片
        var newFile = new Date().getTime()+Math.floor(Math.random()*9999) + suffix;
        //console.log(newFile);
       //7.上传图片
      wx.cloud.uploadFile({//上传函数
        cloudPath:newFile, //新文件名
        filePath:item,     //原先文件
        success:(res)=>{   //上传成功
      //8.上传成功获取当前图片fileID
      var fid=res.fileID;
      console.log(fid);
      //9.保存当前的fileID在data中
      this.data.fileIds.push(fid);
      //  this.setData({
      //    fileIds:ids
      //  })
      //10.执行成功  解析
      resolve();
      },
      fail:err=>{
        console.log(err);
      }
      }) 
      }))//push end
    }//for end
  //功能二：将留言/打分/fileID添加云数据库
  //11.等待所有promise对象执行完成，在回调函数完成功能二
  Promise.all(rows).then(res=>{
  //12在云数据库创建集合 comment
  //13程序开始位置创建数据库实例对象
  //14向comment集合添加一条记录
     //content留言
     //score分数
     //movieid 哪个电影评论
     //fileIds 上传图片id列表
  db.collection("comment").add({
    data:{
     content:this.data.conent,//留言
     score:this.data.score,//分享
     movieid:this.data.movieid, //电影id
     fileIds:this.data.fileIds //图片ids列表
    }
  }).then(res=>{
    //成功回调函数 隐藏加载提示框 提示文字
    wx.hideLoading();
    wx.showToast({
      title: '评论成功',
    })
  }).catch(err=>{
    //失败回调函数 隐藏加载提示框 提示文字
    wx.hideLoading();
    wx.showToast({
      title: '评论失败',
    })
  })
     
     
  });//Promise.all end
  },
  uploadImg:function(){
    //功能：选中多张图片/并且预览效果
    //选中多张图片
    wx.chooseImage({
      //数量9
      count:9,
      //图片类型 原图 压缩图
      sizeType:["original","compressed"],
      //图片来源  相册 相机
      sourceType:["album","camera"],
      success:(res)=>{//选中成功
      //res.tempFilePaths[]  选中图片列表
        console.log(res.tempFilePaths);
        var list=res.tempFilePaths;
        this.setData({
          //保存 data.images
          images:list
        })
        //在wxml循环显示images图片
      },
    })
   
  }, 
  onContentChange:function(event){
    //模拟双向绑定，评论输入框
    this.setData({
      content:event.detail
    })
   // console.log(this.data.content)
  },
  onScoreChange:function(event){
    //模拟双向绑定 用户评分
    this.setData({
      score: event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {
     //获取home组件中的id，并且保存起来
     //1.获取home组件id
     var id=options.id;
     //2.保存
     this.setData({
       movieid:id
     })
     //3.加载新电影详情信息
     this.loadMore();
  },
  loadMore:function () {
    //组件创建成功后调用云函数显示当前电影列表
    //1.接收电影列表传递参数id
    var id=this.data.movieid;
    console.log(id);
    //2.显示数据加载提示框
    wx.showLoading({
      title:'加载中...',
    })
    //3.调用云函数
    wx.cloud.callFunction({
      name:"findDetails",//云函数名
      //4.调用云函数 参数 id
      data:{id:id}
    }).then(res=>{
      //5.接收云函数返回结果
      //console.log(res.result);
      var obj=JSON.parse(res.result);
      console.log(obj)
      //6.将返回结果保存 detail
      this.setData({
        detail:obj
      })
      //7.隐藏加载提示框
     wx.hideLoading()
    }).catch(err=>{
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})