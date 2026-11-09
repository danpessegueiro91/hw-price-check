
(()=>{
 if(window.HWPC_PRO_POLISH_20261108)return;
 window.HWPC_PRO_POLISH_20261108=true;
 const $=id=>document.getElementById(id);

 const main=document.querySelector('main'),app=$('appWorkspace'),guide=$('guidesSection'),catalog=$('treasureCatalog'),about=$('aboutSection');
 if(main&&app&&guide&&catalog&&!$('catalogPage')){
  const page=document.createElement('section');page.id='catalogPage';page.className='catalog-page hidden';
  const inner=document.createElement('div');inner.className='catalog-page-inner';
  const intro=document.createElement('div');intro.className='page-intro';
  intro.innerHTML='<div class="section-kicker">GUIAS DE COLECIONADOR</div><h1>Arquivo Treasure Hunt</h1><p>Listas por ano, diferenças entre TH e STH, fotografias de referência e valores indicativos.</p>';
  inner.append(intro,guide,catalog);page.append(inner);main.insertBefore(page,app);
 }
 if(main&&about&&!$('aboutPage')){const page=document.createElement('section');page.id='aboutPage';page.className='wrap about-page hidden';page.append(about);main.insertBefore(page,app)}
 if(main&&!$('blogPage')){const page=document.createElement('section');page.id='blogPage';page.className='wrap blog-page hidden';page.innerHTML='<div class="card blog-intro"><div class="section-kicker">BLOG DO COLECIONADOR</div><h1>Novidades, guias e dicas Hot Wheels</h1><p class="muted">Artigos sobre identificação de variantes, conservação de blister, Treasure Hunts e leitura de vendas concluídas.</p><button class="btn primary" id="blogCatalogButton" type="button">Abrir arquivo TH / STH</button></div>';main.insertBefore(page,app)}
 if(!$('catalogSearch')){const controls=document.querySelector('.catalog-controls');if(controls){const extra=document.createElement('div');extra.className='catalog-extra-controls';extra.innerHTML='<label for="catalogSearch">Pesquisar modelo</label><input id="catalogSearch" type="search" placeholder="Ex.: Skyline, Camaro, Ferrari..." autocomplete="off"><label for="catalogSort">Ordenar</label><select id="catalogSort"><option value="series">Ordem da série</option><option value="az">Nome A–Z</option><option value="za">Nome Z–A</option></select>';controls.parentElement.append(extra)}}
 if(!$('catalogDetail')){const d=document.createElement('div');d.id='catalogDetail';d.className='catalog-dialog-overlay hidden';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-hidden','true');d.setAttribute('aria-labelledby','catalogDetailTitle');d.innerHTML="<article class='catalog-dialog' role='document'><button id='catalogDetailClose' class='auth-close' type='button' aria-label='Fechar ficha' title='Fechar'>×</button><div class='catalog-detail-top'><span id='catalogDetailBadge' class='catalog-badge th'>TREASURE HUNT</span><span id='catalogDetailYear' class='catalog-detail-year'></span></div><div class='catalog-detail-layout'><div id='catalogDetailImage' class='catalog-detail-art'><span>HOT WHEELS</span><strong id='catalogDetailArtType'>TH</strong><small>PRICE CHECK</small></div><div class='catalog-detail-copy'><h2 id='catalogDetailTitle'>Modelo Hot Wheels</h2><p id='catalogDetailMeta' class='muted'></p><div class='catalog-detail-value'><span>Estimativa de mercado</span><strong id='catalogDetailValue'>A consultar</strong><small id='catalogDetailValueNote'></small></div><p id='catalogDetailEra' class='note'></p><p id='catalogDetailSourceNote' class='note'></p></div></div><div class='catalog-detail-actions'><a id='catalogDetailSource' class='btn' href='https://hunt64.app/blog/2026-hot-wheels-treasure-hunt-list' target='_blank' rel='noopener'>Ver fotografias e checklist ↗</a><button id='catalogDetailMarket' class='btn primary' type='button'>Consultar vendas concluídas</button></div><p class='note'>Valores indicativos. Confirma sempre estado, blister, variante, país e custos de envio antes de comprar ou vender.</p></article>";document.body.append(d)}

 if(typeof CATALOG!=="undefined"&&CATALOG["2026"]){const s=CATALOG["2026"].sth;const i=s.indexOf("Subaru Impreza");if(i>=0)s[i]="Subaru Impreza WRX"}
 const RATE=0.8969;
 const PRICE={
  th:{"'87 Buick Regal GNX":5.26,"'92 Dodge Viper RT/10":5,"Electro Silhouette":5.56,"Hot Wheengs":5.56,"Cone Shaker":5.56,"2016 Ford GT Race":8.98,"2 Jet Z":5.75,"Total Disposal":5.41,"Amaru GTC":5.56,"Sweet Driver":5.15,"Mad Manga":4,"Ford Model A Custom '31":3.09,"Fast Fish":5,"Nissan Skyline HT 2000GT-X":8.25,"Gazella GT":2.33},
  sth:{"'23 Ram 1500":95,"'64 Impala":67,"'67 Pontiac Firebird 400":49,"'70 Plymouth AAR 'Cuda":42,"'87 Ford Sierra Cosworth":46,"'94 Toyota Supra (Tooned)":55,"Custom Otto":48,"Drift-Ender":38,"Ferrari F40 Competizione":138,"Ford Mustang GTD":65,"Honda Civic Custom":85,"Lotus Sport Elise":44,"Nissan Maxima Drift Car":119,"Porsche 911 Carrera RS 2.7":59,"Subaru Impreza WRX":52}
 };
 const PHOTO={
  "2026|th|'87 Buick Regal GNX":"https://i.ebayimg.com/images/g/0LIAAeSwknFqZfv5/s-l500.jpg",
  "2026|th|'92 Dodge Viper RT/10":"https://www.hwtreasure.com/wp-content/uploads/cars/2025/10/26-TH-92-Dodge-Viper-RT10-1.jpg",
  "2026|th|Electro Silhouette":"https://99diecast.com/cdn/shop/files/HW-JJM02_front_700x700.jpg?v=1774538413",
  "2026|th|Hot Wheengs":"https://i.ebayimg.com/images/g/SMAAAeSw4lZpMpKI/s-l1200.jpg",
  "2026|th|Cone Shaker":"https://www.shopsentosa.com/cdn/shop/files/HotwheelsECaseSentosa_23.jpg?v=1770902838",
  "2026|th|2016 Ford GT Race":"https://www.shopsentosa.com/cdn/shop/files/Hotwheelstreasurehunt.jpg?v=1774873033",
  "2026|th|2 Jet Z":"https://cdn.awsli.com.br/2500x2500/2518/2518221/produto/400934893/d2cdbc476dfc4a98b8d9283486f6ceec-kqdl4a1598.jpg",
  "2026|th|Total Disposal":"https://zoomsters.in/cdn/shop/files/rn-image-picker-lib-temp-e4bedaa7-4fe5-4dd9-93f2-def54d5d0ed0-_1.jpg?v=1778485596",
  "2026|th|Amaru GTC":"https://jrcollectibles.eu/cdn/shop/files/HotWheels_AmaruGTC_RegularTreasureHunt.jpg?v=1781618414",
  "2026|th|Sweet Driver":"https://wheelcollectors.com/cdn/shop/files/20260612_131641_800x.jpg?v=1781545528",
  "2026|th|Mad Manga":"https://i.ebayimg.com/images/g/AQ8AAeSwKVxqmUtZ/s-l1600.jpg",
  "2026|th|Ford Model A Custom '31":"https://i.ebayimg.com/images/g/UrwAAeSwkAlql5KP/s-l960.jpg",
  "2026|th|Fast Fish":"https://i.ebayimg.com/thumbs/images/g/DyIAAeSwJHdqf5ra/s-l500.jpg",
  "2026|sth|Drift-Ender":"https://i.ebayimg.com/images/g/IMUAAeSwTyVpuZ7N/s-l1600.jpg",
  "2026|sth|Ford Mustang GTD":"https://i.ebayimg.com/images/g/IosAAeSwBUJo1T7o/s-l960.jpg",
  "2026|sth|Ferrari F40 Competizione":"https://i.ebayimg.com/images/g/Ch8AAeSwUqJo-Lu7/s-l1200.jpg",
  "2026|sth|'64 Impala":"https://i.ebayimg.com/images/g/8RQAAeSwkcppw~3W/s-l960.jpg",
  "2026|sth|'87 Ford Sierra Cosworth":"https://wheelcollectors.com/cdn/shop/files/20260225_112033.jpg?v=1772046001",
  "2026|sth|Honda Civic Custom":"https://i.ebayimg.com/images/g/fpAAAeSwHVZpdz1P/s-l500.jpg",
  "2026|sth|Custom Otto":"https://i.ebayimg.com/images/g/sSIAAeSwAlppzNMu/s-l1600.jpg",
  "2026|sth|Lotus Sport Elise":"https://i.ebayimg.com/images/g/g1kAAeSwF7Vp1xij/s-l400.jpg",
  "2026|sth|Subaru Impreza WRX":"https://i.ebayimg.com/images/g/Rg8AAeSwhllqKp7c/s-l400.jpg",
  "2026|sth|'94 Toyota Supra (Tooned)":"https://i.ebayimg.com/images/g/83oAAeSwIOxqHZuc/s-l1600.jpg",
  "2026|sth|Nissan Maxima Drift Car":"https://i.ebayimg.com/images/g/iE0AAeSwWaNqkP19/s-l500.jpg",
  "2026|sth|Porsche 911 Carrera RS 2.7":"https://i.ebayimg.com/images/g/xmkAAeSw8GhqBHDI/s-l400.jpg",
  "2026|sth|'23 Ram 1500":"https://i.ebayimg.com/images/g/uwAAAeSw7zhqiDgJ/s-l1600.jpg",
  "2026|sth|'70 Plymouth AAR 'Cuda":"https://i.ebayimg.com/images/g/3EMAAeSwpG5qu892/s-l1600.jpg",
  "2026|sth|'67 Pontiac Firebird 400":"https://i.ebayimg.com/images/g/34MAAeSwKVhqlS40/s-l1600.png"
 };
 const SOURCE=item=>item.year==="2026"?(item.kind==="sth"?"https://hotwheelstreasure.com/":"https://hunt64.app/blog/2026-hot-wheels-treasure-hunt-list"):(item.kind==="sth"?"https://hotwheelstreasure.com/cars":"https://relicara.com/hot-wheels-treasure-hunt-list/");
 const INFO={
  th:{
   "'87 Buick Regal GNX":["JJM00","9/250","Nightspeed","A"],"'92 Dodge Viper RT/10":["JJM01","29/250","Drop Tops","B"],"Electro Silhouette":["JJM02","58/250","HW EV","C"],"Hot Wheengs":["JJM03","81/250","X-Raycers","D"],"Cone Shaker":["JJM04","122/250","HW Starting Grid","E"],"2016 Ford GT Race":["JJM05","124/250","Exoticars","F"],"2 Jet Z":["JJM06","147/250","HW Dream Garage","G"],"Total Disposal":["JJM07","162/250","HW Heavyweights","H"],"Amaru GTC":["JJM08","186/250","HW Mods","J"],"Sweet Driver":["JJM09","196/250","Sweet Rides","K"],"Mad Manga":["JJM10","217/250","Hot Wheels Let's Race","L"],"Ford Model A Custom '31":["JJM11","229/250","Rod Squad","M"],"Fast Fish":["JJM12","238/250","Team Wheels","N"],"Nissan Skyline HT 2000GT-X":["JJM13","244/250","Screen Time","P"],"Gazella GT":["JJM14","247/250","Trophy Case","Q"]
  },
  sth:{
   "Drift-Ender":["JJM15","13/250","Truckin' Along","A"],"Ford Mustang GTD":["JJM16","43/250","Factory Fresh","B"],"Ferrari F40 Competizione":["JJM17","63/250","Ferrari","C"],"'64 Impala":["JJM18","95/250","Layin' Low","D"],"'87 Ford Sierra Cosworth":["JJM19","116/250","HW Euro","E"],"Honda Civic Custom":["JJM20","159/250","Drag Racers","F"],"Custom Otto":["JJM21","156/250","Mattel Classics","G"],"Lotus Sport Elise":["JJM22","160/250","Compact Kings","H"],"Subaru Impreza WRX":["JJM23","176/250","HW J-Imports","J"],"Porsche 911 Carrera RS 2.7":["JJM24","208/250","Then and Now","M"],"'94 Toyota Supra (Tooned)":["JJM25","222/250","Tooned","K"],"Nissan Maxima Drift Car":["JJM26","225/250","Wagons","L"],"'23 Ram 1500":["JJM27","234/250","HW Dirt","N"],"'70 Plymouth AAR 'Cuda":["JJM28","245/250","HW Torque","P"],"'67 Pontiac Firebird 400":["JJM29","249/250","Cool Classics","Q"]
  }
 };
 const price=item=>item.year==="2026"?(PRICE[item.kind]||{})[item.name]??null:null;
 const euro=usd=>"€"+(usd*RATE).toFixed(2).replace(".",",");
 const era=item=>{const y=Number(item.year);if(y<=2006)return "1995–2006: os Treasure Hunts eram uma série própria numerada; ainda não existiam Super Treasure Hunts.";if(y<=2011)return "2007–2011: a versão Super usava o mesmo casting TH, com Spectraflame e pneus Real Riders.";if(y===2012)return "2012: TH e STH passaram a ter modelos diferentes.";return "Desde 2013, TH e STH são conjuntos separados dentro da mainline."};
 let chosen=null;
 function closeDetail(){$('catalogDetail').classList.add('hidden');$('catalogDetail').setAttribute('aria-hidden','true');chosen=null}
 function openDetail(item){
  chosen=item;const usd=price(item),img=PHOTO[item.year+"|"+item.kind+"|"+item.name]||"",m=INFO[item.kind]?.[item.name],isSth=item.kind==="sth";
  $('catalogDetailBadge').textContent=isSth?"SUPER TREASURE HUNT":"TREASURE HUNT";$('catalogDetailBadge').className="catalog-badge "+item.kind;
  $('catalogDetailYear').textContent="ANO "+item.year;$('catalogDetailArtType').textContent=isSth?"STH":"TH";
  $('catalogDetailTitle').textContent=item.name;$('catalogDetailMeta').textContent=m?m[0]+" · "+m[2]+" · "+m[1]:(isSth?"Super Treasure Hunt":"Treasure Hunt")+" · "+item.year;
  $('catalogDetailValue').textContent=usd!==null?"≈ "+euro(usd):"Sem mediana individual publicada";
  $('catalogDetailValueNote').textContent=usd!==null?(isSth?"Mediana de cinco vendas concluídas nos últimos 90 dias (TH Vault).":"Mediana de valores registados por colecionadores (Hunt64; mínimo de cinco contribuições)."):"Sem amostra fiável nesta base. Usa a pesquisa de vendas concluídas para obter comparáveis.";
  $('catalogDetailEra').textContent=era(item);$('catalogDetailSourceNote').textContent=usd!==null?(isSth?"Fonte: TH Vault · mediana em USD; conversão para EUR a 0,8969 em 08-11-2026.":"Fonte: Hunt64 · mediana em USD, consulta 03-11-2026; conversão para EUR a 0,8969 em 08-11-2026."):"Fonte de checklist histórica. O preço depende do estado, variante, região e procura.";
  $('catalogDetailSource').href=SOURCE(item);
  $('catalogDetailImage').innerHTML=img?'<img src="'+img+'" alt="'+safe(item.name)+' Hot Wheels" loading="lazy"><small>'+item.year+'</small>':'<span>HOT WHEELS</span><strong>'+(isSth?"STH":"TH")+'</strong><small>'+item.year+'</small>';
  const image=$('catalogDetailImage').querySelector('img');if(image)image.addEventListener('error',()=>{$('catalogDetailImage').innerHTML='<span>HOT WHEELS</span><strong>'+(isSth?"STH":"TH")+'</strong><small>'+item.year+'</small>'});
  $('catalogDetail').classList.remove('hidden');$('catalogDetail').setAttribute('aria-hidden','false');$('catalogDetailClose').focus();
 }
 renderCatalog=function(){
  const year=$('catalogYear')?.value||"2026",type=$('catalogType')?.value||"all",q=($('catalogSearch')?.value||"").trim().toLocaleLowerCase("pt-PT"),sort=$('catalogSort')?.value||"series";
  const grid=$('catalogGrid'),summary=$('catalogSummary');if(!grid||!summary)return;
  const data=CATALOG[year]||{th:[],sth:[]};let rows=[];
  ["th","sth"].forEach(kind=>{if(type!=="all"&&type!==kind)return;(data[kind]||[]).forEach(name=>rows.push({name,kind,year}))});
  const total=rows.length;if(q)rows=rows.filter(item=>item.name.toLocaleLowerCase("pt-PT").includes(q));
  if(sort==="az")rows.sort((a,b)=>a.name.localeCompare(b.name,"pt-PT"));if(sort==="za")rows.sort((a,b)=>b.name.localeCompare(a.name,"pt-PT"));
  summary.textContent=rows.length+" de "+total+" modelos · "+(type==="all"?"TH + STH":type.toUpperCase())+" · "+year+(q?" · pesquisa: “"+q+"”":"");
  if(!rows.length){grid.innerHTML='<div class="empty catalog-empty">'+(type==="sth"&&Number(year)<2007?"Ainda não existiam Super Treasure Hunts antes de 2007.":"Não foram encontrados modelos com estes filtros.")+'</div>';return}
  grid.innerHTML=rows.map((item,index)=>{
   const usd=price(item),img=PHOTO[item.year+"|"+item.kind+"|"+item.name]||"",m=INFO[item.kind]?.[item.name],isSth=item.kind==="sth";
   const thumb=img?'<img src="'+img+'" alt="'+safe(item.name)+'" loading="lazy">':'<span>HOT WHEELS</span><strong>'+(isSth?"STH":"TH")+'</strong><small>'+year+'</small>';
   const value=usd!==null?"≈ "+euro(usd)+(isSth?" · vendas 90d":" · mediana comunidade"):"Preço: consultar vendas";
   const meta=m?m[0]+" · "+m[2]+" · "+m[1]:("Ano "+year+(Number(year)<=2006?" · Série clássica":Number(year)<=2011?" · TH / versão Super":" · Mainline"));
   return '<article class="catalog-card"><div class="catalog-thumb '+item.kind+'">'+thumb+'</div><div class="catalog-copy"><span class="catalog-badge '+item.kind+'">'+(isSth?"SUPER TREASURE HUNT":"TREASURE HUNT")+'</span><h3>'+safe(item.name)+'</h3><div class="catalog-meta">'+safe(meta)+'</div><div class="catalog-price">'+value+'</div><div class="catalog-actions"><button class="btn catalog-view-detail" type="button" data-catalog-index="'+index+'">Ver ficha</button><a class="btn" href="'+SOURCE(item)+'" target="_blank" rel="noopener">Ver fotos ↗</a></div></div></article>';
  }).join("");
  grid.querySelectorAll("[data-catalog-index]").forEach(button=>button.addEventListener("click",()=>{const item=rows[Number(button.dataset.catalogIndex)];if(item)openDetail(item)}));
  grid.querySelectorAll("img").forEach(img=>img.addEventListener("error",()=>{const card=img.closest(".catalog-card"),badge=card?.querySelector(".catalog-badge"),isSth=badge?.classList.contains("sth");img.replaceWith(Object.assign(document.createElement("div"),{className:"catalog-thumb",innerHTML:'<span>HOT WHEELS</span><strong>'+(isSth?"STH":"TH")+'</strong><small>'+year+'</small>'}))}));
 };
 renderCatalog();
 ["catalogYear","catalogType","catalogSort"].forEach(id=>$(id)?.addEventListener("change",renderCatalog));
 $('catalogSearch')?.addEventListener("input",renderCatalog);
 $('catalogDetailClose').onclick=closeDetail;
 $('catalogDetail').onclick=e=>{if(e.target===$('catalogDetail'))closeDetail()};
 $('catalogDetailMarket').onclick=()=>{
  if(!chosen)return;const item=chosen;closeDetail();openWorkspace("analyse");$('model').value=item.name;$('year').value=item.year;$('type').value=item.kind;
  $('soldResult').innerHTML='<p class="muted">A procurar vendas concluídas para '+safe(item.name)+' ('+item.year+')…</p>';$('soldSearch').click();
 };

 // Route every primary navigation button to a real page.
 const pageMap={home:"homePage",catalog:"catalogPage",about:"aboutPage",blog:"blogPage",workspace:"appWorkspace"};
 const setPage=page=>{
  Object.entries(pageMap).forEach(([key,id])=>$(id)?.classList.toggle("hidden",key!==page));
  document.querySelectorAll(".nav-link[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===(page==="catalog"?"guides":page)));
  window.scrollTo({top:0,behavior:"smooth"});
 };
 const goWorkspace=view=>{
  setPage("workspace");document.querySelectorAll(".view").forEach(v=>v.classList.toggle("hidden",v.id!==view));
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.view===view));
  document.querySelectorAll(".nav-link[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===view));
 };
 document.querySelectorAll("[data-page]").forEach(b=>b.onclick=()=>{
  const page=b.dataset.page;if(page==="home")setPage("home");else if(["analyse","collection","watch"].includes(page))goWorkspace(page);else if(page==="guides")setPage("catalog");else if(page==="about")setPage("about");else if(page==="blog")setPage("blog");
 });
 $('footerHome').onclick=e=>{e.preventDefault();setPage("home")};
 $('footerBlog')?.addEventListener("click",e=>{e.preventDefault();setPage("blog")});
 $('blogCatalogButton')?.addEventListener("click",()=>setPage("catalog"));
 document.querySelectorAll('a[href="#guidesSection"]').forEach(a=>a.addEventListener("click",e=>{e.preventDefault();setPage("catalog")}));
 document.querySelectorAll('a[href="#aboutSection"]').forEach(a=>a.addEventListener("click",e=>{e.preventDefault();setPage("about")}));

 const previousShowGate=showGate;
 showGate=value=>{previousShowGate(value);$('authGate').setAttribute("aria-hidden",value?"false":"true")};
 $('authClose').onclick=()=>showGate(false);$('authGate').onclick=e=>{if(e.target===$('authGate'))showGate(false)};
 document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){if(!$('catalogDetail').classList.contains("hidden"))closeDetail();else if(!$('authGate').classList.contains("hidden"))showGate(false)}
 });
})();
