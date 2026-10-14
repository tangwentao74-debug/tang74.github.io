(function(){
[].slice.call(document.querySelectorAll('.flip')).forEach(function(f){
  function t(){var on=f.classList.toggle('on');f.setAttribute('aria-pressed',on)}
  f.addEventListener('click',t);
  f.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}});
});
})();
