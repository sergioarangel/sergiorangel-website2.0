(function(){
  /* ── Cursor ──────────────────────────────────────────────── */
  var dot  = document.getElementById('cDot');
  var ring = document.getElementById('cRing');
  var mx=-200,my=-200,rx=-200,ry=-200,moved=false;

  document.addEventListener('mousemove',function(e){
    mx=e.clientX; my=e.clientY;
    dot.style.left=mx+'px'; dot.style.top=my+'px';
    if(!moved){rx=mx;ry=my;moved=true;}
  },{passive:true});

  (function loop(){
    rx+=(mx-rx)*0.1; ry+=(my-ry)*0.1;
    if(moved){ring.style.left=rx+'px';ring.style.top=ry+'px';}
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a,button,.pcard,.pills span').forEach(function(el){
    el.addEventListener('mouseenter',function(){document.body.classList.add('cx');});
    el.addEventListener('mouseleave',function(){document.body.classList.remove('cx');});
  });

  /* ── Navbar ──────────────────────────────────────────────── */
  var nav=document.getElementById('nav');
  window.addEventListener('scroll',function(){
    nav.classList.toggle('scrolled',window.scrollY>60);
  },{passive:true});

  /* ── Scroll reveal ───────────────────────────────────────── */
  // Mark body ready THEN hide .sr elements so they start visible
  // as fallback and only animate if JS + IO is fully working.
  document.body.classList.add('js-ready');

  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}
    });
  },{threshold:0.08,rootMargin:'0px 0px -30px 0px'});

  document.querySelectorAll('.sr').forEach(function(el){io.observe(el);});

  /* ── Typewriter ──────────────────────────────────────────── */
  var ticker=document.getElementById('ticker');
  var phrases=[
    'build integrations.',
    'solve complex problems.',
    'bridge tech and strategy.',
    'speak clients\u2019 language.',
    'ship reliable solutions.'
  ];
  var pi=0,ci=0,del=false;

  function type(){
    var cur=phrases[pi];
    ci+=del?-1:1;
    ticker.textContent=cur.slice(0,ci);
    var wait=del?42:80;
    if(!del&&ci===cur.length){wait=1900;del=true;}
    else if(del&&ci===0){del=false;pi=(pi+1)%phrases.length;wait=350;}
    setTimeout(type,wait);
  }
  setTimeout(type,900);

  /* ── Stat counters ───────────────────────────────────────── */
  var sio=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting)return;
      sio.unobserve(e.target);
      var el=e.target,target=parseFloat(el.dataset.target);
      var isF=String(target).includes('.');
      var t0=performance.now(),dur=1500;
      (function frame(now){
        var p=Math.min((now-t0)/dur,1);
        var v=(1-Math.pow(1-p,3))*target;
        el.textContent=isF?v.toFixed(1):Math.floor(v)+'';
        if(p<1)requestAnimationFrame(frame);
        else el.textContent=isF?target.toFixed(1):''+target;
      })(t0);
    });
  },{threshold:0.5});
  document.querySelectorAll('.snum').forEach(function(el){sio.observe(el);});

  /* ── Mobile nav ──────────────────────────────────────────── */
  var hbg=document.getElementById('hbg');
  var nLinks=document.getElementById('navLinks');
  var spans=hbg.querySelectorAll('span');
  var open=false;
  hbg.addEventListener('click',function(){
    open=!open;
    nLinks.classList.toggle('open',open);
    spans[0].style.transform=open?'translateY(7px) rotate(45deg)':'';
    spans[1].style.opacity=open?'0':'';
    spans[2].style.transform=open?'translateY(-7px) rotate(-45deg)':'';
  });
  nLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      open=false;nLinks.classList.remove('open');
      spans[0].style.transform='';spans[1].style.opacity='';spans[2].style.transform='';
    });
  });

})();
