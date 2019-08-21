// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

//1.引入request-promise库
const rp=require("request-promise");//去node_modles/request-promise目录下查找
//2.添加入口函数，添加url
exports.main=async(event,context)=>{
  //2.1返回函数，向豆瓣发送请求
  var url =`http://api.douban.com/v2/movie/subject/${event.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  //2.2返回数据结果
  return rp(url) //返回函数调用结果
    .then(res => {//函数执行成功的回调函数
    return res;//豆瓣返回结果
  }).catch(err=>{ //函数执行失败回调函数
    console.log(err);//出错输出问题
  })
}


// 云函数入口函数
/* exports.main = async (event, context) => {
   const wxContext = cloud.getWXContext()

   return {
     event,
     openid: wxContext.OPENID,
     appid: wxContext.APPID,
     unionid: wxContext.UNIONID,
   }
 }
*/