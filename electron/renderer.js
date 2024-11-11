/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */


var promise = fetch('http://localhost:3000/users').then(function(response) {
  //response.status表示响应的http状态码
  if(response.status === 200){
    //json是返回的response提供的一个方法,会把返回的json字符串反序列化成对象,也被包装成一个Promise了
    return response.json();
  }else{
    return {}
  }
});
   
promise = promise.then(function(data){
 //响应的内容
 document.querySelector('#name').innerHTML = data.name
 document.querySelector('#age').innerHTML = data.age
 document.querySelector('#website').innerHTML = data.website
}).catch(function(err){
 console.log(err);
})
