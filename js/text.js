
var 文本 =
"\
In [1]: let Dayanshifu = EntityFactory.getEntity('Dayanshifu')\n\
0ut [1]: [Entity: Dayanshifu] \n\
          <img src='https://static.codemao.cn/pickduck/HJTNP4yn6.jpg' style='border-radius:96px' width='128px' height='128px'/>\n\
          Hello! \n\
          I'm little颜\n\
In [2]: Dayanshifu.Site()\n\
Out [2]: *Web server started at: <a id='l1' href='https://dayanshifu.github.io'>\n\
In [3]: Dayanshifu.getWorks()\n\
Out [3]: {'hao-littleyan': {\n\
            'Description': '👏一个简洁方便的浏览器首页', \n\
            'Github': <a id='l2' href='https://github.com/Dayanshifu/hao-littleyan'>, \n\
            'Site': <a id='l3' href='https://github.com/Dayanshifu/hao-littleyan'>\n\
            }\n\
          }\n\
In [4]: Dayanshifu.getLinks()\n\
Out [4]: {'感谢你们的支持':'site',\n\
          '<img src='https://glacier.tyser.bf/res/icon/icon.svg' height='24px' width='24px'>冰川工作室':<a id='l4' href='https://glacier.tyser.bf/'>,\n\
          '<img src='https://slightning.rechen.xyz/res/SLIGHTNING/avatar.png' height='24px' width='24px'>SLIGHTNING':<a id='l5' href='https://slightning.rechen.xyz/'>,\n\
          '<img src='https://zmh-program.site/avatar/zmh-program.webp' height='24px' width='24px'>zmh-program': <a id='l6' href='https://zmh-program.site/'>,\n\
          '<img src='https://blog.lolicon.best/img/favicon.webp' height='24px' width='24px'>半昭の小站': <a id='l7' href='https://blog.lolicon.best/'>\n\
          }\n\
In [5]: getCountdown2zhongkao(Dayanshifu)\n\
Out [5]: '<span id='countdown'>'\n\
In [6]: getInfo()\n\
Out [6]: '©2021-<span id='2year'> <a id=l8 href='https://dayanshifu.github.io'>'\n\
In [7]: <span id='cursor'><script src='js/scroll.js'>";
var 输出区 = document.getElementById("input");

function 给标签上内容(){
var l1 = document.getElementById("l1");
var l2 = document.getElementById("l2");
var l3 = document.getElementById("l3");
var l4 = document.getElementById("l4");
var l5 = document.getElementById("l5");
var l6 = document.getElementById("l6");
var l7 = document.getElementById("l7");
var l8 = document.getElementById("l8");
var cursor = document.getElementById("cursor");
l1.innerHTML="'https://dayanshifu.github.io'"
l2.innerHTML="'https://github.com/Dayanshifu/hao-littleyan'"
l3.innerHTML="'https://github.com/Dayanshifu/hao-littleyan'"
l4.innerHTML="'https://glacier.tyser.bf/'"
l5.innerHTML="'https://slightning.rechen.xyz/'"
l6.innerHTML="'https://zmh-program.site/'"
l7.innerHTML="'https://blog.lolicon.best/'"
l8.innerHTML="little颜"
cursor.innerHTML='|'
var 今年 = new Date().getFullYear();
document.getElementById("2year").innerHTML = 今年;
}

var 中考日期 = new Date("2024-06-16T00:00:00"); 

function 计时器更新() {  
var 现在日期 = new Date();  
var 还剩 = 中考日期 - 现在日期;  
var 天数 = Math.floor(还剩 / (1000 * 60 * 60 * 24));  
var 小时数 = Math.floor((还剩 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));  
var 分钟数 = Math.floor((还剩 % (1000 * 60 * 60)) / (1000 * 60));  
var 秒数 = Math.floor((还剩 % (1000 * 60)) / 1000);  
var 倒计时文本 = 天数 + "d" + 小时数 + "h" + 分钟数 + "min" + 秒数 + "s";  
var 倒计时标签 = document.getElementById("countdown");  
倒计时标签.textContent = 倒计时文本;  
}  

function 终端输出(文本, i) {
if (i >= 文本.length) return;
var 字符 = 文本.charAt(i);
var 文字标签 = document.createElement("span");
if (字符 === "<") {
  var endIndex = 文本.indexOf(">", i);
  if (endIndex !== -1) {
    文字标签.innerHTML = 文本.substring(i, endIndex + 1);
    i = endIndex;
  }
}
else if (字符 === "\n") {
  输出区.appendChild(document.createElement("br"));
}
else if (字符 === " ") {
  文字标签.innerHTML = "&nbsp;";
}
else {
  文字标签.textContent = 字符;
}
输出区.appendChild(文字标签);
setTimeout(function () {
  终端输出(文本, i + 1);
}, 30);
setTimeout(function () {
  给标签上内容();
},0);
}
终端输出(文本, 0);
setInterval(计时器更新, 1000);
