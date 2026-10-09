(function(){
/* about: tap a detail card to expand (phones) */
var q=window.matchMedia('(max-width:820px)');
document.querySelectorAll('.pt').forEach(function(pt){
 pt.setAttribute('role','button');pt.setAttribute('tabindex','0');pt.setAttribute('aria-expanded','false');
 function t(){if(!q.matches)return;var o=pt.classList.toggle('open');pt.setAttribute('aria-expanded',o)}
 pt.addEventListener('click',t);
 pt.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}});
});
})();
