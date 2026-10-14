(function(){
var tabs=[].slice.call(document.querySelectorAll('.prof-sw button'));
if(!tabs.length)return;
var key='profileLayout';
function show(n,focus){
  tabs.forEach(function(b){
    var on=b.getAttribute('data-l')===String(n);
    b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;
    if(on&&focus)b.focus();
  });
  [1,2,3].forEach(function(i){
    var pl=document.getElementById('pl'+i);if(!pl)return;
    var on=i===n;
    pl.hidden=!on;
    pl.classList.remove('pl-in');
    if(on){void pl.offsetWidth;pl.classList.add('pl-in')}
  });
  try{localStorage.setItem(key,String(n))}catch(e){}
}
tabs.forEach(function(b,i){
  b.addEventListener('click',function(){show(+b.getAttribute('data-l'))});
  b.addEventListener('keydown',function(e){
    var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;
    if(!d)return;e.preventDefault();
    show(((i+d+tabs.length)%tabs.length)+1,true);
  });
});
var start=1;
try{var s=+localStorage.getItem(key);if(s>=1&&s<=3)start=s}catch(e){}
show(start);
})();
