/*判断对象是否为空 */
export const isEmptyObject=function (obj){
    for (let key in obj) {
      return true;
    }
    return false;
  }

// /*格式化时间毫秒 */
// export const getTime=function (timeStr){
//     let timer = new Date(timeStr);
//     let allSecond = timer/1000
//     let hour = parseInt(allSecond/(60*60));
//     let minute = parseInt(allSecond/60)%60
//     let second = allSecond%(60)
//     return hour + '小时' + minute + '分钟' + second + '秒'
// }

/*格式化毫秒为年月日时分秒 接受参数为毫秒字符串*/

export const getTime=function (timeStr){
  Date.prototype.Format = function(fmt) {
    let o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(let k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }

    return fmt;
  }
  let time=new Date(timeStr).Format("yyyy-MM-dd hh:mm:ss");
  return time
}

/*转换时间  为yy-mm-dd形式，不足两位用0填补，接受参数为length=3的数组['年','月','日']*/
export const formatTimeYYMMDD=function (timeAttr){
      function add0(str){
          if(str.length==1){
              return '0'+str
          }
          return str
      }
      let attr=[timeAttr[0],add0(timeAttr[1]),add0(timeAttr[2])]
      return attr.join('-')
}
