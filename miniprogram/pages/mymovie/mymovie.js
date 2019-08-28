// pages/mymovie/mymovie.js
//创建数据库实例对象,指定环境id
const db=wx.cloud.database({
  env: "silvia-hykyu"
})

Page({
  /**
   * 页面的初始数据
   */
  data: {
    content:"",  //用户留言内容
    fileID:0,   //一次上传一张图片
    image:{}
  }, 
  myupload:function(){
    //功能一:选择图片保存data中image
    //1.显示加载提示框
    wx.showLoading({
      title: '图片上传中',
    })
    //2.选择一张图片 图片类型 图片来源 成功
    wx.chooseImage({
      count:1,//一次选择一张图片
      sizeType:["original","compressed"], //类型
      sourceType:["album","camera"],  //来源
      success:(res)=>{ //选择成功
        console.log(res.tempFilePaths);
        var file = res.tempFilePaths[0];//图片
        //3.将选中图片保存 data image
        this.setData({//保存
          image:file,
        })
        //隐藏加载提示框
        wx.hideLoading();
      },
    }) 
  },
  mysubmit: function () {
    //功能二：上传一张图片，将图片fileID，评论
    //添加云数据库集合中
    //1.显示加载提示框
    wx.showLoading({
      title: '评论中...',
    })
    //2.上传图片 将图片fileID保存data中
    var item=this.data.image;//选中图片
    var suffix=/\.\w+$/.exec(item)[0]; 
    var newFile=new Date().getTime()+suffix;
    wx.cloud.uploadFile({  //上传图片
      cloudPath:newFile,  //新文件名
      filePath:item,  //选中文件
      success:(res)=>{ //上传成功后
        var fileId=res.fileID;//云存储fileID
        console.log(fileId);
        //3.获取用户评论内容
        var content=this.data.content;
        //4.将评论内容和fileID添加云数据库中
        db.collection("mymovie").add({
          data: {
            content:content, //留言
            fileId: fileId  //图片id
          }
        }).then(res => {
          wx.showToast({
            title: '添加成功',
          })   
          }).catch(err => {
            wx.showLoading({
              title: '添加失败',
            })
        })  
      }
    })
   
  },
  onContentChange:function(event){
    //获取用户输入的文字
    this.setData({
      content:event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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