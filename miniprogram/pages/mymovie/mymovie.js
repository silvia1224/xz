// pages/mymovie/mymovie.js
//创建数据库实例对象
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
      count:1,
      sizeType:["original","compressed"],
      sourceType:["album","camera"],
      success:(res)=>{
        console.log(res.tempFilePaths);
        var list=res.tempFilePaths;
        //3.将选中图片保存 data image
        this.setData({
          images:list,
        })
      },
    }) 
  },
  mysubmit: function () {
    //功能二：上传一张图片，将图片fileID，评论
    //添加云数据库集合中
    //1.显示加载提示框
    wx.showLoading({
      title: '评论提交中...',
    })
    db.collection("comment").add({
      //2.上传图片 将图片fileID保存data中
      //3.获取用户评论内容
      //4.将评论内容和fileID添加云数据库中
      data:{
        content:this.data.content, //留言
        fileID:this.data.fileID  //图片id
      }
    }).then(err=>{
      wx.hideLoading();
      wx.showToast({
        title: '评论成功',
      }).catch(err=>{
      wx.hideLoading();
      wx.showLoading({
        title: '评论失败',
      })
      })
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