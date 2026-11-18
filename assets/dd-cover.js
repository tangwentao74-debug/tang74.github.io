(function(){
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  document.querySelectorAll('.cv').forEach(function(cv){
    var dy=cv.querySelector('.dy'),de=cv.querySelector('.de'); if(!dy||reduce) return;
    cv.addEventListener('pointermove',function(e){
      var r=cv.getBoundingClientRect(),x=((e.clientX-r.left)/r.width-.5)*2,y=((e.clientY-r.top)/r.height-.5)*2;
      dy.style.setProperty('--tx',(x*3).toFixed(2));dy.style.setProperty('--ty',(y*2).toFixed(2));dy.style.setProperty('--r',(x*3).toFixed(2));
      de.style.setProperty('--ex',(x*5).toFixed(2));de.style.setProperty('--ey',(y*7).toFixed(2));
    });
    cv.addEventListener('pointerleave',function(){['--tx','--ty','--r'].forEach(function(k){dy.style.setProperty(k,0)});['--ex','--ey'].forEach(function(k){de.style.setProperty(k,0)})});
    cv.addEventListener('click',function(){dy.classList.remove('hop');void dy.offsetWidth;dy.classList.add('hop')});
  });
})();
