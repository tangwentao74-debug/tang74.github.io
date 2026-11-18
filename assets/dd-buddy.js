(function(){
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
var COS=[['classic','Classic',null,112,'Back to my plain self. Still here.'],
 ['a1','Wizard','a1',150,'A small focus spell: one thing at a time.'],
 ['a2','Top hat','a2',104,'Top hat on. Very serious. Very gentle.'],
 ['a3','Bunny','a3',118,'Soft ears, soft pace.'],
 ['a4','Robot','a4',106,'Antenna up. I\'m listening, not judging.'],
 ['b1','Headband','b1',112,'Headband on. Ready when you are.'],
 ['b2','Cowboy','b2',124,'Howdy. No rush on this trail.'],
 ['b3','Cat','b3',106,'Sitting quietly next to you.'],
 ['b4','Cap','b4',108,'Cap on. Let\'s get one thing done.'],
 ['c4','Heart','c4',100,'That one\'s for you.']];
var TALK=['Hi, I\'m Dotty. I\'m not a timer. I just stay.','Drifting is allowed here.','Want to see something? Try Dress up.','No judging. Just company.','Poke me again. I like it.','You\'ve got this. Slowly is fine.','Take a breath. I\'ll hold your place.'];
var SECT=[['.cs.ch:nth-of-type(1)',0],['.jm','Poke any stop. The gold ones are where I\'d show up.'],['.ap','That\'s me growing up. Poke my friends.']];
var el=document.createElement('div');el.id='buddy';
el.innerHTML='<div class="bb" role="status" aria-live="polite"></div><div class="tray"><div class="wd"></div><div class="acts"><button data-a="talk">Talk</button><button data-a="dress">Dress up</button><button data-a="rest">Rest</button></div></div><button class="bd" type="button" aria-label="Dotty, your focus companion"><span class="fl3"><span class="dyb"><span class="cl"><img class="db" src="assets/dotdot/dotty_base.webp" alt=""><img class="de" src="assets/dotdot/dotty_eyes.webp" alt=""></span><img class="cos" alt=""></span></span><span class="zz">z z</span></button>';
document.body.appendChild(el);
var bb=el.querySelector('.bb'),bd=el.querySelector('.bd'),dyb=el.querySelector('.dyb'),de=el.querySelector('.de'),cos=el.querySelector('.cos'),wd=el.querySelector('.wd');
var hideT,typeT,said={},poke=[],cur='classic',lastTalk=-1,idleT;
COS.forEach(function(c){var b=document.createElement('button');b.type='button';b.title=c[1];b.dataset.k=c[0];b.innerHTML=c[2]?'<img src="assets/dotdot/d/'+c[2]+'.webp" alt="'+c[1]+'">':'<img src="assets/dotdot/dotty_base.webp" alt="Classic">';if(c[0]==='classic')b.classList.add('on');wd.appendChild(b)});
function say(t,ms){clearTimeout(hideT);clearInterval(typeT);bb.classList.add('on');
  if(RM){bb.textContent=t}else{bb.textContent='';var i=0;typeT=setInterval(function(){bb.textContent=t.slice(0,++i);if(i>=t.length)clearInterval(typeT)},18)}
  hideT=setTimeout(function(){bb.classList.remove('on')},ms||(2600+t.length*55));}
function popFx(){dyb.classList.remove('pop');void dyb.offsetWidth;dyb.classList.add('pop');var p=document.createElement('span');p.className='pf';bd.appendChild(p);setTimeout(function(){p.remove()},800)}
function dress(k,quiet){var c=COS.filter(function(x){return x[0]===k})[0];if(!c)return;cur=k;
  bd.style.setProperty('--w',c[3]+'px');
  if(c[2]){cos.src='assets/dotdot/d/'+c[2]+'.webp';cos.alt=c[1];el.classList.add('dressed')}else el.classList.remove('dressed');
  wd.querySelectorAll('button').forEach(function(b){b.classList.toggle('on',b.dataset.k===k)});
  popFx();if(!quiet)say(c[4]);}
function talk(){var i;do{i=Math.floor(Math.random()*TALK.length)}while(i===lastTalk);lastTalk=i;say(TALK[i]);}
function rest(on){el.classList.toggle('rest',on);el.querySelector('[data-a=rest]').classList.toggle('on',on);
  if(on){el.classList.remove('open');say('Rest is allowed. I\'ll keep the place.',3200)}else{say('Welcome back. Pick up where you left off.')}}
bd.addEventListener('click',function(){
  if(el.classList.contains('rest')){rest(false);return}
  popFx();el.classList.toggle('open');
  var now=Date.now();poke=poke.filter(function(t){return now-t<6000});poke.push(now);
  if(poke.length>=5){poke=[];dress('c4');setTimeout(function(){say('That\'s a lot of pokes. I like it.')},0);return}
  if(el.classList.contains('open'))talk();else bb.classList.remove('on');});
el.querySelector('.acts').addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;
  if(a==='talk')talk();
  if(a==='dress'){wd.classList.toggle('on');e.target.classList.toggle('on',wd.classList.contains('on'))}
  if(a==='rest')rest(true);});
wd.addEventListener('click',function(e){var b=e.target.closest('button');if(b)dress(b.dataset.k)});
/* gaze */
if(!RM)addEventListener('pointermove',function(e){var r=bd.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height*.45,dx=Math.max(-1,Math.min(1,(e.clientX-cx)/400)),dy=Math.max(-1,Math.min(1,(e.clientY-cy)/400));
  de.style.setProperty('--ex',(dx*7).toFixed(1));de.style.setProperty('--ey',(dy*9).toFixed(1));dyb.style.setProperty('--r',(dx*4).toFixed(1));armIdle()});
/* context lines, once per section */
var lines=[['.cs.ch','',['Lots of noise in here, right? That\'s the problem.','This is Nathan. I\'d have stayed next to him.','Support starts before explanation.','The part where I finally get to be real.']],
 ['.jm','Poke any stop. The gold ones are where I\'d show up.'],['.ap','',['That\'s me growing up. Poke my friends.','This is the loop. Let it play, or pick a moment.','Small rooms inside the room.']],['.tk','Nice. That\'s the walk.']];
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var m=e.target._msg;if(!m||said[m]||el.classList.contains('rest'))return;said[m]=1;say(m)})},{threshold:.45});
lines.forEach(function(l){var ns=document.querySelectorAll(l[0]);ns.forEach(function(n,i){n._msg=l[2]?l[2][i]:l[1];if(n._msg&&(l[2]||i===0))io.observe(n)})});
/* idle + return */
function armIdle(){clearTimeout(idleT);idleT=setTimeout(function(){if(!el.classList.contains('rest'))say('Still here. No rush.')},28000)}
armIdle();addEventListener('scroll',armIdle,{passive:true});
document.addEventListener('visibilitychange',function(){if(!document.hidden&&!el.classList.contains('rest'))setTimeout(function(){say('Welcome back. We\'ll pick up where you left off.')},400)});
setTimeout(function(){say('Hi, I\'m Dotty. Scroll on, I\'ll tag along. Poke me any time.',4200)},1800);
})();
