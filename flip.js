(function(){
var f=document.getElementById('flip');if(!f)return;
function t(){var on=f.classList.toggle('on');f.setAttribute('aria-pressed',on)}
f.addEventListener('click',t);
f.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}});
})();
