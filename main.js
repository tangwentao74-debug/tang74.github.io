(function(){
/* brush cursor */
var cv=document.querySelector('canvas.brush');
var off=window.matchMedia('(hover:none),(pointer:coarse),(prefers-reduced-motion:reduce),(max-width:820px)').matches;
if(cv&&!off){
  var ctx=cv.getContext('2d'),pts=[],tx=0,ty=0,px=0,py=0,raf=0,init=false,dpr=1;
  function size(){dpr=Math.min(window.devicePixelRatio||1,2);var w=window.innerWidth,h=window.innerHeight;cv.width=w*dpr;cv.height=h*dpr;cv.style.width=w+'px';cv.style.height=h+'px';}
  size();window.addEventListener('resize',size);
  function ribbon(now,life,k,alpha){
    var n=pts.length,L=[],R=[];
    for(var i=0;i<n;i++){
      var p=pts[i],a=Math.max(0,1-(now-p.t)/life),pr=pts[Math.max(0,i-1)],nx_=pts[Math.min(n-1,i+1)];
      var nx=-(nx_.y-pr.y),ny=nx_.x-pr.x,m=Math.hypot(nx,ny)||1;nx/=m;ny/=m;
      var w=(3+21*Math.pow(a,0.9))*k*(1+0.16*Math.sin(i*1.3+now*0.004));
      L.push([p.x+nx*w,p.y+ny*w]);R.push([p.x-nx*w,p.y-ny*w]);
    }
    ctx.beginPath();ctx.moveTo(L[0][0],L[0][1]);
    for(var j=1;j<n;j++)ctx.lineTo(L[j][0],L[j][1]);
    for(var q=n-1;q>=0;q--)ctx.lineTo(R[q][0],R[q][1]);
    ctx.closePath();ctx.fillStyle='rgba(94,119,163,'+alpha+')';ctx.fill();
  }
  function tick(){
    raf=0;var dx=tx-px,dy=ty-py;px+=dx*0.2;py+=dy*0.2;
    var now=performance.now(),last=pts[pts.length-1];
    if(!last||Math.hypot(px-last.x,py-last.y)>2)pts.push({x:px,y:py,t:now});
    var life=650;while(pts.length&&now-pts[0].t>life)pts.shift();
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    if(pts.length>2){ribbon(now,life,1.7,0.07);ribbon(now,life,1.1,0.12);ribbon(now,life,0.45,0.1);}
    if(pts.length||Math.hypot(dx,dy)>0.5)raf=requestAnimationFrame(tick);else init=false;
  }
  document.getElementById('app').addEventListener('mousemove',function(e){
    tx=e.clientX;ty=e.clientY;if(!init){px=tx;py=ty;init=true;}
    if(!raf)raf=requestAnimationFrame(tick);
  });
}
})();

