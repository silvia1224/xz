// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myshow:true,
    polyline:[{//多个线段
      points:[
        {
          longitude: 120.181887,
          latitude: 30.248804
        },
        {
          longitude: 120.181660,
          latitude: 30.248012
        }
      ],
      color:"#000",
      width:10,
    }],
   /* controls:[{//控件
      id:0,
      iconPath:"/images/nz.jpg",
      position:{//控件位置
        left:260,//控件左位置 顶端位置
        top:250-50,
        width:50,//控件宽度和高度
        height:50 
      }
    }]
    */
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