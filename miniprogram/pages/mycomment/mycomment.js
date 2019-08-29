// pages/mycomment/mycomment.js
//创建数据库实例对象
const db = wx.cloud.database({
  env: "silvia-hykyu"
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mycomments:[], //我评论的电影集合
    detail:{},  //所有电影详情
    //mydetail: {},  //当前电影详情
   // mymovieid:30135113
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //云数据库获取用户电影评论集合
    db.collection("comment").where({
      _openid: 'olAaq5Q3Q0ygjfUGk4pG71evLz7A',
    }).get({
      success: function (res) {
        //console.log(res.data);
        var mycomments = res.data;
        console.log(mycomments);
      }
    })
    //获取comment组件中的mList，并且保存起来
    var detail = wx.getStorageSync('mList');
    this.setData({//保存
      detail: detail
    })
    console.log(detail); 
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