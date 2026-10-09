(function(){
document.documentElement.classList.add('js');
var cards=[].slice.call(document.querySelectorAll('.wk'));
var still=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
var small=function(){return window.matchMedia('(max-width:820px)').matches};
var names=['DOTDOT','DOTTY DESK BEACON','CORIDE ARCADE','INSIGHT AI'];
cards.forEach(function(c,i){
 c.style.setProperty('--i',i);
 var num=c.querySelector('.wk-txt .bebas');
 var g=document.createElement('span');g.className='wk-ghost';g.setAttribute('aria-hidden','true');g.textContent=num?num.textContent:'0'+(i+1);
 c.insertBefore(g,c.querySelector('.wk-txt'));
 var sp=document.createElement('div');sp.className='wk-spot';c.appendChild(sp);
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
});
if(still||!('IntersectionObserver' in window)){cards.forEach(function(c){c.classList.add('in')});return}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.28});
cards.forEach(function(c){io.observe(c)});
/* counter pill */
var cnt=document.createElement('div');cnt.className='wk-count';cnt.setAttribute('aria-hidden','true');
cnt.innerHTML='<b>01</b><i>/ 04</i><span class="bar"><span></span></span><i class="nm">DOTDOT</i>';
document.body.appendChild(cnt);
var cb=cnt.querySelector('b'),cn=cnt.querySelector('.nm'),cur=-1;
var tick=false;
function update(){
 tick=false;
 var vh=window.innerHeight,mob=small();
 var best=0,bd=1e9;
 cards.forEach(function(c,i){
  var r=c.getBoundingClientRect(),mid=r.top+r.height/2,rel=(mid-vh/2)/vh;
  if(r.top<vh*.6)best=i;
  if(mob){c.style.removeProperty('--ss');c.style.removeProperty('--dim');return}
  c.style.setProperty('--py',(rel*-50).toFixed(1)+'px');
  c.style.setProperty('--apy',(rel*-70).toFixed(1)+'px');
  c.style.setProperty('--gx',(rel*140).toFixed(1)+'px');
  var nx=cards[i+1];
  if(nx){
   var nr=nx.getBoundingClientRect();
   var p=Math.max(0,Math.min(1,1-(nr.top-(92+(i+1)*14))/(r.height*.9)));
   c.style.setProperty('--ss',(1-.06*p).toFixed(4));
   c.style.setProperty('--dim',(p*.32).toFixed(3));
  }
 });
 var first=cards[0].getBoundingClientRect(),last=cards[cards.length-1].getBoundingClientRect();
 var on=first.top<vh*.6&&last.bottom>vh*.4;
 cnt.classList.toggle('on',on&&!mob);
 if(best!==cur){cur=best;cb.textContent='0'+(best+1);cn.textContent=names[best]}
 var tot=last.bottom-first.top-vh;var pr=Math.max(0,Math.min(1,(vh*.4-first.top)/(Math.max(1,last.bottom-first.top-vh*.2))));
 cnt.style.setProperty('--pr',pr.toFixed(3));
}
function req(){if(!tick){tick=true;requestAnimationFrame(update)}}
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);update();
/* mouse tilt + spotlight */
if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
 cards.forEach(function(c){
  var art=c.querySelector('.wk-art');
  c.addEventListener('mousemove',function(e){
   var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
   c.style.setProperty('--mx',(x*100)+'%');c.style.setProperty('--my',(y*100)+'%');
   if(!small()){art.style.setProperty('--ry',((x-.5)*16).toFixed(2)+'deg');art.style.setProperty('--rx',((.5-y)*12).toFixed(2)+'deg')}
  });
  c.addEventListener('mouseleave',function(){art.style.setProperty('--ry','0deg');art.style.setProperty('--rx','0deg')});
 });
}
})();
