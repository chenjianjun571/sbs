/**
 * Created by chenjianjun on 16/3/29.
 */
const NetApi = {

  //Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
  /**
   * 封装网络请求
   * @param type: POST or GET
   * @param url: 请求地址
   * @param data: 参数信息,如{Name:"sanmao",Password:"sanmaoword"}
   * @param callback: 回调函数,函数说明
   * callback(err,data)
   */
  get(type, url, da, callback) {
    $.ajax({
      //提交数据的类型 POST GET
      type:type,
      //提交的网址
      url:url,
      //提交的数据
      data:da,
      //返回数据的格式
      datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
      //成功返回之后调用的函数
      success:function(data){
        callback(null, data);
      },
      //调用出错执行的函数
      error: function(err){
        callback(err);
      }
      //,
      //// 在请求之前调用的函数
      //beforeSend:function(){
      //}
      //,
      ////调用执行后调用的函数
      //complete: function(XMLHttpRequest, textStatus){
      //}
    });
  }

}

export { NetApi }

