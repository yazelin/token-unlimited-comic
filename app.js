(function(){
'use strict';
var KEY="comic-tuc";
function read(){try{return JSON.parse(localStorage.getItem(KEY))||null}catch(e){return null}}
function write(ep,p){try{localStorage.setItem(KEY,JSON.stringify({ep:ep,p:p,at:Date.now()}))}catch(e){}}
var reader=document.querySelector('main.reader');
if(reader){
  var ep=Number(reader.dataset.ep),total=Number(reader.dataset.total)||1;
  var bar=document.querySelector('.progress i'),cnt=document.querySelector('.progress span');
  var top=document.querySelector('.reader-top'),lastY=0;
  addEventListener('scroll',function(){
    var y=scrollY;
    if(top){ if(y>innerHeight&&y>lastY+8)top.classList.add('hide'); else if(y<lastY-8)top.classList.remove('hide'); }
    if(Math.abs(y-lastY)>8)lastY=y;
  },{passive:true});
  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){
      if(!en.isIntersecting)return;
      var p=Number(en.target.dataset.p);
      if(bar)bar.style.width=((p+1)/total*100)+'%';
      if(cnt)cnt.textContent=(p+1)+'/'+total;
      write(ep,p);
    });
  },{threshold:0.4});
  document.querySelectorAll('.panel').forEach(function(el){io.observe(el)});
  var s=read();
  if(s&&s.ep===ep&&s.p>0){
    var t=document.querySelector('[data-p="'+s.p+'"]');
    if(t)requestAnimationFrame(function(){t.scrollIntoView()});
  }
}
var slot=document.getElementById('resume-slot');
if(slot){
  var s2=read();
  if(s2&&s2.ep){
    var a=document.createElement('a');
    a.className='resume';a.href='read/'+s2.ep+'.html';
    a.textContent='繼續閱讀 › 第 '+s2.ep+' 章・第 '+((s2.p||0)+1)+' 格';
    slot.appendChild(a);
  }
}
})();
