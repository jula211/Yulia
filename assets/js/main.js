(function(){
  // Active nav (by filename)
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".menu a").forEach(a=>{
    const href = (a.getAttribute("href") || "").toLowerCase();
    if(href === path) a.classList.add("active");
  });

  // Timecode (HH:MM:SS:FF @25fps) - purely visual
  const tcEl = document.querySelector("[data-timecode]");
  if(tcEl){
    const pad = (n)=> String(n).padStart(2,"0");
    const fps = 25;

    const tick = ()=>{
      const d = new Date();
      const hh = pad(d.getHours());
      const mm = pad(d.getMinutes());
      const ss = pad(d.getSeconds());
      const ms = d.getMilliseconds();
      const ff = pad(Math.floor((ms/1000)*fps));
      tcEl.textContent = `[${hh}:${mm}:${ss}:${ff}]`;
    };
    tick();
    setInterval(tick, 200);
  }

  // Portfolio bin accordion
  document.querySelectorAll("[data-bin]").forEach(item=>{
    const head = item.querySelector("[data-bin-head]");
    if(!head) return;
    head.addEventListener("click", ()=> item.classList.toggle("open"));
  });

  // Copy buttons
  document.querySelectorAll("[data-copy]").forEach(btn=>{
    btn.addEventListener("click", async ()=>{
      const val = btn.getAttribute("data-copy") || "";
      try{
        await navigator.clipboard.writeText(val);
        const old = btn.textContent;
        btn.textContent = "COPIED";
        setTimeout(()=>btn.textContent = old, 900);
      }catch(e){}
    });
  });

  // Timeline click -> go to experience page
  document.querySelectorAll("[data-go]").forEach(el=>{
    el.addEventListener("click", ()=>{
      const to = el.getAttribute("data-go");
      if(to) location.href = to;
    });
  });
})();
