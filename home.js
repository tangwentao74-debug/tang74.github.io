
(function(){
var P=[
{key:'dot',num:'01',title:'DotDot',desc:'An MR focus companion that keeps you company instead of policing your attention.',type:'MR focus companionship system',tags:['Mixed reality','Focus','Companionship'],bg:'#E0F1FF',rgb:'224,241,255',sub:'#3C5478',bgCls:'pb-dot',imgCls:'im im-dot'},
{key:'desk',num:'02',title:'Dotty Desk Beacon',desc:'A physical focus companion: a desk beacon built and tested as a hardware prototype.',type:'Physical focus companion',tags:['Hardware','Prototype','Focus'],bg:'#FFF3D3',rgb:'255,243,211',sub:'#6B5A2E',bgCls:'pb-desk',imgCls:'im im-desk'},
{key:'car',num:'03',title:'Coride Arcade',desc:'An in-cabin social game system that turns autonomous rides into shared play.',type:'In-cabin social game system',tags:['Autonomous rides','Games','Social'],bg:'#E4ECF9',rgb:'228,236,249',sub:'#3C5478',bgCls:'pb-car',imgCls:'im im-car'},
{key:'insight',num:'04',title:'Insight AI',desc:'An AI-assisted marketing decision system that turns market signals into clear next moves.',type:'AI-assisted decision system',tags:['AI','Marketing','Decisions'],bg:'#F2F6FC',rgb:'242,246,252',sub:'#3C5478',bgCls:'pb-insight',imgCls:'im im-insight'}
];
var active=0;
var gal=document.getElementById('gallery');
var panels=[];
var ARROW='<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;');}
P.forEach(function(p,i){
  var el=document.createElement('div');
  el.innerHTML='<div class="pbg '+p.bgCls+'"></div><div class="pov-ov"></div><div class="pc"></div><div class="art"><div class="'+p.imgCls+'" role="img" aria-label="'+p.title+' illustration"></div></div>';
  gal.appendChild(el);
  panels.push(el);
});
function render(){
  P.forEach(function(p,i){
    var on=i===active, el=panels[i];
    el.className=on?'panel':'panel panel-c';
    el.setAttribute('style','--fg:'+(on?6.5:1)+';--mh:'+(on?740:84)+'px;background:'+p.bg+';color:#14233A');
    el.querySelector('.pov-ov').style.background=on?'linear-gradient(90deg, rgba('+p.rgb+',.94) 0%, rgba('+p.rgb+',.82) 42%, rgba('+p.rgb+',.22) 100%)':'rgba('+p.rgb+',.58)';
    var art=el.querySelector('.art');
    art.style.right=on?'24px':'8px'; art.style.setProperty('--as',on?1:0.4);
    var pc=el.querySelector('.pc');
    if(pc.getAttribute('data-on')!==(on?'1':'0')){
      pc.setAttribute('data-on',on?'1':'0');
      if(on){
        pc.innerHTML='<div class="panel-open" style="position:relative;z-index:2;min-width:560px;max-width:clamp(600px,44vw,960px);padding:clamp(40px,3.4vw,72px);display:flex;flex-direction:column;gap:18px;height:100%">'+
        '<div style="display:flex;align-items:baseline;gap:14px"><span class="bebas" style="font-size:38px;color:'+p.sub+'">'+p.num+'</span><span style="font-size:13px;font-weight:500;letter-spacing:.14em;color:'+p.sub+'">'+p.type.toUpperCase()+'</span></div>'+
        '<h3 class="bebas" style="margin:0;font-size:clamp(64px,7vw,150px);line-height:.92">'+p.title.toUpperCase()+'</h3>'+
        '<p style="margin:0;font-size:20px;line-height:1.45;font-weight:300;max-width:430px;text-wrap:pretty">'+p.desc+'</p>'+
        '<div style="display:flex;flex-wrap:wrap;gap:8px">'+p.tags.map(function(t){return '<span class="chip">'+t+'</span>';}).join('')+'</div>'+
        '<a class="pill" href="work.html#project-'+['dot','desk','car','insight'][i]+'" style="margin-top:auto;align-self:flex-start;background:#2A476F;color:#fff;position:relative;z-index:4">View Case Study '+ARROW+'</a></div>';
      }else{
        pc.innerHTML='<button class="sel" aria-label="Open '+p.title+'"></button><div style="position:absolute;left:0;right:0;top:0;padding:28px 22px;display:flex;flex-direction:column;gap:18px;align-items:flex-start;z-index:2"><span class="bebas" style="font-size:30px;color:'+p.sub+'">'+p.num+'</span><span class="bebas vt">'+p.title+'</span></div>';
        pc.querySelector('.sel').addEventListener('click',function(){active=i;render();if(window.innerWidth<=820){setTimeout(function(){var t=document.querySelectorAll('.panel')[i];if(t){var y=t.getBoundingClientRect().top+window.scrollY-90;window.scrollTo({top:y,behavior:'smooth'})}},120)}});
      }
    }
  });
}
render();
document.querySelectorAll('a.stk').forEach(function(a){a.addEventListener('click',function(){active=+a.getAttribute('data-i');render();});});

/* numbers columns */
var nl=document.getElementById('numlayer');
if(nl){
  var toks=['2.4M','5.8%','1.2%','12.5K','37','0.82','$48K','+12%','9,310','64%','1,204','3.9','88%','4.9%','120','6.1%','$1.2M','-3%','71','8.8%'];
  var seed=7;function rnd(){seed=(seed*9301+49297)%233280;return seed/233280;}
  var colors=['#2A476F','#5E77A3','#2A476F','#5E77A3','#DAA21B'];
  for(var i=0;i<16;i++){
    var lines=[];for(var k=0;k<80;k++)lines.push(toks[Math.floor(rnd()*toks.length)]);
    var t=lines.join('\n');
    var fs=18+Math.floor(rnd()*12), dur=26+Math.floor(rnd()*34);
    var d=document.createElement('div');d.className='num';d.textContent=t+'\n'+t;
    d.setAttribute('style','left:'+(i*6.25)+'%;font-size:'+fs+'px;color:'+(i%5===3?'#DAA21B':colors[i%4])+';animation-duration:'+dur+'s;animation-direction:'+(i%2?'reverse':'normal')+';animation-delay:-'+Math.floor(rnd()*20)+'s;opacity:'+(0.5+rnd()*0.5));
    nl.appendChild(d);
  }
}
})();
