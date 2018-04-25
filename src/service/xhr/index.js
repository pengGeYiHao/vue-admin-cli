import {isEmptyObject} from '@/utils'

const rootPath='/newadmin'// 这里是后台接口的前边公共部分

function serilizeParam(data) {
    var str = "";
    if( data && data != null  && typeof data == 'object' ) {
      Object.keys(data).forEach(function (key){
        str += key + '=' + data[key] + '&';
      })
    } else {
        return str;
    }

    return str.slice(0, -1);
}

export default function (that,url,method,params,cb){
    if(method=='POST'){
        that.$http.post(url,params,{emulateJSON:true}).then(res=>{
            if(res.code==100){//后台规定的用户验证状态码
                that.$router.push('/login')
                return;
            }
            cb(res)
        },(err)=>{
            console.log(err.status)
            new Error(err)
        })
    }
    if(method=='GET'){
        let URL=''
        if(!!params && isEmptyObject(params)){
            URL=url+'?'+serilizeParam(params)
        }else {
          URL=url
        }
        that.$http.get(URL,{emulateJSON:true}).then(res=>{
            if(res.code==100){//后台规定的用户验证状态码
                // that.$router.push('/wumiadmin/login')
                return;
            }
            cb(res)
        },(err)=>{
          let route = that.$route.fullPath
          console.log(err.status)
          new Error(err)
        })
    }
}
