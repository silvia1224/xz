// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

//1.引入request-promise库
const rp=require("request-promise");
//2.添加入口函数
exports.main=async(event,context)=>{
    //2.1返回函数：向豆瓣发送请求
  var url =`http://api.douban.com/v2/movie/in_theaters`;
  url +=`?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  url +=`&start=${event.count}&count=`;
  url += `${event.count}`;
    //2.2返回函数结果
    return rp(url).then(res=>{ //发送请求 豆瓣
      return res;  //返回结果
    }).catch(err=>{    
      console.log(err); //出错输出问题信息
    })
}
  

// 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }