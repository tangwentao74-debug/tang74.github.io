(function(){
var els=[].slice.call(document.querySelectorAll('.cnt'));
var still=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
function run(el){
 var from=+el.dataset.from||0,to=+el.dataset.to,suf=el.dataset.suf||'',pre=el.dataset.pre||'',t0=null,d=1400;
 function f(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/d),e=1-Math.pow(1-p,3);el.textContent=pre+Math.round(from+(to-from)*e)+suf;if(p<1)requestAnimationFrame(f)}
 el.textContent=pre+from+suf;requestAnimationFrame(f);
}
if(still||!('IntersectionObserver' in window))return;
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);io.unobserve(e.target)}})},{threshold:.6});
els.forEach(function(el){io.observe(el)});
})();
