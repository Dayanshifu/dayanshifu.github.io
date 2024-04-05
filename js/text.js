
var 文本 =
"\
In [1]: let Dayanshifu = EntityFactory.getEntity('Dayanshifu')\n\
0ut [1]: [Entity: Dayanshifu] \n\
          <img src='https://static.codemao.cn/pickduck/HJTNP4yn6.jpg' style='border-radius:96px' width='128px' height='128px'/>\n\
          Hello! \n\
          I'm Dayanshifu\n\
In [2]: Dayanshifu.Site()\n\
Out [2]: {'website':<a id='l1' href='https://dayanshifu.github.io'>,\n\
          '<image src='https://www.bilibili.com/favicon.ico'width='16px' height='16px'/>bilibili': <a id='l9' target='_blank' href='https://space.bilibili.com/593963058'>,\n\
          '<image src='https://static.codemao.cn/coco/player/unstable/B1F3qc2Hj.image/svg+xml'width='16px' height='16px'/>codemao': <a id='l10' target='_blank' href='https://shequ.codemao.cn/user/3408348'>,\n\
          '<image src='https://static.codemao.cn/pickduck/B19iXrknT.svg'width='16px' height='16px'/>github': <a id='l11' target='_blank' href='https://github.com/dayanshifu'>\n\
          }\n\
In [3]: Dayanshifu.getWorks()\n\
Out [3]: {'hao-littleyan': {\n\
            'Description': '👏一个简洁方便的浏览器首页', \n\
            'Github': <a id='l2' target='_blank' href='https://github.com/Dayanshifu/hao-littleyan'>, \n\
            'Site': <a id='l3' target='_blank' href='https://dayanshifu.github.io/hao-littleyan'>\n\
            }\n\
          }\n\
In [4]: Dayanshifu.getLinks()\n\
Out [4]: {'感谢你们的支持！':'site',\n\
          '<img src='https://glacier-studio.github.io/res/icon/icon.svg' height='24px' width='24px'>冰川工作室':<a id='l4' target='_blank' href='https://glacier-studio.github.io/'>,\n\
          '<img src='https://static.codemao.cn/pickduck/SJyHSSkh6.png' height='24px' width='24px'>SLIGHTNING':<a id='l5' target='_blank' href='https://slightning.rechen.xyz/'>,\n\
          '<img src='https://zmh-program.site/avatar/zmh-program.webp' height='24px' width='24px'>zmh-program': <a id='l6' target='_blank' href='https://zmh-program.site/'>,\n\
          '<img src='https://blog.lolicon.best/img/favicon.webp' height='24px' width='24px'>半昭の小站': <a id='l7' target='_blank' href='https://blog.lolicon.best/'>,\n\
          '<img src='https://static.codemao.cn/pickduck/SkmQEAE2T.jpg' height='24px' width='24px'>猫鱼a 软软弹弹的': '<a id='l12' target='_blank' href='https://zybqw.github.io/'>'\n\
          }\n\
In [5]: getCountdown2zhongkao(Dayanshifu)\n\
Out [5]: '<span id='countdown'>'\n\
In [6]: getInfo()\n\
Out [6]: '©2021-<span id='2year'> <a id=l8 href='https://dayanshifu.github.io'>'\n\
In [7]: <span id='cursor'><script src='js/scroll.js'>";
var 输出区 = document.getElementById("input");

function 给标签上内容(){
  try{var l1 = document.getElementById("l1");
  l1.innerHTML="'https://dayanshifu.github.io'";}catch{}
  try{var l9 = document.getElementById("l9");
  l9 .innerHTML="'https://space.bilibili.com/593963058'";}catch{}
  try{var l10 = document.getElementById("l10");
  l10.innerHTML="'https://shequ.codemao.cn/user/3408348'";}catch{}
  try{var l11 = document.getElementById("l11");
  l11.innerHTML="'https://github.com/dayanshifu'";}catch{}
  try{var l2 = document.getElementById("l2");
  l2.innerHTML="'https://github.com/Dayanshifu/hao-littleyan'";}catch{}
  try{var l3 = document.getElementById("l3");
  l3.innerHTML="'https://dayanshifu.github.io/hao-littleyan'";}catch{}
  try{var l4 = document.getElementById("l4");
  l4.innerHTML="'https://glacier-studio.github.io/'";}catch{}
  try{var l5 = document.getElementById("l5");
  l5.innerHTML="'https://slightning.rechen.xyz/'";}catch{}
  try{var l6 = document.getElementById("l6");
  l6.innerHTML="'https://zmh-program.site/'";}catch{}
  try{var l7 = document.getElementById("l7");
  l7.innerHTML="'https://blog.lolicon.best/'";}catch{}
  try{var l8 = document.getElementById("l8");
  l8.innerHTML="little颜";}catch{}
  try{var l8 = document.getElementById("l12");
  l8.innerHTML="https://zybqw.github.io/";}catch{}
  try{var cursor = document.getElementById("cursor");
  cursor.innerHTML='|';}catch{}
  try{var 今年 = new Date().getFullYear();
  document.getElementById("2year").innerHTML = 今年;}catch{}
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
  try{var 倒计时标签 = document.getElementById("countdown");  
  倒计时标签.textContent = 倒计时文本;  }catch{}
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
}, 20 );
给标签上内容();
}
终端输出(文本, 0);
setInterval(计时器更新, 1000);
