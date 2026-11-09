(()=>{
 if(window.HWPC_UI_PATCH_NOV2026)return;
 window.HWPC_UI_PATCH_NOV2026=true;
 const $=id=>document.getElementById(id);

 // Homepage follows the supplied reference; archive and secondary sections move to their own pages.
 const main=document.querySelector('main'),app=$('appWorkspace'),guide=$('guidesSection'),catalog=$('treasureCatalog'),about=$('aboutSection');
 if(main&&app&&guide&&catalog){
  const page=document.createElement('section');page.id='catalogPage';page.className='catalog-page hidden';
  const inner=document.createElement('div');inner.className='catalog-page-inner';
  const intro=document.createElement('div');intro.className='page-intro';
  intro.innerHTML='<div class="section-kicker">GUIAS DE COLECIONADOR</div><h1>Arquivo Treasure Hunt</h1><p>Consulta os modelos por ano, distingue TH de STH e abre a ficha individual de cada miniatura.</p>';
  inner.append(intro,guide,catalog);page.append(inner);main.insertBefore(page,app);
  if(about){const p=document.createElement('section');p.id='aboutPage';p.className='wrap about-page hidden';p.append(about);main.insertBefore(p,app)}
  const blog=document.createElement('section');blog.id='blogPage';blog.className='wrap blog-page hidden';
  blog.innerHTML='<div class="card blog-intro"><div class="section-kicker">BLOG DO COLECIONADOR</div><h1>Novidades, guias e dicas Hot Wheels</h1><p class="muted">Artigos sobre identificação de variantes, conservação de blister, Treasure Hunts e leitura de vendas concluídas.</p><button class="btn primary" id="blogCatalogButton" type="button">Abrir arquivo TH / STH</button></div>';
  main.insertBefore(blog,app);
 }
 const controls=document.querySelector('.catalog-controls');
 if(controls&&!$('catalogSearch')){
  const extra=document.createElement('div');extra.className='catalog-extra-controls';
  extra.innerHTML='<label for="catalogSearch">Pesquisar modelo</label><input id="catalogSearch" type="search" placeholder="Ex.: Skyline, Camaro, Ferrari..." autocomplete="off"><label for="catalogSort">Ordenar</label><select id="catalogSort"><option value="series">Ordem da série</option><option value="az">Nome A–Z</option><option value="za">Nome Z–A</option></select>';
  controls.parentElement.append(extra);
 }
 if(!$('catalogDetail')){
  const d=document.createElement('div');d.id='catalogDetail';d.className='catalog-dialog-overlay hidden';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-hidden','true');d.setAttribute('aria-labelledby','catalogDetailTitle');
  d.innerHTML="<article class='catalog-dialog' role='document'><button id='catalogDetailClose' class='auth-close' type='button' aria-label='Fechar ficha' title='Fechar'>×</button><div class='catalog-detail-top'><span id='catalogDetailBadge' class='catalog-badge th'>TREASURE HUNT</span><span id='catalogDetailYear' class='catalog-detail-year'></span></div><div class='catalog-detail-layout'><div id='catalogDetailImage' class='catalog-detail-art'><span>HOT WHEELS</span><strong id='catalogDetailArtType'>TH</strong><small>PRICE CHECK</small></div><div class='catalog-detail-copy'><h2 id='catalogDetailTitle'>Modelo Hot Wheels</h2><p id='catalogDetailMeta' class='muted'></p><div class='catalog-detail-value'><span>Estimativa de mercado</span><strong id='catalogDetailValue'>Sem estimativa fiável</strong><small id='catalogDetailValueNote'>Não inventamos preços quando não existe amostra suficiente.</small></div><p id='catalogDetailEra' class='note'></p><p id='catalogDetailSourceNote' class='note'></p></div></div><div class='catalog-detail-actions'><a id='catalogDetailSource' class='btn' href='https://www.hwtreasure.com/2026-2/' target='_blank' rel='noopener'>Ver fotografias e checklist ↗</a><button id='catalogDetailMarket' class='btn primary' type='button'>Consultar vendas concluídas</button></div><p class='note'>Os valores variam com o estado do blister, condição da miniatura, variante, país e custos de envio. Uma mediana de colecionadores não garante um preço de venda.</p></article>";
  document.body.append(d);
 }

 // Missing close X on the login/register window.
 const auth=$('authGate')?.querySelector('.auth');
 if(auth&&!$('authClose')){const x=document.createElement('button');x.id='authClose';x.type='button';x.className='auth-close';x.textContent='×';x.title='Fechar';x.setAttribute('aria-label','Fechar janela de conta');auth.prepend(x)}

 // Verified historical lists. 2007–2011 STH are Super versions of the same TH casting.
 const Y={
 "2023":{th:"Raijin Express|Surf Crate|BMW R nineT Racer|Mad Propz|Mod Rod|Donut Drifter|Rise 'N Climb|Ducati 1199 Panigale|'95 Jeep Cherokee|Toyota Land Cruiser|Madfast|Time Shifter|Tooned Volkswagen Golf Mk1|2020 Ram 1500 Rebel|Volkswagen Baja Bug",sth:"Classic TV Series Batmobile|Mercedes-Benz 300 SL|'68 COPO Camaro|Lotus Evija|'68 Mazda Cosmo Sport|Renault Sport R.S. 01|'68 Corvette (Gas Monkey Garage)|Glory Chaser|'82 Toyota Supra|'69 Shelby GT-500|'65 Mercury Comet Cyclone|Mighty K|Porsche 935|Datsun Bluebird Wagon (510)|Volvo 240 Drift Wagon"},
 "2022":{th:"The Dark Knight Batmobile|Quick Bite|Pixel Shaker|Tooned Twin Mill|Draftnator|'17 Jeep Wrangler|Duck N' Roll|Morris Mini|Gotta Go|'87 Dodge D100|'58 Impala|HW Warp Speeder|'98 Subaru Impreza 22B STi-Version|Muscle and Blown|'71 Mustang Funny Car",sth:"'55 Chevy|'73 BMW 3.0 CSL Race Car|Dodge Van|'63 Studebaker Champ|2020 Corvette|'99 Honda Civic Type R (EK9)|Volkswagen Käfer Racer|2020 Jaguar F-Type|Custom '18 Ford Mustang GT|Nissan Skyline H/T 2000GT-X|'71 Lamborghini Miura SV|'84 Mustang SVO|'94 Audi Avant RS2|'32 Ford|'81 Camaro"},
 "2021":{th:"Baja Bone Shaker|Street Wiener|Custom '77 Dodge Van|Motosaurus|Skull Shaker|Tred Shredder|Deora II|Mustang Funny Car|Chrysler Pacifica|'91 Mazda MX-5 Miata|Ollie Rocket|1978 Dodge Li'l Red Express Truck|Justice League Batmobile|'65 Ford Galaxie|Lamborghini Countach Police Car",sth:"Nissan 300ZX Twin Turbo|Corvette Grand Sport Roadster|Rodger Dodger|'95 Mazda RX-7|Corvette C7 Z06 Convertible|Mazda RX-3|2020 Ford Mustang Shelby GT500|'71 Datsun 510|Porsche 356 Outlaw|2018 Honda Civic Type R|'68 Mercury Cougar|2019 Audi R8 Spyder|'49 Ford F1|'64 Nova Wagon Gasser|Shelby Cobra 427 S/C"},
 "2020":{th:"Bubble Matic|Mercedes-Benz Unimog 1300|Grass Chomper|Buns of Steel|Batman: Arkham Asylum Batmobile|Circle Trucker|Dodge Charger Daytona|2013 Hot Wheels Chevy Camaro Special Edition|Power Pistons|Custom '56 Ford Truck|Dune Daddy|Tricera-Truck|The Beatles Yellow Submarine|Chevy Silverado|Dodge Viper RT/10",sth:"Nissan Skyline GT-R (BNR32)|Ford GT-40|'67 Jeepster Commando|Porsche 918 Spyder|'88 Honda CR-X|Mazda RX-7|'17 Nissan GT-R (R35)|'84 Audi Sport quattro|Lamborghini Sesto Elemento|'57 Chevy|'69 Chevy Pickup|'65 Ford Galaxie|'18 Dodge Challenger SRT Demon|'17 Pagani Huayra Roadster|'64 Chevy Chevelle SS"},
 "2019":{th:"Bazoomka|Sting Rod|'69 Chevelle|Twin Mill|Honda Monkey Z50|Humvee|Corvette Stingray|Head Starter|HW Armored Truck|Custom Ford Bronco|Fast-Bed Hauler|Cyber Speeder|Sharkruiser|Batman: The Animated Series Batmobile|'67 Camaro",sth:"'90 Honda Civic EF|Nissan Skyline GT-R (BNR34)|Corvette Grand Sport Roadster|Volkswagen T2 Pickup|Back to the Future Time Machine (Hover Mode)|Mazda REPU|'92 Ford Mustang|'68 Mercury Cougar|'69 Corvette Racer|'18 Dodge Challenger SRT Demon|Street Creeper|Lamborghini Aventador J|Tesla Model S|Morris Mini|Porsche 911 GT3 RS"},
 "2018":{th:"Sting Rod II|El Viento|Tanknator|Street Stealth|Zombot|Rockster|Blitzspeeder|RRRoadster|Kool Kombi|Bump Around|Hollowback|Quick Bite|Ratical Racer|Batmobile|Crate Racer",sth:"Datsun 620|'68 Chevy Nova|Porsche 934.5|2015 Ford Mustang GT|Nissan Skyline 2000 GT-R|Indy 500 Oval|'68 Mustang|2017 Camaro ZL1|'52 Chevy|Aventador Miura Homage|King Kuda|'17 Audi RS 6 Avant|Fiat 500|'70 Ford Escort RS1600|Cruella de Vil"},
 "2017":{th:"Winning Formula|Fangula|Dragon Blaster|'69 Camaro Z28 (Tooned)|Tooligan|So Plowed|HW Pursuit|Fandango|Pedal Driver|Blade Raider|Arrow Dynamic|24 Ours|Hot Wheels Ford Transit Connect|Blast Lane|Pharodox",sth:"'69 Chevelle SS 396|'63 Chevy II|The Mystery Machine|16 Angels|Toyota Off-Road Truck|Surf Crate|'17 Acura NSX|'67 Chevy C10|Batmobile|2013 SRT Viper|Cruise Bruiser|2005 Ford Mustang|'67 Camaro|Velocita|Nissan Fairlady Z"},
 "2016":{th:"Rig Storm|'11 Corvette Grand Sport|Rip Rod|4ward Speed|Dodge Charger SRT8|Mountain Mauler|Mig Rig|Grease Rod|Let's GO|Bad Bagger|Night Burner|T-Rextroyer|Howlin' Heat|Repo Duty|Dune Crusher",sth:"2008 Tesla Roadster|'52 Hudson Hornet|'90 Acura NSX|'14 Corvette Stingray|Porsche 993 GT2|Bad Mudder 2|'69 Dodge Charger Daytona|'10 Pro Stock Camaro|TV Series Batmobile|BMW Z4 M Motorsport|Boom Box|Driftsta|'17 Ford GT|Nitro Doorslammer|Carbonic"},
 "2015":{th:"Chicane|Jeep CJ-7|RocketFire|Fast FeLion|Volkswagen Beetle|Jet Threat 4.0|Paradigm Shift|Fast Gassin|Enforcer|Mad Splash|Piranha Terror|Time Tracker|Team Hot Wheels Corkscrew Buggy|Rogue Hog|Tread Air",sth:"Kool Kombi|RRRoadster|Toyota AE-86 Corolla|Ferrari 599XX|'69 Ford Mustang Boss 302|Custom '77 Dodge Van|Pass'n Gasser|Mastretta MXR|8 Crate|2008 Lancer Evolution|'65 Mustang 2+2 Fastback|DMC DeLorean|Toyota Supra|'70 Plymouth Superbird|Toyota Off-Road Truck"},
 "2014":{th:"Subaru WRX STI|Night Burner|Fangster|Speedbox|Maximum Leeway|Loop Coupe|Rescue Duty|Stockar|Twinduction|'12 Ford Fiesta|Custom '71 El Camino|Off Track|Poison Arrow|La Fasta|Cloak and Dagger",sth:"Chevrolet SS|Sandblaster|2013 Hot Wheels Chevy Camaro Special Edition|'71 Mustang Mach 1|'07 Ford Mustang|'55 Chevy Bel Air Gasser|'70 Chevy Chevelle SS|Twin Mill|'64 Chevy Nova Station Wagon|'83 Chevy Silverado|'76 Greenwood Corvette|'69 Corvette|'65 Chevy Impala|Harley-Davidson Fat Boy|'71 Datsun Bluebird 510 Wagon"},
 "2013":{th:"Bread Box|Carbonator|'10 Camaro SS|Fast Fish|Circle Trucker|'64 Lincoln Continental|Sting Rod II|Prototype H-24|Custom '77 Dodge Van|Dodge Challenger Drift Car|Ford Mustang GT Concept|Fire-Eater|'12 Ford Fiesta|Mazda RX-7|Bad to the Blade",sth:"'10 Ford Shelby GT500 Super Snake|'72 Ford Ranchero|'10 Toyota Tundra|Toyota 2000GT|Bone Shaker|'69 Chevy Camaro Convertible|'73 Ford Falcon XB|'09 Corvette ZR1|'62 Corvette|'71 Dodge Demon|'07 Ford Mustang|'71 El Camino|'64 Buick Riviera|'72 Ford Gran Torino Sport|'67 Camaro"},
 "2012":{th:"Custom '41 Willys Coupe|Ducati 1098R|'69 Chevelle SS 396|Ford GT|'69 Corvette|Tyrrell P34|'67 Mustang|'52 Chevy Truck|Ferrari 430 Scuderia|'65 Chevy Malibu|Ford Shelby GR-1 Concept|'65 Ford Ranchero|Surf Crate|'92 Ford Mustang|'70 Chevy Chevelle Convertible",sth:"'71 Dodge Challenger|'69 Dodge Coronet Super Bee|'69 Camaro|'67 Chevelle SS 396|'66 Ford Fairlane GT|Custom '67 Ford Mustang Coupe|'73 Ford Falcon XB|Ferrari 599XX|Ford Focus RS|'70 Chevelle SS Wagon|Honda S2000|'70 Camaro Road Race|Tooned VW Bug|'11 Dodge Charger R/T|'71 Maverick Grabber"},
 "2011":{th:"Tucker Torpedo|'57 Chevy|'58 Impala|Custom '62 Chevy Pickup|Studebaker Avanti|'63 T-Bird|'64 Pontiac GTO|'68 Olds 442|Corvette Grand Sport|'71 Mustang Funny Car|'71 Buick Riviera|Datsun 240Z|'80 El Camino|OCC Splitback|'59 Chevy Delivery"},
 "2010":{th:"Custom '53 Cadillac|Chevroletor|Classic Packard|Ratbomb|Shelby Cobra Daytona Coupe|Gangster Grin|Ford GTX1|Old Number 5.5|'69 Ford Torino Talladega|Chevy Camaro Concept|Baja Beetle|'69 Ford Mustang"},
 "2009":{th:"'65 Mustang Convertible|'57 Plymouth Fury|Bad Bagger|Fire-Eater|'37 Ford Woodie|'34 Ford|Custom '53 Chevy|Bone Shaker|'49 Merc|'55 Chevy|GMC Motorhome|Neet Streeter"},
 "2008":{th:"Chrysler 300C|'70 Plymouth Road Runner|Rockster|Ford Mustang GT|Hot Bird|Qombee|Dodge Challenger Funny Car|Dodge Viper|16 Angels|'64 Buick Riviera|Drift King|'69 Camaro"},
 "2007":{th:"'69 Pontiac GTO|Nissan Skyline|'69 Camaro Z28|Corvette C6R|Mega Thrust|Hammer Sled|Brutalistic|Jaded|Enzo Ferrari|Custom '69 Chevy|Cadillac V16|Evil Twin"},
 "2006":{th:"Asphalt Assault|'40 Ford Coupe|Sooo Fast|Custom '59 Cadillac|VW New Beetle Cup|'67 Mustang|'69 Dodge Charger|Hummer H3T|CUL8R|C6 Corvette|Pit Cruiser|Dairy Delivery"},
 "2005":{th:"Purple Passion|'67 Camaro|'58 Corvette|'57 Chevy|'56 Flashsider|3-Window '34|Mustang Mach I|'67 Pontiac GTO|Rodger Dodger|Mini Cooper|'70 Plymouth Barracuda|The Demon|VW Drag Bus"},
 "2004":{th:"'65 Pontiac Bonneville|GT-03|Cadillac Cien|Double Demon|Super Smooth|Splittin' Image|Altered State|Morris Wagon|Whip Creamer II|Tantrum|Audacious|Meyers Manx"},
 "2003":{th:"Hooligan|'56 Ford Panel|Shoe Box|'68 Cougar|'68 El Camino|Porsche 959|Midnight Otto|Riley & Scott Mk III|'57 Cadillac Eldorado Brougham|Muscle Tone|Super Tsunami|'70 Plymouth Barracuda"},
 "2002":{th:"La Troca|'71 Plymouth GTX|'57 Roadster|Lotus Project M250|Ford Thunderbolt|Panoz LMP Roadster S|Phaeton|Fat Fendered '40|'40 Ford Truck|Tail Dragger|Mini Cooper|Anglia Panel Truck"},
 "2001":{th:"'65 Corvette|Roll Cage|So Fine|Rodger Dodger|Blast Lane|Hammered Coupe|Vulture|'67 Dodge Charger|Olds 442|Pontiac Rageous|Deora|Cabbin' Fever"},
 "2000":{th:"Double Vision|Tow Jam|1936 Cord|Sweet 16 II|Lakester|Go Kart|Chaparral 2|'57 T-Bird|Pikes Peak Celica|'67 Pontiac GTO|Ford GT-40|1970 Chevelle SS"},
 "1999":{th:"Mercedes 540K|T-Bird Stocker|'97 Corvette|Rigor Motor|Ferrari F512M|'59 Impala|Hot Wheels 500|Jaguar D-Type|'32 Ford Delivery|Hot Seat|Mustang Mach I|Express Lane"},
 "1998":{th:"Twang Thang|Scorchin' Scooter|Kenworth T600A|3-Window '34|Turbo Flame|Saltflat Racer|Street Beast|Road Rocket|Sol-Aire CX4|'57 Chevy|Stingray III|Way 2 Fast"},
 "1997":{th:"'56 Flashsider|Silhouette II|Mercedes 500SL|Street Cleaver|GM Lean Machine|Hot Rod Wagon|Olds Aurora|Dogfighter|Buick Wildcat|Blimp|Avus Quattro|Rail Rodder"},
 "1996":{th:"'40s Woodie|Auburn 852|Ferrari 250|Jaguar XJ220|'59 Caddy|Dodge Viper RT/10|'57 Chevy|Ferrari 355|'58 Corvette|Lamborghini Countach|Dodge Ram 1500|'37 Bugatti"},
 "1995":{th:"Olds 442|Gold Passion|'67 Camaro|'57 T-Bird|VW Bug|'63 Split Window|Stutz Blackhawk|Rolls-Royce Phantom II|Classic Caddy|Classic Nomad|Classic Cobra|'31 Doozie"}
 };
 Object.entries(Y).forEach(([year,x])=>{CATALOG[year]={th:x.th.split("|"),sth:x.sth?x.sth.split("|"):[]};});
 ["2007","2008","2009","2010","2011"].forEach(y=>CATALOG[y].sth=CATALOG[y].th.slice());

 // Individual 2026 collector medians only; other years intentionally have no made-up prices.
 const MARKET={
  th:{"'87 Buick Regal GNX":4.72,"'92 Dodge Viper RT/10":4.48,"Electro Silhouette":4.99,"Hot Wheengs":4.99,"Cone Shaker":4.99,"2016 Ford GT Race":8.06,"2 Jet Z":5.16,"Total Disposal":4.85,"Amaru GTC":4.99,"Sweet Driver":4.62,"Mad Manga":3.59,"Ford Model A Custom '31":2.77,"Fast Fish":4.48,"Nissan Skyline HT 2000GT-X":7.40,"Gazella GT":2.09},
  sth:{"Ferrari F40 Competizione":163.90,"Ford Mustang GTD":73.55,"Subaru Impreza":79.82,"'87 Ford Sierra Cosworth":31.39,"'64 Impala":29.60,"Custom Otto":14.35,"Porsche 911 Carrera RS 2.7":11.58}
 };
 const IMAGES={
  "2026|th|'87 Buick Regal GNX":"https://www.hwtreasure.com/wp-content/uploads/cars/2025/10/2026-TH-87-Buick-Regal-GNX-1.jpg",
  "2026|th|'92 Dodge Viper RT/10":"https://www.hwtreasure.com/wp-content/uploads/cars/2025/10/26-TH-92-Dodge-Viper-RT10-1.jpg",
  "2026|th|Electro Silhouette":"https://99diecast.com/cdn/shop/files/HW-JJM02_front_700x700.jpg?v=1774538413",
  "2026|sth|Ferrari F40 Competizione":"https://i.ebayimg.com/images/g/-g8AAeSwHCdpZxXJ/s-l1600.jpg",
  "2026|sth|'64 Impala":"https://i.ebayimg.com/images/g/8RQAAeSwkcppw~3W/s-l960.jpg",
  "2026|sth|'87 Ford Sierra Cosworth":"https://wheelcollectors.com/cdn/shop/files/20260225_112033_800x.jpg?v=1772046001",
  "2026|sth|Drift-Ender":"https://i.ebayimg.com/images/g/IMUAAeSwTyVpuZ7N/s-l1600.jpg",
  "2026|sth|Porsche 911 Carrera RS 2.7":"https://i.ebayimg.com/images/g/xmkAAeSw8GhqBHDI/s-l400.jpg"
 };
 const source=item=>item.year==="2026"?(item.kind==="sth"?"https://hunt64.app/blog/2026-hot-wheels-super-treasure-hunt-list":"https://hunt64.app/blog/2026-hot-wheels-treasure-hunt-list"):(item.kind==="sth"?"https://hotwheelstreasure.com/cars":"https://relicara.com/hot-wheels-treasure-hunt-list/");
 const market=item=>item.year==="2026"?(MARKET[item.kind]||{})[item.name]??null:null;
 const era=item=>{const y=Number(item.year);if(y<2007)return "1995–2006: Treasure Hunt era uma série própria numerada; ainda não existia STH.";if(y<=2011)return "2007–2011: cada casting TH também teve uma versão Super com pintura Spectraflame e pneus Real Riders.";if(y===2012)return "2012: os conjuntos Treasure Hunt e Super Treasure Hunt passaram a apresentar modelos diferentes.";return "Desde 2013, TH e STH integram a mainline como conjuntos separados."};
 let selected=null;
 function closeDetail(){$('catalogDetail').classList.add('hidden');$('catalogDetail').setAttribute('aria-hidden','true');selected=null}
 function openDetail(item){
  selected=item;const p=market(item),img=IMAGES[item.year+"|"+item.kind+"|"+item.name]||"",sth=item.kind==="sth";
  $('catalogDetailBadge').textContent=sth?"SUPER TREASURE HUNT":"TREASURE HUNT";$('catalogDetailBadge').className="catalog-badge "+item.kind;
  $('catalogDetailYear').textContent="ANO "+item.year;$('catalogDetailArtType').textContent=sth?"STH":"TH";
  $('catalogDetailTitle').textContent=item.name;$('catalogDetailMeta').textContent=(sth?"Super Treasure Hunt":"Treasure Hunt")+" · "+item.year;
  $('catalogDetailValue').textContent=p?"€"+p.toFixed(2).replace(".",","):"Sem estimativa individual fiável";
  $('catalogDetailValueNote').textContent=p?"Mediana de avaliações de colecionadores, publicada em novembro de 2026.":"Não existe amostra suficiente documentada para este modelo.";
  $('catalogDetailEra').textContent=era(item);$('catalogDetailSourceNote').textContent=p?"Fonte Hunt64, valores publicados em 03-11-2026; conversão USD/EUR a 0,8969 em 08-11-2026.":"Checklist histórica; sem preço individual documentado.";
  $('catalogDetailSource').href=source(item);
  $('catalogDetailImage').innerHTML=img?'<img src="'+img+'" alt="'+safe(item.name)+' Hot Wheels" loading="lazy">':'<span>HOT WHEELS</span><strong>'+(sth?"STH":"TH")+'</strong><small>'+item.year+'</small>';
  $('catalogDetail').classList.remove('hidden');$('catalogDetail').setAttribute('aria-hidden','false');$('catalogDetailClose').focus();
 }
 renderCatalog=function(){
  const year=$('catalogYear')?.value||"2026",type=$('catalogType')?.value||"all",q=($('catalogSearch')?.value||"").trim().toLocaleLowerCase("pt-PT"),sort=$('catalogSort')?.value||"series";
  const grid=$('catalogGrid'),summary=$('catalogSummary');if(!grid||!summary)return;
  const dataset=CATALOG[year]||{th:[],sth:[]};let rows=[];
  ["th","sth"].forEach(kind=>{if(type!=="all"&&type!==kind)return;(dataset[kind]||[]).forEach(name=>rows.push({name,kind,year}))});
  const total=rows.length;if(q)rows=rows.filter(x=>x.name.toLocaleLowerCase("pt-PT").includes(q));
  if(sort==="az")rows.sort((a,b)=>a.name.localeCompare(b.name,"pt-PT"));if(sort==="za")rows.sort((a,b)=>b.name.localeCompare(a.name,"pt-PT"));
  summary.textContent=rows.length+" de "+total+" modelos · "+(type==="all"?"TH + STH":type.toUpperCase())+" · "+year+(q?" · pesquisa: “"+q+"”":"");
  if(!rows.length){grid.innerHTML='<div class="empty catalog-empty">'+(type==="sth"&&Number(year)<2007?"Ainda não existiam Super Treasure Hunts antes de 2007.":"Não foram encontrados modelos com estes filtros.")+'</div>';return}
  grid.innerHTML=rows.map((item,i)=>{
   const p=market(item),img=IMAGES[item.year+"|"+item.kind+"|"+item.name]||"",sth=item.kind==="sth";
   const thumb=img?'<img src="'+img+'" alt="'+safe(item.name)+'" loading="lazy">':'<span>HOT WHEELS</span><strong>'+(sth?"STH":"TH")+'</strong><small>'+year+'</small>';
   const value=p?"Estimativa: €"+p.toFixed(2).replace(".",","):"Sem estimativa fiável";
   return '<article class="catalog-card"><div class="catalog-thumb '+item.kind+'">'+thumb+'</div><div class="catalog-copy"><span class="catalog-badge '+item.kind+'">'+(sth?"SUPER TREASURE HUNT":"TREASURE HUNT")+'</span><h3>'+safe(item.name)+'</h3><div class="catalog-meta">Ano '+year+' · '+(Number(year)<2007?"Série clássica":Number(year)<=2011?"TH / versão Super":"Mainline")+'</div><div class="catalog-price">'+value+'</div><div class="catalog-actions"><button class="btn catalog-view-detail" type="button" data-catalog-index="'+i+'">Ver ficha</button><a class="btn" href="'+source(item)+'" target="_blank" rel="noopener">Ver fotos ↗</a></div></div></article>';
  }).join("");
  grid.querySelectorAll("[data-catalog-index]").forEach(b=>b.addEventListener("click",()=>{const item=rows[Number(b.dataset.catalogIndex)];if(item)openDetail(item)}));
 };
 $('catalogDetailClose')?.addEventListener('click',closeDetail);
 $('catalogDetail')?.addEventListener('click',e=>{if(e.target===$('catalogDetail'))closeDetail()});
 $('catalogDetailMarket')?.addEventListener('click',()=>{
  if(!selected)return;const item=selected;closeDetail();openWorkspace('analyse');
  $('model').value=item.name;$('year').value=item.year;$('type').value=item.kind;
  $('soldResult').innerHTML='<p class="muted">A procurar vendas concluídas para '+safe(item.name)+' ('+item.year+')…</p>';$('soldSearch').click();
 });

 // Correct route destinations for header and footer navigation.
 setMainPage=function(page){
  const pages={home:'homePage',catalog:'catalogPage',about:'aboutPage',blog:'blogPage',workspace:'appWorkspace'};
  Object.entries(pages).forEach(([key,id])=>$(id)?.classList.toggle('hidden',key!==page));
  document.querySelectorAll('.nav-link[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===(page==="catalog"?"guides":page)));
  window.scrollTo({top:0,behavior:'smooth'});
 };
 showHome=()=>setMainPage('home');showCatalog=()=>{setMainPage('catalog');renderCatalog()};showAbout=()=>setMainPage('about');showBlog=()=>setMainPage('blog');
 openWorkspace=view=>{
  setMainPage('workspace');
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('hidden',v.id!==view));
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.view===view));
  document.querySelectorAll('.nav-link[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===view));
  $('appWorkspace').scrollIntoView({behavior:'smooth',block:'start'});
 };
 document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{
  const p=b.dataset.page;if(p==="home")showHome();else if(["analyse","collection","watch"].includes(p))openWorkspace(p);else if(p==="guides")showCatalog();else if(p==="about")showAbout();else if(p==="blog")showBlog();
 });
 $('footerHome')?.addEventListener('click',e=>{e.preventDefault();showHome()});
 document.querySelectorAll('.footer-col a').forEach(a=>{if(a.textContent.trim()==="Blog")a.addEventListener('click',e=>{e.preventDefault();showBlog()})});
 $('blogCatalogButton')?.addEventListener('click',showCatalog);
 document.querySelectorAll('a[href="#guidesSection"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showCatalog()}));
 document.querySelectorAll('a[href="#aboutSection"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showAbout()}));

 // Account modal can be closed with X, click outside or Escape.
 const originalShowGate=showGate;
 showGate=function(value){originalShowGate(value);$('authGate')?.setAttribute('aria-hidden',value?'false':'true')};
 $('authClose')?.addEventListener('click',()=>showGate(false));
 $('authGate')?.addEventListener('click',e=>{if(e.target===$('authGate'))showGate(false)});
 document.addEventListener('keydown',e=>{
  if(e.key==="Escape"){
   if($('catalogDetail')&&!$('catalogDetail').classList.contains('hidden'))closeDetail();
   else if($('authGate')&&!$('authGate').classList.contains('hidden'))showGate(false);
  }
 });
})();
