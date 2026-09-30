/* Космический фон и деликатные 3D-реакции интерфейса. */
(()=>{
  'use strict';
  const root=document.documentElement;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse=matchMedia('(pointer: coarse)').matches;
  const stage=document.querySelector('#planetStage');
  const planets=[
    {name:'MERCURY',size:150,glow:'#b8a493',surface:'radial-gradient(circle at 33% 30%,#f0dfc8 0 4%,transparent 5%),radial-gradient(circle at 68% 60%,#6d5c52 0 7%,transparent 8%),radial-gradient(circle at 38% 35%,#d8c6ae,#74665c 58%,#241f20 100%)'},
    {name:'VENUS',size:220,glow:'#ffbd70',surface:'repeating-linear-gradient(170deg,transparent 0 12px,#fff1c920 14px 20px),radial-gradient(circle at 34% 30%,#ffe8a7,#d98742 55%,#5a251d 100%)'},
    {name:'EARTH',size:240,glow:'#4fdcff',surface:'radial-gradient(ellipse at 35% 32%,#68b66c 0 9%,transparent 10%),radial-gradient(ellipse at 62% 57%,#74bd72 0 12%,transparent 13%),radial-gradient(circle at 35% 28%,#d9fbff 0 5%,transparent 6%),radial-gradient(circle at 34% 32%,#2f9cdc,#103f84 64%,#061529 100%)'},
    {name:'MARS',size:190,glow:'#ff6f4b',surface:'radial-gradient(circle at 65% 58%,#5e2119 0 10%,transparent 11%),radial-gradient(circle at 30% 35%,#ffb16f,#b84d32 58%,#471d20 100%)'},
    {name:'JUPITER',size:410,glow:'#ffbf8e',surface:'radial-gradient(ellipse at 70% 61%,#b84831 0 5%,transparent 9%),repeating-linear-gradient(178deg,#d7a476 0 13px,#f3d0a4 14px 28px,#9d644c 29px 40px,#e9bd8e 41px 55px)'},
    {name:'SATURN',size:360,glow:'#ffe0a0',ring:true,surface:'repeating-linear-gradient(178deg,#f4d9a3 0 15px,#b79262 16px 25px,#e6c58e 26px 39px)'},
    {name:'URANUS',size:280,glow:'#8ff7ff',surface:'repeating-linear-gradient(178deg,#b9f3f1 0 22px,#73cbd2 23px 28px),radial-gradient(circle at 35% 30%,#d7ffff,#5bb3c2 68%,#1a536c)'},
    {name:'NEPTUNE',size:270,glow:'#4f7cff',surface:'radial-gradient(ellipse at 65% 62%,#152c90 0 8%,transparent 10%),repeating-linear-gradient(178deg,#486ce1 0 20px,#233da4 21px 31px,#5d7df0 32px 45px)'}
  ];
  let index=0;
  function showPlanet(){
    if(!stage)return;
    stage.textContent='';
    const p=planets[index];
    const shell=document.createElement('figure');
    shell.className='planet-shell'+(p.ring?' has-ring':'');
    shell.style.setProperty('--planet-size',p.size+'px');
    shell.style.setProperty('--planet-glow',p.glow);
    shell.style.setProperty('--planet-surface',p.surface);
    shell.innerHTML=`<i class="planet-orbit"></i><span class="planet"></span><figcaption><b>${String(index+1).padStart(2,'0')}</b>${p.name}<small>SOLAR SEQUENCE</small></figcaption>`;
    stage.append(shell);
    index=(index+1)%planets.length;
  }
  showPlanet();
  if(!reduced&&!coarse)setInterval(showPlanet,8800);
  if(!reduced&&!coarse){
    let raf=0;
    addEventListener('pointermove',e=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>{
        root.style.setProperty('--pointer-x',((e.clientX/innerWidth)-.5).toFixed(3));
        root.style.setProperty('--pointer-y',((e.clientY/innerHeight)-.5).toFixed(3));
      });
    },{passive:true});
    const attachTilt=()=>document.querySelectorAll('.media,.heroObject,.newsletter').forEach(el=>{
      if(el.dataset.tiltReady)return;el.dataset.tiltReady='1';
      el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.setProperty('--rx',(-y*9).toFixed(2)+'deg');el.style.setProperty('--ry',(x*11).toFixed(2)+'deg');el.style.setProperty('--hx',(x*100+50).toFixed(1)+'%');el.style.setProperty('--hy',(y*100+50).toFixed(1)+'%')});
      el.addEventListener('pointerleave',()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')});
    });
    attachTilt();
    new MutationObserver(attachTilt).observe(document.querySelector('#grid')||document.body,{childList:true,subtree:true});
  }
})();
