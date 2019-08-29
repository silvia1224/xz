// pages/content/content.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{}  //当前电影详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取comment组件中的mList，并且保存起来
    //1.获取comment组件mList
    var detail = wx.getStorageSync('mList');
    //2.保存
     this.setData({
       detail: detail
     })
    //console.log(detail);
    //3.加载新电影详情信息
    //this.loadMore();
  },
  loadMore: function () {
    //组件创建成功后调用云函数显示当前电影列表
    //1.接收电影列表传递参数id
    var id = this.data.movieid;
    //console.log(id);
    //2.显示数据加载提示框
    wx.showLoading({
      title: '加载中...',
    })
    //3.调用云函数
    wx.cloud.callFunction({
      name: "findDetails",//云函数名
      //4.调用云函数 参数 id
      data: { id: id }
    }).then(res => {
      //5.接收云函数返回结果
      //console.log(res.result);
      var obj = JSON.parse(res.result);
      console.log(obj)
      //6.将返回结果保存 detail
      this.setData({
        detail: obj
      })
      //7.隐藏加载提示框
      wx.hideLoading()
    }).catch(err => {
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