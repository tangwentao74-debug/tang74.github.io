(function(){
document.documentElement.classList.add('js');
var cards=[].slice.call(document.querySelectorAll('.wk'));
var still=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
var mq=window.matchMedia('(max-width:820px)');
var names=['DOTDOT','DOTTY DESK BEACON','CORIDE ARCADE','INSIGHT AI'];
var S=[];
cards.forEach(function(c,i){
 var num=c.querySelector('.wk-txt .bebas');
 var g=document.createElement('span');g.className='wk-ghost';g.setAttribute('aria-hidden','true');g.textContent=num?num.textContent:'0'+(i+1);
 c.insertBefore(g,c.querySelector('.wk-txt'));
 var dim=document.createElement('div');dim.className='wk-dim';c.appendChild(dim);
 var sp=document.createElement('div');sp.className='wk-spot';c.appendChild(sp);
 var art=c.querySelector('.wk-art'),im=art.querySelector('.im');
 var tl=document.createElement('div');tl.className='wk-tilt';art.insertBefore(tl,im);tl.appendChild(im);
 var h=c.querySelector('h2');
 var words=h.textContent.trim().split(/\s+/);
 h.setAttribute('aria-label',words.join(' '));
 h.innerHTML=words.map(function(w,k){return '<span class="w" aria-hidden="true"><span style="--d:'+k+'">'+w+'</span></span>'}).join('');
 var br=document.createElementNS('http://www.w3.org/2000/svg','svg');
 br.setAttribute('class','wk-brush');br.setAttribute('viewBox','0 0 360 22');br.setAttribute('aria-hidden','true');
 br.innerHTML='<path pathLength="1" d="M4 14 C60 4 120 20 190 11 C250 4 310 16 356 8"/>';
 h.insertAdjacentElement('afterend',br);
 var k=0;
 [].slice.call(c.querySelectorAll('.wk-txt > p, .wk-txt > a, .wk-txt > div')).forEach(function(e){e.classList.add('rise');e.style.setProperty('--d',k++)});
 [].slice.call(c.querySelectorAll('.chip')).forEach(function(e,j){e.style.setProperty('--d',j)});
 S.push({c:c,pbg:c.querySelector('.pbg'),art:art,tl:tl,ghost:g,dim:dim,rx:0,ry:0,vis:false,last:''});
});
if(still||!('IntersectionObserver' in window)){cards.forEach(function(c){c.classList.add('in')});return}
/* reveal once */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var t=e.target;t.classList.add('in');setTimeout(function(){t.classList.add('settled')},1500);io.unobserve(t)}})},{threshold:.2});
cards.forEach(function(c){io.observe(c)});
/* only animate cards that are near the viewport */
var near=new IntersectionObserver(function(es){es.forEach(function(e){
 var s=S[cards.indexOf(e.target)];s.vis=e.isIntersecting;
 e.target.classList.toggle('live',e.isIntersecting&&!mq.matches);
 if(!e.isIntersecting&&s.last){s.last='';}
});req()},{rootMargin:'60% 0px 60% 0px'});
cards.forEach(function(c){near.observe(c)});
/* counter pill */
var cnt=document.createElement('div');cnt.className='wk-count';cnt.setAttribute('aria-hidden','true');
cnt.innerHTML='<b>01</b><i>/ 04</i><span class="bar"><span></span></span><i class="nm">DOTDOT</i>';
document.body.appendChild(cnt);
var cb=cnt.querySelector('b'),cn=cnt.querySelector('.nm'),bar=cnt.querySelector('.bar span'),cur=-1,tick=false;
function update(){
 tick=false;
 var vh=window.innerHeight,mob=mq.matches;
 var rects=cards.map(function(c){return c.getBoundingClientRect()});   /* read */
 var best=0;
 cards.forEach(function(c,i){
  var r=rects[i];if(r.top<vh*.6)best=i;
  if(r.top<vh*.92&&!c.classList.contains('in')){c.classList.add('in');setTimeout(function(){c.classList.add('settled')},1500)}
  var s=S[i];if(!s.vis||mob)return;
  var rel=(r.top+r.height/2-vh/2)/vh;
  var sc=1,dm=0,nx=rects[i+1];
  if(nx){var p=Math.max(0,Math.min(1,1-(nx.top-(92+(i+1)*14))/(r.height*.9)));sc=1-.06*p;dm=p*.32}
  /* write */
  var key=sc.toFixed(3)+'|'+rel.toFixed(3)+'|'+s.rx+'|'+s.ry;
  if(key===s.last)return;s.last=key;
  if(c.classList.contains('in')){c.style.transform=sc<.9995?'translate3d(0,0,0) scale('+sc.toFixed(4)+')':'';}
  s.dim.style.opacity=dm.toFixed(3);
  s.pbg.style.transform='translate3d(0,'+(rel*-50).toFixed(1)+'px,0) scale(1.12)';
  s.art.style.transform='translate3d(0,'+(rel*-70).toFixed(1)+'px,0)';
  s.ghost.style.transform='translate3d('+(rel*140).toFixed(1)+'px,0,0)';
  s.tl.style.transform=(s.rx||s.ry)?'perspective(1000px) rotateX('+s.rx+'deg) rotateY('+s.ry+'deg)':'';
 });
 var first=rects[0],last=rects[rects.length-1];
 cnt.classList.toggle('on',first.top<vh*.6&&last.bottom>vh*.4&&!mob);
 if(best!==cur){cur=best;cb.textContent='0'+(best+1);cn.textContent=names[best]}
 bar.style.transform='scaleX('+Math.max(0,Math.min(1,(vh*.4-first.top)/Math.max(1,last.bottom-first.top-vh*.2))).toFixed(3)+')';
}
function req(){if(!tick){tick=true;requestAnimationFrame(update)}}
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);
mq.addEventListener&&mq.addEventListener('change',function(){cards.forEach(function(c){c.style.transform='';c.classList.remove('live')});S.forEach(function(s){s.last='';['pbg','art','ghost'].forEach(function(k){s[k].style.transform=''})});req()});
req();
/* failsafe: never leave a card hidden */
setTimeout(function(){cards.forEach(function(c){if(!c.classList.contains('in')&&c.getBoundingClientRect().top<innerHeight*1.5){c.classList.add('in')}})},3500);
/* mouse tilt + spotlight (fine pointers only) */
if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
 cards.forEach(function(c,i){
  var s=S[i],px=0,py=0,raf=0;
  c.addEventListener('mousemove',function(e){
   var r=c.getBoundingClientRect();px=(e.clientX-r.left)/r.width;py=(e.clientY-r.top)/r.height;
   if(raf)return;raf=requestAnimationFrame(function(){
    raf=0;
    c.style.setProperty('--mx',(px*100).toFixed(1)+'%');c.style.setProperty('--my',(py*100).toFixed(1)+'%');
    if(!mq.matches){s.ry=+((px-.5)*16).toFixed(1);s.rx=+((.5-py)*12).toFixed(1);req()}
   });
  });
  c.addEventListener('mouseleave',function(){s.rx=0;s.ry=0;req()});
 });
}
})();
