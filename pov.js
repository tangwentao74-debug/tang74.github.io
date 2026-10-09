(function(){
if(!(window.CSS&&CSS.supports&&CSS.supports('animation-timeline:view()')))return;
var stage=document.querySelector('.povstage');if(!stage)return;
var icons=[].slice.call(document.querySelectorAll('.ill-row .ic'));
var picos=[].slice.call(document.querySelectorAll('.pico[data-t]'));
function pos(el){var x=0,y=0;while(el&&el!==stage){x+=el.offsetLeft;y+=el.offsetTop;el=el.offsetParent}return{x:x,y:y}}
function calc(){
 if(!window.matchMedia('(min-width:821px)').matches)return;
 icons.forEach(function(ic,n){
  var t=picos[n];if(!t)return;
  var a=pos(ic),par=t.parentNode,pp=pos(par),tr=t.getBoundingClientRect(),pr=par.getBoundingClientRect();var b={x:pp.x+(tr.left-pr.left),y:pp.y+(tr.top-pr.top)};
  var aw=ic.offsetWidth,ah=ic.offsetHeight,bw=t.getBoundingClientRect().width,bh=bw*(ah/aw);
  ic.style.setProperty('--dx',(b.x+bw/2-(a.x+aw/2)).toFixed(1)+'px');
  ic.style.setProperty('--dy',(b.y+bh/2-(a.y+ah/2)).toFixed(1)+'px');
  ic.style.setProperty('--sc',(bw/aw).toFixed(3));
  ic.style.animationName='none';void ic.offsetWidth;ic.style.animationName='';
 });
}
calc();addEventListener('resize',calc);addEventListener('load',calc);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(calc);
})();
