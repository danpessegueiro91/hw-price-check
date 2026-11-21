(()=>{
 "use strict";
 // Isolated photo viewer: zoom, drag, wheel and keyboard close.
 let photoViewer=null,photoZoom=1,photoX=0,photoY=0,photoDrag=null;
 function ensurePhotoViewer(){
  if(photoViewer)return photoViewer;
  const style=document.createElement("style");
  style.textContent=`
   .hwpc-photo-viewer{position:fixed;inset:0;z-index:10050;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:18px;background:rgba(2,7,15,.94);backdrop-filter:blur(8px)}
   .hwpc-photo-viewer[hidden]{display:none}
   .hwpc-photo-stage{position:relative;display:flex;align-items:center;justify-content:center;width:min(94vw,1200px);height:min(78vh,850px);overflow:hidden;touch-action:none;border:1px solid #34465d;border-radius:14px;background:#080e18}
   .hwpc-photo-stage img{display:block;width:auto!important;height:auto!important;max-width:100%!important;max-height:100%!important;object-fit:contain;transform:translate(var(--photo-x,0px),var(--photo-y,0px)) scale(var(--photo-zoom,1))!important;transform-origin:center;user-select:none;-webkit-user-drag:none;cursor:grab;pointer-events:auto}
   .hwpc-photo-stage img:active{cursor:grabbing}
   .hwpc-photo-toolbar{display:flex;align-items:center;justify-content:center;gap:9px;flex-wrap:wrap}
   .hwpc-photo-toolbar button,.hwpc-photo-close{min-width:42px;min-height:40px;padding:8px 13px;border:1px solid #64748b;border-radius:9px;background:#17263a;color:#fff;font:600 15px Inter,"Segoe UI",Arial,sans-serif;cursor:pointer}
   .hwpc-photo-toolbar button:hover,.hwpc-photo-close:hover{background:#263d59}
   .hwpc-photo-close{position:absolute;top:16px;right:16px;font-size:22px;line-height:1}
   .hwpc-photo-zoom-label{min-width:58px;color:#fff;text-align:center;font:600 13px Inter,"Segoe UI",Arial,sans-serif}
  `;
  document.head.append(style);
  const root=document.createElement("div");root.className="hwpc-photo-viewer";root.hidden=true;root.setAttribute("role","dialog");root.setAttribute("aria-modal","true");root.setAttribute("aria-label","Visualizador de fotografia");
  root.innerHTML='<button type="button" class="hwpc-photo-close" aria-label="Fechar">×</button><div class="hwpc-photo-stage"><img alt=""></div><div class="hwpc-photo-toolbar"><button type="button" data-photo-zoom="out" aria-label="Diminuir zoom">−</button><span class="hwpc-photo-zoom-label">100%</span><button type="button" data-photo-zoom="in" aria-label="Aumentar zoom">+</button><button type="button" data-photo-zoom="reset">Repor</button></div>';
  document.body.append(root);photoViewer=root;
  const image=root.querySelector("img"),stage=root.querySelector(".hwpc-photo-stage"),label=root.querySelector(".hwpc-photo-zoom-label");
  const paint=()=>{image.style.setProperty("--photo-zoom",photoZoom);image.style.setProperty("--photo-x",photoX+"px");image.style.setProperty("--photo-y",photoY+"px");image.style.setProperty("transform","translate("+photoX+"px,"+photoY+"px) scale("+photoZoom+")","important");label.textContent=Math.round(photoZoom*100)+"%"};
  const zoomBy=delta=>{photoZoom=Math.max(1,Math.min(5,photoZoom+delta));if(photoZoom===1){photoX=0;photoY=0}paint()};
  root.querySelector(".hwpc-photo-close").addEventListener("click",closePhotoViewer);
  root.querySelector('[data-photo-zoom="in"]').addEventListener("click",()=>zoomBy(.25));
  root.querySelector('[data-photo-zoom="out"]').addEventListener("click",()=>zoomBy(-.25));
  root.querySelector('[data-photo-zoom="reset"]').addEventListener("click",()=>{photoZoom=1;photoX=0;photoY=0;paint()});
  stage.addEventListener("wheel",e=>{e.preventDefault();zoomBy(e.deltaY<0?.2:-.2)},{passive:false});
  image.addEventListener("dblclick",()=>{if(photoZoom===1)photoZoom=2;else{photoZoom=1;photoX=0;photoY=0}paint()});
  stage.addEventListener("pointerdown",e=>{if(photoZoom<=1)return;photoDrag={x:e.clientX-photoX,y:e.clientY-photoY};stage.setPointerCapture(e.pointerId)});
  stage.addEventListener("pointermove",e=>{if(!photoDrag)return;photoX=e.clientX-photoDrag.x;photoY=e.clientY-photoDrag.y;paint()});
  const stopDrag=()=>{photoDrag=null};stage.addEventListener("pointerup",stopDrag);stage.addEventListener("pointercancel",stopDrag);
  paint();return root;
 }
 function openPhotoViewer(src,alt){
  if(!src)return;const root=ensurePhotoViewer(),image=root.querySelector("img");
  photoZoom=1;photoX=0;photoY=0;image.src=src;image.alt=alt||"Fotografia Hot Wheels";
  image.style.setProperty("--photo-zoom",1);image.style.setProperty("--photo-x","0px");image.style.setProperty("--photo-y","0px");image.style.setProperty("transform","translate(0px,0px) scale(1)","important");
  root.querySelector(".hwpc-photo-zoom-label").textContent="100%";root.hidden=false;root.querySelector(".hwpc-photo-close").focus();
 }
 function closePhotoViewer(){if(!photoViewer)return;photoViewer.hidden=true;photoViewer.querySelector("img").removeAttribute("src")}
  window.HWPCPhotoViewer={open:openPhotoViewer,close:closePhotoViewer};
 
})();
