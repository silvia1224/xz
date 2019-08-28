// pages/home/home.js
//功能一：当组件创建成功后调用云函数
//  获取第一页数据保存list
//功能二:当用户向上滑动加载下一页数据
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [] //电影列表
  },
  jumpComment:function(event){//自定义属性需要获得对象中方法和属性需要用event事件对象
    //功能：用户点击详情按钮跳转comment组件，注意：comment组件不能添加tabbar中，否则跳转失败
    //获取自定义属性id
    var id=event.target.dataset.id;
    //console.log(id);
    //跳转comment组件并且传递参数id
    var url="/pages/comment/comment?id="+id;
    wx.navigateTo({//保留跳转：保留原先组件跳转新组件
      url: url,
    })
    // wx.redirectTo({//删除跳转：将原先组件从内存中卸载，显示新组件
    //   url: url,
    // })
  },
  onLoad: function (options) {
    this.loadMore();
  },
  loadMore:function(){
    //功能：调用云函数并且传递参数
    wx.cloud.callFunction({
      //1.调用云函数
      //2.参数 start count
      name:"movie-list-1904",//云函数名
      data: {//向云函数传递参数
        start:this.data.list.length,//起始行
        count:4  //当前页一共几行
      }
    }).then(res=>{ //调用成功
      //3.获取云函数返回数据保存list
      //console.log(res.result);//返回结果是json string
      //json string ->js obj 保存
      var rows = JSON.parse(res.result);
      //console.log(rows)
      //保存电影列表数据list
      var list2 = this.data.list.concat(rows.subjects);//第二页
      //拼接后结果 保存起来
      this.setData({
        list:list2
      })
      //console.log(list2)
    }).catch(err=>{ //调用失败
      console.log(err); //失败原因
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
 

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
    //发送请求下载下一页数据
    this.loadMore();
    //console.log(123);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})