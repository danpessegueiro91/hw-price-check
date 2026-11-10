
const SUPABASE_URL='https://hvxszwbszrigeznmmkeb.supabase.co',KEY='sb_publishable_onFuWjOv4XdLMoA0enaCgA_OcX1deTF',sb=window.supabase?.createClient?window.supabase.createClient(SUPABASE_URL,KEY):null;
const T={
pt:{headline:'Descobre o valor das tuas Hot Wheels',subhead:'Pesquisa modelos, analisa o valor de mercado, consulta vendas reais e gere a tua coleção num só lugar.',analyse:'Analisar',collection:'Coleção',watch:'À procura',photo:'Fotografias',photoHelp:'Envia fotografias nítidas da frente, verso e detalhes. A IA ajuda a identificar o modelo; confirma sempre os pormenores.',details:'Dados do modelo',model:'Modelo / nome *',year:'Ano / série / referência',type:'Classificação',condition:'Estado',assessment:'Avaliação de compra',ask:'Preço pedido (€)',shipping:'Portes e taxas (€)',min:'Valor de revenda mínimo (€)',max:'Valor de revenda máximo (€)',sold:'Vendas concluídas comparáveis',certainty:'Confirmação TH/STH',evidence:'Evidências / links de vendas concluídas',notes:'Notas e justificação',evaluate:'Avaliar oportunidade',clear:'Limpar',limits:'A app não consulta automaticamente eBay/Vinted nem confirma TH/STH sem evidência. As projeções são cenários, não promessas.',items:'Itens',invested:'Investido',value:'Valor estimado',collectionTitle:'A minha coleção',search:'Pesquisar modelo…',empty:'Ainda não tens modelos guardados.',export:'Exportar cópia CSV',watchTitle:'Lista de procura',wanted:'Modelo procurado',limit:'Preço máximo (€)',add:'Adicionar',watchEmpty:'Lista vazia.',login:'Entrar',signup:'Criar conta',authIntro:'Cria uma conta ou inicia sessão para manter a tua coleção sincronizada.',pw:'Palavra-passe',saved:'Guardado e sincronizado.',buy:'COMPRAR',pass:'PASSAR',check:'CONFIRMAR',total:'Custo total',range:'Revenda estimada',margin:'Margem estimada',reason:'Decisão baseada nos dados introduzidos.',askLogin:'Inicia sessão primeiro.'},
en:{headline:'Discover the value of your Hot Wheels',subhead:'Review models, track your collection and monitor your investment — asking prices are not completed sales.',analyse:'Analyse',collection:'Collection',watch:'Watchlist',photo:'Photos',photoHelp:'Upload clear front, back and detail photos. AI can help identify the model; always check the details.',details:'Model details',model:'Model / name *',year:'Year / series / reference',type:'Classification',condition:'Condition',assessment:'Purchase assessment',ask:'Asking price (€)',shipping:'Shipping and fees (€)',min:'Minimum resale value (€)',max:'Maximum resale value (€)',sold:'Comparable completed sales',certainty:'TH/STH confirmation',evidence:'Evidence / completed-sale links',notes:'Notes and reasoning',evaluate:'Assess opportunity',clear:'Clear',limits:'No automatic eBay/Vinted search or TH/STH confirmation without evidence. Projections are scenarios, not promises.',items:'Items',invested:'Invested',value:'Estimated value',collectionTitle:'My collection',search:'Search model…',empty:'No saved models yet.',export:'Export CSV backup',watchTitle:'Watchlist',wanted:'Wanted model',limit:'Maximum price (€)',add:'Add',watchEmpty:'Empty list.',login:'Log in',signup:'Create account',authIntro:'Create an account or log in to sync your collection.',pw:'Password',saved:'Saved and synced.',buy:'BUY',pass:'PASS',check:'CHECK',total:'Total cost',range:'Estimated resale',margin:'Estimated margin',reason:'Decision based on entered data.',askLogin:'Log in first.'},
es:{headline:'Descubre el valor de tus Hot Wheels',subhead:'Analiza modelos y sigue tu colección. Los precios anunciados no son ventas cerradas.',analyse:'Analizar',collection:'Colección',watch:'Buscando',photo:'Fotos',photoHelp:'Sube fotos nítidas del frente, reverso y detalles. La IA ayuda a identificar el modelo; comprueba siempre los datos.',details:'Datos del modelo',model:'Modelo / nombre *',year:'Año / serie / referencia',type:'Clasificación',condition:'Estado',assessment:'Evaluación de compra',ask:'Precio pedido (€)',shipping:'Envío y tasas (€)',min:'Valor mínimo de reventa (€)',max:'Valor máximo de reventa (€)',sold:'Ventas comparables cerradas',certainty:'Confirmación TH/STH',evidence:'Pruebas / enlaces de ventas',notes:'Notas y justificación',evaluate:'Evaluar oportunidad',clear:'Limpiar',limits:'Sin búsqueda automática en eBay/Vinted ni confirmación TH/STH sin pruebas.',items:'Artículos',invested:'Invertido',value:'Valor estimado',collectionTitle:'Mi colección',search:'Buscar modelo…',empty:'Aún no hay modelos.',export:'Exportar CSV',watchTitle:'Lista de búsqueda',wanted:'Modelo buscado',limit:'Precio máximo (€)',add:'Añadir',watchEmpty:'Lista vacía.',login:'Entrar',signup:'Crear cuenta',authIntro:'Crea una cuenta o inicia sesión para sincronizar tu colección.',pw:'Contraseña',saved:'Guardado y sincronizado.',buy:'COMPRAR',pass:'PASAR',check:'CONFIRMAR',total:'Coste total',range:'Reventa estimada',margin:'Margen estimado',reason:'Decisión basada en los datos introducidos.',askLogin:'Inicia sesión primero.'},
fr:{headline:'Découvre la valeur de tes Hot Wheels',subhead:'Analyse ta collection. Les prix affichés ne sont pas des ventes conclues.',analyse:'Analyser',collection:'Collection',watch:'À rechercher',photo:'Photos',photoHelp:'Ajoute des photos nettes de l’avant, de l’arrière et des détails. L’IA aide à identifier le modèle ; vérifie toujours les informations.',details:'Détails du modèle',model:'Modèle / nom *',year:'Année / série / référence',type:'Classification',condition:'État',assessment:'Évaluation d’achat',ask:'Prix demandé (€)',shipping:'Livraison et frais (€)',min:'Valeur minimale (€)',max:'Valeur maximale (€)',sold:'Ventes comparables conclues',certainty:'Confirmation TH/STH',evidence:'Preuves / liens de ventes',notes:'Notes et justification',evaluate:'Évaluer',clear:'Effacer',limits:'Pas de recherche eBay/Vinted ni de confirmation TH/STH sans preuve.',items:'Articles',invested:'Investi',value:'Valeur estimée',collectionTitle:'Ma collection',search:'Rechercher…',empty:'Aucun modèle enregistré.',export:'Exporter CSV',watchTitle:'Liste de recherche',wanted:'Modèle recherché',limit:'Prix maximum (€)',add:'Ajouter',watchEmpty:'Liste vide.',login:'Connexion',signup:'Créer un compte',authIntro:'Crée un compte ou connecte-toi pour synchroniser ta collection.',pw:'Mot de passe',saved:'Enregistré et synchronisé.',buy:'ACHETER',pass:'PASSER',check:'VÉRIFIER',total:'Coût total',range:'Revente estimée',margin:'Marge estimée',reason:'Décision basée sur les données saisies.',askLogin:'Connecte-toi d’abord.'},
de:{headline:'Entdecke den Wert deiner Hot Wheels',subhead:'Prüfe Modelle und verwalte deine Sammlung. Angebotspreise sind keine Verkäufe.',analyse:'Prüfen',collection:'Sammlung',watch:'Merkliste',photo:'Fotos',photoHelp:'Lade klare Fotos von Vorderseite, Rückseite und Details hoch. Die KI hilft bei der Modellbestimmung; prüfe die Angaben immer.',details:'Modelldaten',model:'Modell / Name *',year:'Jahr / Serie / Referenz',type:'Klassifizierung',condition:'Zustand',assessment:'Kaufbewertung',ask:'Angebotspreis (€)',shipping:'Versand und Gebühren (€)',min:'Mindestwert (€)',max:'Höchstwert (€)',sold:'Vergleichbare Verkäufe',certainty:'TH/STH-Bestätigung',evidence:'Belege / Verkaufslinks',notes:'Notizen und Begründung',evaluate:'Bewerten',clear:'Leeren',limits:'Keine automatische eBay/Vinted-Suche oder TH/STH-Bestätigung ohne Belege.',items:'Artikel',invested:'Investiert',value:'Geschätzter Wert',collectionTitle:'Meine Sammlung',search:'Modell suchen…',empty:'Noch keine Modelle gespeichert.',export:'CSV exportieren',watchTitle:'Merkliste',wanted:'Gesuchtes Modell',limit:'Höchstpreis (€)',add:'Hinzufügen',watchEmpty:'Liste leer.',login:'Anmelden',signup:'Konto erstellen',authIntro:'Melde dich an, um deine Sammlung zu synchronisieren.',pw:'Passwort',saved:'Gespeichert und synchronisiert.',buy:'KAUFEN',pass:'NEIN',check:'PRÜFEN',total:'Gesamtkosten',range:'Geschätzter Wiederverkauf',margin:'Geschätzte Marge',reason:'Entscheidung basiert auf den eingegebenen Daten.',askLogin:'Bitte zuerst anmelden.'},
it:{headline:'Scopri il valore delle tue Hot Wheels',subhead:'Analizza i modelli e gestisci la collezione. I prezzi richiesti non sono vendite concluse.',analyse:'Analizza',collection:'Collezione',watch:'Da cercare',photo:'Foto',photoHelp:'Carica foto nitide del fronte, retro e dettagli. L’IA aiuta a identificare il modello; verifica sempre i dati.',details:'Dati del modello',model:'Modello / nome *',year:'Anno / serie / riferimento',type:'Classificazione',condition:'Condizioni',assessment:'Valutazione acquisto',ask:'Prezzo richiesto (€)',shipping:'Spedizione e costi (€)',min:'Valore minimo (€)',max:'Valore massimo (€)',sold:'Vendite comparabili concluse',certainty:'Conferma TH/STH',evidence:'Prove / link vendite',notes:'Note e motivazione',evaluate:'Valuta opportunità',clear:'Pulisci',limits:'Nessuna ricerca eBay/Vinted o conferma TH/STH automatica.',items:'Articoli',invested:'Investito',value:'Valore stimato',collectionTitle:'La mia collezione',search:'Cerca modello…',empty:'Nessun modello salvato.',export:'Esporta CSV',watchTitle:'Lista desideri',wanted:'Modello cercato',limit:'Prezzo massimo (€)',add:'Aggiungi',watchEmpty:'Lista vuota.',login:'Accedi',signup:'Crea account',authIntro:'Accedi per sincronizzare la tua collezione.',pw:'Password',saved:'Salvato e sincronizzato.',buy:'COMPRA',pass:'PASSA',check:'VERIFICA',total:'Costo totale',range:'Rivendita stimata',margin:'Margine stimato',reason:'Decisione basata sui dati inseriti.',askLogin:'Accedi prima.'},
nl:{headline:'Ontdek de waarde van je Hot Wheels',subhead:'Controleer modellen en beheer je collectie. Vraagprijzen zijn geen afgeronde verkopen.',analyse:'Controleren',collection:'Collectie',watch:'Gezocht',photo:'Foto’s',photoHelp:'Upload duidelijke foto’s van de voor-, achterkant en details. AI helpt het model te herkennen; controleer de gegevens altijd.',details:'Modelgegevens',model:'Model / naam *',year:'Jaar / serie / referentie',type:'Classificatie',condition:'Staat',assessment:'Aankoopbeoordeling',ask:'Vraagprijs (€)',shipping:'Verzending en kosten (€)',min:'Minimumwaarde (€)',max:'Maximumwaarde (€)',sold:'Vergelijkbare verkopen',certainty:'TH/STH-bevestiging',evidence:'Bewijs / verkooplinks',notes:'Notities en reden',evaluate:'Beoordeel',clear:'Wissen',limits:'Geen automatische eBay/Vinted-zoektocht of TH/STH-bevestiging zonder bewijs.',items:'Items',invested:'Geïnvesteerd',value:'Geschatte waarde',collectionTitle:'Mijn collectie',search:'Zoek model…',empty:'Nog geen modellen opgeslagen.',export:'CSV exporteren',watchTitle:'Zoeklijst',wanted:'Gezocht model',limit:'Maximumprijs (€)',add:'Toevoegen',watchEmpty:'Lijst leeg.',login:'Inloggen',signup:'Account maken',authIntro:'Log in om je collectie te synchroniseren.',pw:'Wachtwoord',saved:'Opgeslagen en gesynchroniseerd.',buy:'KOPEN',pass:'OVERSLAAN',check:'CONTROLEREN',total:'Totale kosten',range:'Geschatte doorverkoop',margin:'Geschatte marge',reason:'Beslissing op basis van ingevoerde gegevens.',askLogin:'Log eerst in.'},
br:{headline:'Descubra o valor dos seus Hot Wheels',subhead:'Analise modelos e acompanhe sua coleção. Preços anunciados não são vendas concluídas.',analyse:'Analisar',collection:'Coleção',watch:'Procurando',photo:'Fotos',photoHelp:'Envie fotos nítidas da frente, do verso e dos detalhes. A IA ajuda a identificar o modelo; confira sempre as informações.',details:'Dados do modelo',model:'Modelo / nome *',year:'Ano / série / referência',type:'Classificação',condition:'Estado',assessment:'Avaliação de compra',ask:'Preço anunciado (€)',shipping:'Frete e taxas (€)',min:'Valor mínimo de revenda (€)',max:'Valor máximo de revenda (€)',sold:'Vendas comparáveis concluídas',certainty:'Confirmação TH/STH',evidence:'Evidências / links de vendas',notes:'Notas e justificativa',evaluate:'Avaliar oportunidade',clear:'Limpar',limits:'Sem busca automática no eBay/Vinted ou confirmação TH/STH sem evidências.',items:'Itens',invested:'Investido',value:'Valor estimado',collectionTitle:'Minha coleção',search:'Buscar modelo…',empty:'Ainda não há modelos salvos.',export:'Exportar CSV',watchTitle:'Lista de desejos',wanted:'Modelo procurado',limit:'Preço máximo (€)',add:'Adicionar',watchEmpty:'Lista vazia.',login:'Entrar',signup:'Criar conta',authIntro:'Entre para sincronizar sua coleção.',pw:'Senha',saved:'Salvo e sincronizado.',buy:'COMPRAR',pass:'PASSAR',check:'CONFIRMAR',total:'Custo total',range:'Revenda estimada',margin:'Margem estimada',reason:'Decisão baseada nos dados informados.',askLogin:'Entre primeiro.'}};
let lang=localStorage.getItem('hwpc_lang')||'pt',user=null,db={items:[],watch:[]},photos=['','',''],photoFiles=[null,null,null],photoPreviewUrls=[null,null,null],lastEval=null,latestQuota=null,billingDetails=null;
const GUEST_BACKUP_KEY='hwpc_guest_backup_v1';

const CATALOG={
2026:{
th:["'87 Buick Regal GNX","'92 Dodge Viper RT/10","Electro Silhouette","Hot Wheengs","Cone Shaker","2016 Ford GT Race","2 Jet Z","Total Disposal","Amaru GTC","Sweet Driver","Mad Manga","Ford Model A Custom '31","Fast Fish","Nissan Skyline HT 2000GT-X","Gazella GT"],
sth:["Drift-Ender","Ford Mustang GTD","Ferrari F40 Competizione","'64 Impala","'87 Ford Sierra Cosworth","Honda Civic Custom","Custom Otto","Lotus Sport Elise","Subaru Impreza","'94 Toyota Supra (Tooned)","Nissan Maxima Drift Car","Porsche 911 Carrera RS 2.7","'23 Ram 1500","'70 Plymouth AAR 'Cuda","'67 Pontiac Firebird 400"]
},
2025:{
th:["Ford Performance Supervan 4","Fish'd & Chip'd","Mailed It!","Pedal Driver","Rig Storm","'85 Honda City Turbo II","Birthday Burner","Nissan Leaf NISMO RC_02","Chill Mill","Chevroletor","Honda S800 Racing","Shark Bite","1966 Triumph Tiger 100","'84 Audi Sport quattro","Triumph TR6"],
sth:["'87 Audi quattro","Hirohata Merc","Hi-Roller II","1975 Datsun Sunny Truck (B120)","Aston Martin DB4GT High-Speed Edition","'20 Jeep Gladiator","Porsche 911 Rallye","'71 Mustang Funny Car","'62 Corvette Gasser","McLaren Speedtail","'94 Bugatti EB110 SS","'73 Honda Civic Custom","'20 Dodge Charger Hellcat","BMW M3 Wagon","Ford RS200"]
},
2024:{
th:["'47 Chevy Fleetline","Ain't Fare","Tooligan","Custom '53 Chevy","Batman Forever Batmobile","Ford Mustang Mach-E 1400","Draggin' Wagon","Purple Passion","Honda Super Cub Custom","Bone Shaker","Car-de-Asada","Hot Wheels Ford Transit Connect","DMC DeLorean","'59 Chevy Impala","Porsche 928S Safari"],
sth:["Ford Escort RS2000","'18 Camaro SS","BMW 507","'89 Mercedes-Benz 560 SEC AMG","'60s Fiat 500D Modificado","'71 El Camino","Audi 90 quattro","Volvo P1800 Gasser","Mitsubishi Pajero Evolution","Mazda 787B","'77 Pontiac Firebird","'96 Nissan 180SX Type X","Celero GT","Lamborghini Huracán LP 620-2 Super Trofeo","'83 Chevy Silverado"]
}};
function renderCatalog(){
 const year=$('catalogYear')?.value||'2026',type=$('catalogType')?.value||'all',grid=$('catalogGrid'),summary=$('catalogSummary');
 if(!grid||!summary)return;
 const rows=[];
 if(CATALOG[year]){
  for(const kind of ['th','sth'])if(type==='all'||type===kind)for(const name of CATALOG[year][kind])rows.push({name,kind});
 }else{
  const noSth=Number(year)<2007&&type==='sth';
  summary.textContent=noSth?'A série Super Treasure Hunt começou em 2007.':'O arquivo deste ano está disponível nas checklists de referência externas.';
  grid.innerHTML='<article class="catalog-card"><div class="catalog-thumb">HW<br>'+year+'</div><div class="catalog-copy"><h3>'+(noSth?'Ainda não existiam STH neste ano':'Arquivo histórico '+year)+'</h3><div class="catalog-meta">Consulta a lista anual completa e as fotografias na referência especializada.</div><div class="catalog-links"><a href="https://www.164custom.com/hot-wheels/treasure-hunt.html" target="_blank" rel="noopener">Abrir arquivo TH 1995–2026 ↗</a> · <a href="https://www.164custom.com/hot-wheels/super-treasure-hunt.html" target="_blank" rel="noopener">Arquivo STH 2007–2026 ↗</a></div></div></article>';
  return;
 }
 const thValue=year==='2026'?'€3–8':'€2–7',sthValue=year==='2026'?'€35–120+':'€20–100+';
 summary.textContent=rows.length+' modelos listados · '+(type==='all'?'TH e STH':type.toUpperCase())+' · '+year;
 grid.innerHTML=rows.map(x=>{
  const label=x.kind==='sth'?'SUPER TREASURE HUNT':'TREASURE HUNT';
  const price=x.kind==='sth'?sthValue:thValue;
  const url=x.kind==='sth'?'https://www.164custom.com/hot-wheels/super-treasure-hunt.html':'https://www.164custom.com/hot-wheels/treasure-hunt.html';
  const yearUrl=x.kind==='sth'?'https://www.164custom.com/hot-wheels/super-treasure-hunt/'+year+'.html':'https://www.164custom.com/hot-wheels/treasure-hunt/'+year+'.html';
  return '<article class="catalog-card"><div class="catalog-thumb" aria-label="Fotografia de referência disponível na checklist externa">HW<br>'+year+'</div><div class="catalog-copy"><span class="catalog-badge '+x.kind+'">'+label+'</span><h3>'+safe(x.name)+'</h3><div class="catalog-meta">Ano '+year+' · Miniatura carded, estado por confirmar</div><div class="catalog-price">Intervalo indicativo: '+price+'</div><div class="catalog-links"><a href="'+yearUrl+'" target="_blank" rel="noopener">Ver fotografia e detalhes ↗</a></div></div></article>';
 }).join('');
}

async function updateVisitorCounter(){
  const target=$('visitorCounter');
  if(!target)return;
  const set=(value,state='ready')=>{target.textContent=value;target.dataset.state=state;};
  if(!sb){set('Visitantes: indisponível','error');return;}
  let visitorId;
  try{
    visitorId=localStorage.getItem('hwpc_visitor_id');
    if(!visitorId){
      visitorId=crypto.randomUUID();
      localStorage.setItem('hwpc_visitor_id',visitorId);
    }
  }catch(e){set('Visitantes: indisponível','error');return;}
  try{
    const {data,error}=await sb.rpc('register_site_visitor',{p_visitor_id:visitorId});
    if(error)throw error;
    const total=Number(data);
    if(!Number.isFinite(total)||total<0)throw new Error('Resposta inválida do contador');
    set('Visitantes: '+total.toLocaleString('pt-PT'));
  }catch(e){
    console.error('Visitor counter:',e);
    set('Visitantes: indisponível','error');
  }
}

const $=id=>document.getElementById(id),tr=k=>T[lang][k]||T.pt[k],money=n=>new Intl.NumberFormat(lang==='pt'||lang==='br'?'pt-PT':lang==='de'?'de-DE':lang==='fr'?'fr-FR':lang==='it'?'it-IT':lang==='nl'?'nl-NL':lang==='es'?'es-ES':'en-IE',{style:'currency',currency:'EUR'}).format(Number(n)||0);
const fields={soldSiteLabel:'market',headline:'headline',subhead:'subhead',tabAnalyse:'analyse',tabCollection:'collection',tabWatch:'watch',photoTitle:'photo',photoHelp:'photoHelp',detailsTitle:'details',modelLabel:'model',yearLabel:'year',itemsLabel:'items',investedLabel:'invested',valueLabel:'value',collectionTitle:'collectionTitle',export:'export',watchTitle:'watchTitle',wantedLabel:'wanted',limitLabel:'limit',addWatch:'add',limits:'limits',authIntro:'authIntro',pwLabel:'pw',login:'login',signup:'signup'};
function translate(){for(const [id,k] of Object.entries(fields)){const el=$(id);if(!el)continue;if(id==='headline')el.innerHTML=tr(k).replace(/(Hot Wheels)/i,'<em>$1</em>');else el.textContent=id==='soldSiteLabel'?soldTr('market'):tr(k)}const language=$('language');if(language)language.value=lang;const authTitle=$('authTitle');if(authTitle)authTitle.textContent=tr('login');const search=$('search');if(search)search.placeholder=tr('search');const authHeading=$('authGate')?.querySelector('h2');if(authHeading)authHeading.textContent=tr('login');const tabAccount=$('tabAccount');if(tabAccount)tabAccount.textContent=({pt:'🏁 A Minha Conta',en:'🏁 My Account',es:'🏁 Mi cuenta',fr:'🏁 Mon compte',de:'🏁 Mein Konto',it:'🏁 Il mio account',nl:'🏁 Mijn account',br:'🏁 Minha conta'}[lang]||'🏁 A Minha Conta');updateAccountButton();render();if(lastSoldOut)renderSoldHistory(lastSoldOut,'aiResult')}
$('language')?.addEventListener('change',e=>{lang=e.target.value;localStorage.setItem('hwpc_lang',lang);translate()};
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{if(b.dataset.view==='accountPage'&&(!user||user.is_anonymous)){openAuth('login');return}document.querySelectorAll('.view').forEach(v=>v.classList.toggle('hidden',v.id!==b.dataset.view));document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x===b));render();if(b.dataset.view==='accountPage')renderAccount()});
function status(s){$('authStatus').textContent=s}
function showGate(v){const gate=$('authGate');if(!gate)return;gate.classList.toggle('hidden',!v);gate.setAttribute('aria-hidden',String(!v))}
async function refreshBillingDetails(){
  if(!sb||!user||user.is_anonymous){billingDetails=null;return}
  const {data,error}=await sb.from('hw_billing_subscriptions')
    .select('status,current_period_end,cancel_at_period_end')
    .eq('user_id',user.id).maybeSingle();
  if(error){
    console.warn('HW Price Check billing lookup:',error);
    billingDetails=null;
  }else billingDetails=data||null;
}
async function refreshAccountPlan(){
  if(!sb||!user||user.is_anonymous){latestQuota=null;billingDetails=null;renderAccount();return}
  try{
    const {data,error}=await sb.rpc('get_my_hw_plan');
    if(error)throw error;
    updateQuota(data);
    await refreshBillingDetails();
    renderAccount();
  }catch(error){
    console.warn('HW Price Check plan lookup:',error);
    accountNotice('Não foi possível atualizar o estado do plano neste momento.','error');
  }
}
function updateQuota(q){
  if(!q)return;
  latestQuota=q;
  const label=q.unlimited
    ? 'HW Price Check Premium: pesquisas ilimitadas.'
    : q.tier==='guest'
      ? 'Pesquisas gratuitas sem conta: '+q.remaining+' de 3 restantes.'
      : 'Pesquisas de hoje: '+q.used+' de '+q.limit+'.';
  $('quotaNotice').textContent=label+' Cada análise Gemini ou pesquisa de vendas conta como 1 utilização.';
  renderAccount();
}
function guestBackup(){
  if(user?.is_anonymous){
    try{
      const previous=JSON.parse(localStorage.getItem(GUEST_BACKUP_KEY)||'{"items":[],"watch":[]}');
      const itemMap=new Map([...(previous.items||[]),...(db.items||[])].map(x=>[x.id,x]));
      const watchMap=new Map([...(previous.watch||[]),...(db.watch||[])].map(x=>[x.id,x]));
      localStorage.setItem(GUEST_BACKUP_KEY,JSON.stringify({items:[...itemMap.values()],watch:[...watchMap.values()]}));
    }catch(e){}
  }
}
function mergeGuestBackup(){
  if(!user||user.is_anonymous)return;
  try{
    const raw=localStorage.getItem(GUEST_BACKUP_KEY);
    if(!raw)return;
    const backup=JSON.parse(raw);
    const byId=new Map([...(db.items||[]),...(backup.items||[])].map(x=>[x.id,x]));
    const watchById=new Map([...(db.watch||[]),...(backup.watch||[])].map(x=>[x.id,x]));
    db.items=[...byId.values()];
    db.watch=[...watchById.values()];
    localStorage.removeItem(GUEST_BACKUP_KEY);
    save();
  }catch(e){status('Não foi possível recuperar alguns dados da sessão de visitante.');}
}
async function ensureAnonymousSession(){
  if(!sb){user=null;$('appNotice').textContent='O serviço de conta não carregou. Atualiza a página e tenta novamente.';return false;}
  const {data:{session}}=await sb.auth.getSession();
  if(session){user=session.user;return true;}
  if(!sb){user=null;$('appNotice').textContent='O serviço de conta não carregou. Atualiza a página e tenta novamente.';return false;}const {data,error}=await sb.auth.signInAnonymously();
  if(error){
    user=null;
    updateAccountButton();
    $('appNotice').textContent='Para usar as 3 pesquisas gratuitas sem conta, é necessário ativar os acessos anónimos no Supabase: Authentication → Providers → Anonymous Sign-Ins.';
    return false;
  }
  user=data.user;
  updateAccountButton();
  return true;
}
async function load(){if(!sb||!user)return;const {data,error}=await sb.from('user_data').select('payload').eq('user_id',user.id).maybeSingle();if(error){status('Erro ao carregar: '+error.message);return}db=data?.payload||{items:[],watch:[]};render();renderAccount();if(!data)await save();await refreshAccountPlan();handleSubscriptionReturn()}
async function save(){if(!sb||!user)return;const {error}=await sb.from('user_data').upsert({user_id:user.id,payload:db,updated_at:new Date().toISOString()},{onConflict:'user_id'});if(error)status('Erro de sincronização: '+error.message);else status(tr('saved'));renderAccount()}
// Verifica palavras-passe expostas usando HIBP k-anonymity.
// A palavra-passe e o hash completo nunca saem do browser.
async function checkPwnedPassword(password){
  if(!password)throw new Error('Introduz uma palavra-passe.');
  if(!globalThis.crypto?.subtle)throw new Error('Este navegador não suporta a verificação segura. Atualiza o navegador.');
  const bytes=new TextEncoder().encode(password);
  const digest=await crypto.subtle.digest('SHA-1',bytes);
  const hash=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('').toUpperCase();
  const prefix=hash.slice(0,5),suffix=hash.slice(5);
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),8000);
  let response;
  try{
    response=await fetch('https://api.pwnedpasswords.com/range/'+prefix,{
      method:'GET',
      headers:{'Add-Padding':'true'},
      signal:controller.signal,
      cache:'no-store'
    });
  }catch(error){
    throw new Error(error?.name==='AbortError'?'A verificação de segurança demorou demasiado. Tenta novamente.':'Não foi possível contactar o serviço de verificação de palavras-passe. Tenta novamente.');
  }finally{clearTimeout(timeout)}
  if(!response.ok)throw new Error('O serviço de verificação de segurança está indisponível. Tenta novamente mais tarde.');
  const rows=(await response.text()).split(/\r?\n/);
  for(const row of rows){
    const [candidate,countText]=row.trim().split(':');
    if(candidate?.toUpperCase()===suffix)return Number.parseInt(countText,10)||1;
  }
  return 0;
}
async function requireSafePassword(password){
  const occurrences=await checkPwnedPassword(password);
  if(occurrences>0)throw new Error('Esta palavra-passe foi encontrada em fugas de dados conhecidas ('+occurrences.toLocaleString('pt-PT')+' ocorrências). Escolhe outra que nunca tenhas utilizado.');
}
$('login')?.addEventListener('click',async()=>{if(!sb)return status('O serviço de conta não carregou. Atualiza a página e tenta novamente.');guestBackup();const {data,error}=await sb.auth.signInWithPassword({email:$('email').value.trim(),password:$('password').value});if(error)return status(error.message);user=data.user;applyAccountPreferences();updateAccountButton();showGate(false);await load();mergeGuestBackup();renderAccount()};
$('signup')?.addEventListener('click',async()=>{
  const button=$('signup');
  if(button.disabled)return;
  if(!sb)return status('O serviço de conta não carregou. Atualiza a página e tenta novamente.');
  const email=$('email').value.trim(),password=$('password').value;
  if(!email||!password)return status('Preenche o email e a palavra-passe.');
  if(password.length<8)return status('A palavra-passe deve ter pelo menos 8 caracteres.');
  if(password.length>256)return status('A palavra-passe não pode ultrapassar 256 caracteres.');
  button.disabled=true;
  const originalText=button.textContent;
  button.textContent='A enviar…';
  try{
    await requireSafePassword(password);
    guestBackup();
    if(user?.is_anonymous)await sb.auth.signOut();
    const {data,error}=await sb.auth.signUp({
      email,
      password,
      options:{emailRedirectTo:'https://hwpricecheck.pages.dev/'}
    });
    if(error){
      await ensureAnonymousSession();
      status(error.message);
      return;
    }
    if(data.session){
      user=data.user;
      applyAccountPreferences();updateAccountButton();
      showGate(false);
      await load();
      mergeGuestBackup();
      updateAccountButton();renderAccount();
      return;
    }
    user=null;updateAccountButton();
    if(Array.isArray(data.user?.identities)&&data.user.identities.length===0){
      const {error:resendError}=await sb.auth.resend({
        type:'signup',
        email,
        options:{emailRedirectTo:'https://hwpricecheck.pages.dev/'}
      });
      if(resendError){
        const msg=resendError.message||'Erro desconhecido.';
        if(/already confirmed/i.test(msg)){
          status('Esta conta já está confirmada. Usa “Entrar” para iniciar sessão.');
        }else{
          status('Esta conta já existe, mas não foi possível reenviar a confirmação: '+msg);
        }
        return;
      }
      status('Esta conta já estava criada. Pedi um novo email de confirmação. Verifica também o Spam/Correio não solicitado.');
      return;
    }
    status('Conta criada. Foi pedido um email de confirmação. Verifica também o Spam/Correio não solicitado.');
  }catch(e){
    status('Não foi possível concluir o registo: '+(e?.message||e));
  }finally{
    button.disabled=false;
    button.textContent=originalText;
  }
};
function openAuth(mode='login'){const creating=mode==='signup';const authTitle=$('authTitle'),authIntro=$('authIntro'),login=$('login'),signup=$('signup'),password=$('password');if(authTitle)authTitle.textContent=creating?'Criar conta gratuita':'Entrar na tua conta';if(authIntro)authIntro.textContent=creating?'Cria uma conta para guardar e sincronizar a tua coleção em vários dispositivos.':'Inicia sessão para aceder à tua coleção e às tuas pesquisas.';login?.classList.toggle('hidden',creating);signup?.classList.toggle('hidden',!creating);if(password)password.autocomplete=creating?'new-password':'current-password';showGate(true)}function showHome(){ $('appWorkspace').classList.add('hidden');$('homePage').classList.remove('hidden');document.querySelectorAll('[data-page]').forEach(x=>x.classList.toggle('active',x.dataset.page==='home'));window.scrollTo({top:0,behavior:'smooth'}); } function openWorkspace(view){ $('homePage').classList.add('hidden');$('appWorkspace').classList.remove('hidden');const tab=document.querySelector('[data-view="'+view+'"]');if(tab)tab.click();if(view==='accountPage')renderAccount();document.querySelectorAll('[data-page]').forEach(x=>x.classList.toggle('active',x.dataset.page===view));$('appWorkspace').scrollIntoView({behavior:'smooth',block:'start'}); } $('signupTop')?.addEventListener('click',()=>openAuth('signup'));$('signupHero')?.addEventListener('click',()=>openAuth('signup'));$('account')?.addEventListener('click',()=>{if(!user||user.is_anonymous){openAuth('login');return}openWorkspace('accountPage')};$('heroAnalyse')?.addEventListener('click',()=>{const q=$('heroSearch').value.trim();openWorkspace('analyse');if(q){$('model').value=q;$('aiStatus').textContent='Modelo preenchido. Adiciona uma fotografia e carrega em “Identificar com Gemini” para confirmar os detalhes.';$('model').focus()}else{$('aiStatus').textContent='Escreve o nome do modelo ou adiciona uma fotografia para começar.';$('model').focus()}$('heroSearchFeedback').textContent=q?'Modelo enviado para a área de análise.':'Abri a análise — escreve um modelo ou escolhe uma fotografia.'};$('heroCamera')?.addEventListener('click',()=>{const p=document.querySelector('[data-photo="0"]');if(!p){$('heroSearchFeedback').textContent='Não foi possível abrir a seleção de fotografias.';return}openWorkspace('analyse');const label=p.closest('label');if(label)label.click();else p.click();$('heroSearchFeedback').textContent='Escolhe uma fotografia da frente, verso ou detalhe do modelo.'};$('heroSearch')?.addEventListener('keydown',e=>{if(e.key==='Enter')$('heroAnalyse').click()});$('heroCollection')?.addEventListener('click',()=>openWorkspace('collection'));$('footerHome')?.addEventListener('click',e=>{e.preventDefault();showHome()});document.querySelectorAll('[data-page]').forEach(b=>{if(b.id==='heroCollection')return;b.onclick=()=>{const page=b.dataset.page;if(page==='home')showHome();else if(page==='analyse'||page==='collection'||page==='watch')openWorkspace(page);else{showHome();const target=page==='about'?'aboutSection':'guidesSection';document.getElementById(target).scrollIntoView({behavior:'smooth'});}}});document.getElementById('themeToggle')?.addEventListener('click',()=>{document.body.classList.toggle('theme-light');const light=document.body.classList.contains('theme-light');localStorage.setItem('hwpc_theme',light?'light':'dark');$('themeToggle').textContent=light?'☀':'☾'};if(localStorage.getItem('hwpc_theme')==='light'){document.body.classList.add('theme-light');const themeToggle=$('themeToggle');if(themeToggle)themeToggle.textContent='☀'}
if(sb){sb.auth.getSession().then(async({data})=>{user=data.session?.user||null;if(!user){await ensureAnonymousSession()}if(user){showGate(false);applyAccountPreferences();updateAccountButton();await load();mergeGuestBackup()}else showGate(false)});sb.auth.onAuthStateChange((event,s)=>{if(event==='SIGNED_OUT'){user=null;updateAccountButton();showGate(false)}else if(event==='USER_UPDATED'){user=s?.user||user;updateAccountButton();renderAccount()}});}else{showGate(false);$('appNotice').textContent='O serviço de conta não carregou. Atualiza a página e tenta novamente.';}
document.querySelectorAll('[data-photo]').forEach(i=>i.addEventListener('change',()=>{const f=i.files[0];if(!f)return;const idx=+i.dataset.photo;if(photoPreviewUrls[idx])URL.revokeObjectURL(photoPreviewUrls[idx]);const url=URL.createObjectURL(f);photoPreviewUrls[idx]=url;photos[idx]='';photoFiles[idx]=f;const l=i.parentElement;l.innerHTML='';const img=document.createElement('img');img.src=url;img.alt=['Fotografia da frente','Fotografia do verso','Fotografia de detalhe'][idx]||'Fotografia Hot Wheels';l.append(img);l.append(i);}));
$('addWatch')?.addEventListener('click',async()=>{const name=$('wanted').value.trim();if(!name)return;if(!user)return alert(tr('askLogin'));db.watch.unshift({id:crypto.randomUUID(),name,max:+$('limit').value||0,date:new Date().toISOString()});$('wanted').value='';$('limit').value='';await save();render()};

async function callFunction(name,body){
  if(!sb)throw new Error('O serviço de análise não carregou. Atualiza a página e tenta novamente.');let {data:{session}}=await sb.auth.getSession();
  if(!session){
    const ok=await ensureAnonymousSession();
    if(!ok)throw new Error('Ativa Anonymous Sign-Ins em Supabase → Authentication → Providers para poderes usar as pesquisas gratuitas sem conta.');
    ({data:{session}}=await sb.auth.getSession());
  }
  const {data,error}=await sb.functions.invoke(name,{body});
  if(error){
    let payload=null;
    try{if(error.context&&typeof error.context.json==='function')payload=await error.context.json()}catch(e){}
    if(payload?.quota)updateQuota(payload.quota);
    if(payload?.error==='quota_exceeded'){
      guestBackup();
      $('authTitle').textContent='As 3 pesquisas gratuitas terminaram';
      $('authIntro').textContent=payload.message||'Cria uma conta ou inicia sessão para continuar.';
      showGate(true);
      status(payload.message||'Cria uma conta ou inicia sessão para continuar.');
      throw new Error(payload.message||'Limite de pesquisas atingido.');
    }
    if(payload?.message)throw new Error(payload.message);
    throw error;
  }
  if(data?.quota)updateQuota(data.quota);
  if(data?.error)throw new Error(data.message||data.error);
  return data
}
function fileData(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>{const original=reader.result;const image=new Image();image.onload=()=>{const maxSide=1400,scale=Math.min(1,maxSide/Math.max(image.width,image.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.width*scale));canvas.height=Math.max(1,Math.round(image.height*scale));const context=canvas.getContext('2d');if(!context){resolve({data:original});return}context.drawImage(image,0,0,canvas.width,canvas.height);canvas.toBlob(blob=>{if(!blob){resolve({data:original});return}const output=new FileReader();output.onload=()=>resolve({data:output.result});output.onerror=reject;output.readAsDataURL(blob)},'image/jpeg',0.78)};image.onerror=()=>resolve({data:original});image.src=original};reader.onerror=reject;reader.readAsDataURL(file)})}
$('identify')?.addEventListener('click',async()=>{const files=photoFiles.filter(Boolean);if(!files.length)return alert('Tira ou escolhe pelo menos uma fotografia.');$('aiStatus').textContent='A analisar fotografias com Gemini…';try{const imgs=await Promise.all(files.map(fileData));const out=await callFunction('hw-identify',{images:imgs});const a=out.analysis||{};$('aiStatus').textContent='Análise concluída · '+(out.model||'Gemini');if(a.model)$('model').value=a.model;if(a.year)$('year').value=[a.year,a.series,a.number,a.reference_code].filter(Boolean).join(' · ');if(a.classification&&['mainline','th','sth','premium'].includes(a.classification))$('type').value=a.classification;if(a.th_sth_status)$('certainty').value=a.th_sth_status;$('aiResult').innerHTML='<div class="card"><b>'+safe(a.model||'Identificação inconclusiva')+'</b><p class="muted">'+safe(a.notes||'')+'</p><p class="note">Classificação: '+safe(a.classification||'unknown')+' · TH/STH: '+safe(a.th_sth_status||'inconclusive')+' · Confiança: '+safe(a.confidence??'—')+'%</p><p>'+safe((a.visible_evidence||[]).join(' · '))+'</p><p class="note">Fotos adicionais: '+safe((a.missing_photos||[]).join(', ')||'Não indicadas')+'</p></div>';if(a.model){const query=[$('model').value.trim(),$('year').value.trim()].filter(Boolean).join(' ');$('aiStatus').textContent='Identificação concluída · a pesquisar vendas reais no eBay…';$('aiResult').insertAdjacentHTML('beforeend','<p class="note sold-auto-status">'+soldTr('autoCredit')+'</p>');try{const soldOut=await callFunction('hw-sold-comps',{query,site:$('soldSite').value,limit:30});renderSoldHistory(soldOut,'aiResult');const q=soldOut.quota||{};$('aiStatus').textContent='Identificação e pesquisa concluídas'+(Number.isFinite(q.remaining)?' · '+q.remaining+' pesquisas restantes':'')}catch(soldError){$('aiResult').insertAdjacentHTML('beforeend','<div class="card sold-history-card"><b>'+soldTr('unavailable')+'</b><p class="muted">'+safe(soldError.message)+'</p></div>');$('aiStatus').textContent='Identificação concluída · pesquisa de vendas indisponível'}}}catch(e){$('aiStatus').textContent='Falha na análise: '+e.message}});

let lastSoldOut=null;
const SOLD_I18N={
pt:{title:'HISTÓRICO DE VENDAS · 90 DIAS',median:'Mediana',central:'Intervalo central',found:'Vendas encontradas',currency:'Moeda',excluded:'Excluídas',credits:'Pesquisas utilizadas',trend:'Evolução dos preços vendidos',high:'Mais alto',low:'Mais baixo',sales:'Ver vendas individuais',empty:'Ainda não há vendas com preço e data suficientes para desenhar o histórico.',loading:'A procurar vendas concluídas reais dos últimos 90 dias…',unavailable:'Pesquisa indisponível',market:'Mercado eBay',autoCredit:'A pesquisa automática utiliza 1 pesquisa disponível.'},
en:{title:'SOLD PRICE HISTORY · 90 DAYS',median:'Median',central:'Central range',found:'Sales found',currency:'Currency',excluded:'Excluded',credits:'Searches used',trend:'Sold price trend',high:'Highest',low:'Lowest',sales:'View individual sales',empty:'There are not enough dated sales with prices to plot a history.',loading:'Searching real completed sales from the last 90 days…',unavailable:'Search unavailable',market:'eBay market',autoCredit:'Automatic search uses 1 available search.'},
es:{title:'HISTORIAL DE VENTAS · 90 DÍAS',median:'Mediana',central:'Intervalo central',found:'Ventas encontradas',currency:'Moneda',excluded:'Excluidas',credits:'Pesquisas utilizadas',trend:'Evolución de los precios vendidos',high:'Máximo',low:'Mínimo',sales:'Ver ventas individuales',empty:'Aún no hay suficientes ventas con precio y fecha para mostrar el historial.',loading:'Buscando ventas reales cerradas de los últimos 90 días…',unavailable:'Búsqueda no disponible',market:'Mercado eBay'},
fr:{title:'HISTORIQUE DES VENTES · 90 JOURS',median:'Médiane',central:'Intervalle central',found:'Ventes trouvées',currency:'Devise',excluded:'Exclues',credits:'Recherches utilisées',trend:'Évolution des prix vendus',high:'Plus élevé',low:'Plus bas',sales:'Voir les ventes individuelles',empty:'Pas assez de ventes datées avec prix pour afficher un historique.',loading:'Recherche des ventes réelles des 90 derniers jours…',unavailable:'Recherche indisponible',market:'Marché eBay',autoCredit:'La recherche automatique utilise 1 recherche disponible.'},
de:{title:'VERKAUFSVERLAUF · 90 TAGE',median:'Median',central:'Mittlerer Bereich',found:'Gefundene Verkäufe',currency:'Währung',excluded:'Ausgeschlossen',credits:'Verwendete Suchen',trend:'Entwicklung der Verkaufspreise',high:'Höchster',low:'Niedrigster',sales:'Einzelne Verkäufe ansehen',empty:'Nicht genügend datierte Verkäufe mit Preisen für einen Verlauf.',loading:'Suche echte abgeschlossene Verkäufe der letzten 90 Tage…',unavailable:'Suche nicht verfügbar',market:'eBay-Marktplatz',autoCredit:'Die automatische Suche verwendet 1 verfügbare Suche.'},
it:{title:'STORICO VENDITE · 90 GIORNI',median:'Mediana',central:'Intervallo centrale',found:'Vendite trovate',currency:'Valuta',excluded:'Escluse',credits:'Ricerche utilizzate',trend:'Andamento dei prezzi di vendita',high:'Più alto',low:'Più basso',sales:'Vedi singole vendite',empty:'Non ci sono ancora abbastanza vendite con prezzo e data per mostrare lo storico.',loading:'Ricerca delle vendite concluse reali degli ultimi 90 giorni…',unavailable:'Ricerca non disponibile',market:'Mercato eBay',autoCredit:'La ricerca automatica utilizza 1 ricerca disponibile.'},
nl:{title:'VERKOOPGESCHIEDENIS · 90 DAGEN',median:'Mediaan',central:'Centraal bereik',found:'Verkopen gevonden',currency:'Valuta',excluded:'Uitgesloten',credits:'Gebruikte zoekopdrachten',trend:'Verloop van verkoopprijzen',high:'Hoogste',low:'Laagste',sales:'Individuele verkopen bekijken',empty:'Er zijn nog niet genoeg verkopen met prijs en datum voor een grafiek.',loading:'Zoekt echte afgeronde verkopen van de afgelopen 90 dagen…',unavailable:'Zoeken niet beschikbaar',market:'eBay-markt',autoCredit:'Automatisch zoeken gebruikt 1 beschikbare zoekopdracht.'},
br:{title:'HISTÓRICO DE VENDAS · 90 DIAS',median:'Mediana',central:'Intervalo central',found:'Vendas encontradas',currency:'Moeda',excluded:'Excluídas',credits:'Créditos consumidos',trend:'Evolução dos preços vendidos',high:'Mais alto',low:'Mais baixo',sales:'Ver vendas individuais',empty:'Ainda não há vendas com preço e data suficientes para mostrar o histórico.',loading:'Buscando vendas reais concluídas dos últimos 90 dias…',unavailable:'Busca indisponível',market:'Mercado eBay',autoCredit:'A pesquisa automática utiliza 1 crédito de pesquisa.'}
};
const soldTr=k=>(SOLD_I18N[lang]||SOLD_I18N.pt)[k]||SOLD_I18N.pt[k];
function soldMoney(value,currency){
 const code=String(currency||'EUR').toUpperCase();
 try{return new Intl.NumberFormat(lang==='pt'||lang==='br'?'pt-PT':lang==='de'?'de-DE':lang==='fr'?'fr-FR':lang==='it'?'it-IT':lang==='nl'?'nl-NL':lang==='es'?'es-ES':'en-IE',{style:'currency',currency:code,maximumFractionDigits:2}).format(Number(value)||0)}
 catch(_){return (Number(value)||0).toFixed(2)+' '+code}
}
function renderSoldHistory(out,target='aiResult'){
 lastSoldOut=out;
 const stats=out.stats||{},rows=out.items||[],currency=stats.currency||'EUR';
 const points=rows.map((x,i)=>({x,s:Number(x.sold_price?.value),d:Date.parse(x.sold_at),i})).filter(p=>Number.isFinite(p.s)&&p.s>0&&Number.isFinite(p.d)).sort((a,b)=>a.d-b.d);
 let chart='';
 if(points.length>=2){
  const w=720,h=190,pad=28,vals=points.map(p=>p.s),min=Math.min(...vals),max=Math.max(...vals),span=max-min||1;
  const coords=points.map((p,i)=>({x:pad+i*(w-2*pad)/(points.length-1),y:h-pad-(p.s-min)/span*(h-2*pad),p}));
  const path=coords.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ');
  const circles=coords.map(p=>'<circle cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="4" fill="#ffd629" stroke="#091321" stroke-width="2"><title>'+safe(p.p.x.sold_at)+' · '+soldMoney(p.p.s,currency)+'</title></circle>').join('');
  const first=new Date(points[0].d).toLocaleDateString(lang==='pt'||lang==='br'?'pt-PT':lang,{day:'2-digit',month:'short'});
  const last=new Date(points[points.length-1].d).toLocaleDateString(lang==='pt'||lang==='br'?'pt-PT':lang,{day:'2-digit',month:'short'});
  chart='<div class="sold-chart-wrap"><div class="sold-chart-meta"><span>'+soldTr('low')+': <b>'+soldMoney(min,currency)+'</b></span><span>'+soldTr('high')+': <b>'+soldMoney(max,currency)+'</b></span></div><svg class="sold-chart" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+safe(soldTr('trend'))+'"><path d="M'+pad+' '+(h-pad)+' H'+(w-pad)+'" stroke="#49617d" stroke-width="1" fill="none"/><path d="'+path+'" fill="none" stroke="#ff6a24" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'+circles+'</svg><div class="sold-chart-dates"><span>'+safe(first)+'</span><span>'+safe(last)+'</span></div></div>';
 }else chart='<p class="note sold-empty">'+soldTr('empty')+'</p>';
 const items=rows.slice(0,15).map(x=>'<div class="item"><div class="grow"><b>'+safe(x.title)+'</b><br><small>'+safe(x.sold_at)+' · '+safe(x.condition||'')+' · '+safe((x.flags||[]).join(', '))+'</small></div><b>'+soldMoney(x.sold_price?.value,currency)+'</b><a href="'+safe(x.url)+'" target="_blank" rel="noopener">↗</a></div>').join('');
 const host=$(target);host.querySelector('.sold-history-card')?.remove();host.insertAdjacentHTML('beforeend','<div class="card sold-history-card"><div class="eyebrow">'+soldTr('title')+'</div><div class="stats sold-summary"><div class="stat"><small>'+soldTr('median')+'</small><strong>'+soldMoney(stats.median,currency)+'</strong></div><div class="stat"><small>'+soldTr('central')+'</small><strong>'+soldMoney(stats.p25,currency)+'–'+soldMoney(stats.p75,currency)+'</strong></div><div class="stat"><small>'+soldTr('found')+'</small><strong>'+safe(out.count??rows.length)+'</strong></div></div><div class="sold-chart-title">'+soldTr('trend')+'</div>'+chart+'<p class="note sold-footnote">'+soldTr('currency')+': '+safe(currency)+' · '+soldTr('excluded')+': '+safe(stats.excluded??'—')+' · '+soldTr('credits')+': '+safe(out.credits?.charged??'—')+'</p><details class="sold-list"><summary>'+soldTr('sales')+'</summary>'+items+'</details></div>');
}
$('soldSearch').onclick=async()=>{
 const q=[$('model').value.trim(),$('year').value.trim()].filter(Boolean).join(' ');
 if(!q)return alert('Indica primeiro o modelo.');
 $('aiResult').querySelector('.sold-history-card')?.remove();$('soldResult').innerHTML='';$('aiResult').insertAdjacentHTML('beforeend','<p class="muted">'+soldTr('loading')+'</p>');
 try{const out=await callFunction('hw-sold-comps',{query:q,site:$('soldSite').value,limit:30});renderSoldHistory(out,'aiResult')}
 catch(e){$('aiResult').insertAdjacentHTML('beforeend','<div class="card sold-history-card"><b>'+soldTr('unavailable')+'</b><p class="muted">'+safe(e.message)+'</p></div>')}
};

function render(){const items=db.items||[],watch=db.watch||[];$('count').textContent=items.length;$('invested').textContent=money(items.reduce((a,x)=>a+(+x.ask||0)+(+x.shipping||0),0));$('worth').textContent=money(items.reduce((a,x)=>a+(+x.min||0),0));const box=$('items');box.innerHTML='';const q=$('search').value?.toLowerCase()||'';const filtered=items.filter(x=>x.model.toLowerCase().includes(q));if(!filtered.length){box.className='empty';box.textContent=tr('empty')}else{box.className='';filtered.forEach(x=>{const row=document.createElement('div');row.className='item';const grow=document.createElement('div');grow.className='grow';grow.innerHTML='<b>'+safe(x.model)+'</b><br><small>'+safe(x.year||'')+' · '+money((+x.ask||0)+(+x.shipping||0))+' · '+money(x.min||0)+'</small>';const badge=document.createElement('span');badge.className='note';badge.textContent=tr(x.decision);const del=document.createElement('button');del.className='btn red';del.textContent='×';del.onclick=async()=>{db.items=db.items.filter(y=>y.id!==x.id);await save();render()};row.append(grow,badge,del);box.append(row)})}const wb=$('watchItems');wb.innerHTML='';if(!watch.length){wb.className='empty';wb.textContent=tr('watchEmpty')}else{wb.className='';watch.forEach(x=>{const row=document.createElement('div');row.className='item';const grow=document.createElement('div');grow.className='grow';grow.textContent=x.name+' · até '+money(x.max);const del=document.createElement('button');del.className='btn red';del.textContent='×';del.onclick=async()=>{db.watch=db.watch.filter(y=>y.id!==x.id);await save();render()};row.append(grow,del);wb.append(row)})}}
function safe(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

const ACCOUNT_I18N={
  pt:{myAccount:'A Minha Conta',premiumActive:'Premium ativo · 4,99 €/mês',renewalCancelled:d=>'A renovação foi cancelada. Manténs pesquisas ilimitadas até '+d+'.',manage:'⚙ Gerir subscrição'},
  en:{myAccount:'My Account',premiumActive:'Premium active · €4.99/month',renewalCancelled:d=>'Renewal cancelled. You keep unlimited searches until '+d+'.',manage:'⚙ Manage subscription'},
  es:{myAccount:'Mi cuenta',premiumActive:'Premium activo · 4,99 €/mes',renewalCancelled:d=>'La renovación se ha cancelado. Mantienes búsquedas ilimitadas hasta el '+d+'.',manage:'⚙ Gestionar suscripción'},
  fr:{myAccount:'Mon compte',premiumActive:'Premium actif · 4,99 €/mois',renewalCancelled:d=>'Le renouvellement a été annulé. Tu conserves les recherches illimitées jusqu’au '+d+'.',manage:'⚙ Gérer l’abonnement'},
  de:{myAccount:'Mein Konto',premiumActive:'Premium aktiv · 4,99 €/Monat',renewalCancelled:d=>'Die Verlängerung wurde gekündigt. Du behältst unbegrenzte Suchen bis zum '+d+'.',manage:'⚙ Abonnement verwalten'},
  it:{myAccount:'Il mio account',premiumActive:'Premium attivo · 4,99 €/mese',renewalCancelled:d=>'Il rinnovo è stato annullato. Mantieni le ricerche illimitate fino al '+d+'.',manage:'⚙ Gestisci abbonamento'},
  nl:{myAccount:'Mijn account',premiumActive:'Premium actief · € 4,99/maand',renewalCancelled:d=>'De verlenging is geannuleerd. Je behoudt onbeperkt zoeken tot '+d+'.',manage:'⚙ Abonnement beheren'},
  br:{myAccount:'Minha conta',premiumActive:'Premium ativo · R$ 4,99/mês',renewalCancelled:d=>'A renovação foi cancelada. Você mantém pesquisas ilimitadas até '+d+'.',manage:'⚙ Gerenciar assinatura'}
};
function updateAccountButton(){
  const btn=$('account');
  if(!btn)return;
  const words=ACCOUNT_I18N[lang]||ACCOUNT_I18N.pt;
  const label=!user?'Entrar':user.is_anonymous?'Visitante':words.myAccount;
  btn.innerHTML='<span aria-hidden="true">♙</span><span>'+label+'</span>';
}
function applyAccountPreferences(){
  if(!user||user.is_anonymous)return;
  const prefs=user.user_metadata||{};
  if(prefs.preferred_language&&T[prefs.preferred_language]){
    lang=prefs.preferred_language;
    localStorage.setItem('hwpc_lang',lang);
    $('language').value=lang;
  }
  if(prefs.appearance==='light'||prefs.appearance==='dark'){
    const light=prefs.appearance==='light';
    document.body.classList.toggle('theme-light',light);
    localStorage.setItem('hwpc_theme',light?'light':'dark');
    const themeToggle=$('themeToggle');if(themeToggle)themeToggle.textContent=light?'☀':'☾';
  }
}
function accountNotice(message,type='success'){
  const el=$('accountStatus');
  if(!el)return;
  el.textContent=message;
  el.className='account-status show '+type;
}
function accountDate(value,includeTime=false){
  if(!value)return '—';
  const d=new Date(value);
  if(Number.isNaN(d.getTime()))return '—';
  return d.toLocaleDateString('pt-PT',includeTime?{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}:{day:'2-digit',month:'long',year:'numeric'});
}
function buildAccountActivity(limit){
  const entries=[];
  (db.items||[]).forEach(item=>{
    entries.push({kind:'analysis',icon:'🏎️',title:item.model||'Modelo analisado',detail:'Análise guardada · '+(item.decision==='buy'?'Comprar':item.decision==='pass'?'Passar':'Confirmar'),date:item.date||null});
  });
  (db.watch||[]).forEach(item=>{
    if(item.date)entries.push({kind:'watch',icon:'🔎',title:item.name||'Modelo procurado',detail:'Adicionado à lista “À procura” · até '+money(item.max||0),date:item.date});
  });
  entries.sort((a,b)=>(new Date(b.date||0).getTime())-(new Date(a.date||0).getTime()));
  const rows=entries.slice(0,limit);
  if(!rows.length)return '<div class="account-empty">Ainda não há atividade guardada. Guarda uma análise ou adiciona um modelo à lista “À procura” para começar.</div>';
  return rows.map(item=>'<article class="account-activity-item"><span class="account-activity-icon">'+item.icon+'</span><span class="account-activity-copy"><strong>'+safe(item.title)+'</strong><small>'+safe(item.detail)+'</small></span><time class="account-activity-date">'+(item.date?accountDate(item.date,true):'Registo antigo')+'</time></article>').join('');
}
function renderAccount(){
  if(!user||user.is_anonymous)return;
  const words=ACCOUNT_I18N[lang]||ACCOUNT_I18N.pt;
  const meta=user.user_metadata||{},displayName=meta.display_name||meta.full_name||user.email?.split('@')[0]||'Colecionador';
  const items=db.items||[],watch=db.watch||[];
  $('accountDisplayName').textContent=displayName;
  $('accountEmailSummary').textContent=user.email||'';
  $('accountOverviewName').textContent=displayName;
  $('accountOverviewEmail').textContent=user.email||'—';
  $('accountProfileEmail').value=user.email||'';
  $('accountSecurityEmail').textContent=user.email||'—';
  $('accountSecurityVerified').textContent=(user.email_confirmed_at||user.confirmed_at)?'Confirmado':'Pendente';
  $('accountCreatedAt').textContent=accountDate(user.created_at,false);
  $('accountCollectionValue').textContent=items.length+' '+(items.length===1?'modelo':'modelos');
  $('accountWatchValue').textContent=watch.length+' na lista “À procura”';
  const quota=latestQuota,isPremium=quota?.tier==='premium';
  $('accountPlanValue').textContent=isPremium?'Premium':'Gratuito';
  $('accountPlanNote').textContent=isPremium
    ? (quota.expires_at?'Ativo até '+accountDate(quota.expires_at,false):'Acesso permanente')
    : 'Plano gratuito ativo';
  const planPill=$('accountPlanPill');
  planPill.textContent=isPremium
    ? (quota.expires_at?'★ PREMIUM ATIVO':'★ PREMIUM PERMANENTE')
    : '● CONTA ATIVA';
  planPill.classList.toggle('premium',isPremium);
  if(isPremium&&quota.unlimited){
    $('accountQuotaValue').textContent='Ilimitadas';
    $('accountQuotaNote').textContent='Sem limite diário · Premium ativo';
  }else if(quota&&typeof quota.limit==='number'){
    $('accountQuotaValue').textContent=(quota.remaining!==undefined?quota.remaining+' restantes':quota.used+' / '+quota.limit);
    $('accountQuotaNote').textContent=(quota.used||0)+' utilizadas hoje · limite '+quota.limit;
  }else{
    $('accountQuotaValue').textContent='10 / dia';
    $('accountQuotaNote').textContent='Limite atual do plano gratuito';
  }

  const billingTitle=$('premiumBillingTitle');
  const billingDescription=$('premiumBillingDescription');
  const subscribeButton=$('premiumSubscribeBtn');
  const manageButton=$('premiumManageBtn');
  const isPermanentPremium=isPremium&&!quota.expires_at;
  const isMonthlyPremium=isPremium&&!!quota.expires_at;
  if(isPermanentPremium){
    billingTitle.textContent='Premium permanente';
    billingDescription.textContent='Esta conta tem acesso Premium vitalício, sem mensalidade nem renovação. As pesquisas são ilimitadas.';
    subscribeButton.classList.add('hidden');
    manageButton.classList.add('hidden');
  }else if(isMonthlyPremium){
    billingTitle.textContent=words.premiumActive;
    const endDate=accountDate(quota.expires_at,false);
    billingDescription.textContent=billingDetails?.cancel_at_period_end
      ? words.renewalCancelled(endDate)
      : 'Tens pesquisas ilimitadas. A subscrição renova automaticamente; período atual até '+endDate+'.';
    subscribeButton.classList.add('hidden');
    manageButton.classList.remove('hidden');
    manageButton.textContent=words.manage;
  }else{
    billingTitle.textContent='Desbloqueia o Premium';
    billingDescription.textContent='4,99 €/mês · Pesquisas ilimitadas na análise de modelos e nas vendas concluídas. Renovação automática, cancelável a qualquer momento.';
    subscribeButton.classList.remove('hidden');
    manageButton.classList.add('hidden');
  }

  if(document.activeElement!==$('accountProfileName'))$('accountProfileName').value=meta.display_name||meta.full_name||'';
  $('accountLanguage').value=lang;
  $('accountAppearance').value=localStorage.getItem('hwpc_theme')||'dark';
  $('accountRecentActivity').innerHTML=buildAccountActivity(3);
  $('accountFullActivity').innerHTML=buildAccountActivity(30);
}
function setAccountSection(name){
  document.querySelectorAll('[data-account-section]').forEach(btn=>btn.classList.toggle('active',btn.dataset.accountSection===name));
  document.querySelectorAll('[data-account-panel]').forEach(panel=>panel.classList.toggle('active',panel.dataset.accountPanel===name));
}
document.querySelectorAll('[data-account-section]').forEach(btn=>btn.addEventListener('click',()=>setAccountSection(btn.dataset.accountSection)));
$('accountProfileSave')?.addEventListener('click',async()=>{
  if(!user||user.is_anonymous)return accountNotice('Inicia sessão com uma conta para editar o perfil.','error');
  const button=$('accountProfileSave'),name=$('accountProfileName').value.trim();
  if(name.length>60)return accountNotice('O nome de perfil não pode ultrapassar 60 caracteres.','error');
  button.disabled=true;button.textContent='A guardar…';
  try{
    const {data,error}=await sb.auth.updateUser({data:{...(user.user_metadata||{}),display_name:name}});
    if(error)throw error;
    user=data.user||user;updateAccountButton();renderAccount();
    accountNotice('Perfil atualizado com sucesso.','success');
  }catch(error){accountNotice('Não foi possível guardar o perfil: '+(error.message||error),'error')}
  finally{button.disabled=false;button.textContent='✓ Guardar perfil'}
};
$('accountEmailSave')?.addEventListener('click',async()=>{
  if(!user||user.is_anonymous)return accountNotice('Inicia sessão com uma conta para alterar o email.','error');
  const button=$('accountEmailSave'),email=$('accountNewEmail').value.trim().toLowerCase();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return accountNotice('Introduz um endereço de email válido.','error');
  if(email===String(user.email||'').toLowerCase())return accountNotice('O novo endereço é igual ao email atual.','error');
  button.disabled=true;button.textContent='A enviar pedido…';
  try{
    const {data,error}=await sb.auth.updateUser({email},{emailRedirectTo:'https://hwpricecheck.pages.dev/'});
    if(error)throw error;
    user=data.user||user;
    accountNotice('Pedido enviado. Segue as instruções de confirmação recebidas por email antes de usares o novo endereço.','success');
    $('accountNewEmail').value='';
  }catch(error){accountNotice('Não foi possível pedir a alteração do email: '+(error.message||error),'error')}
  finally{button.disabled=false;button.textContent='Enviar pedido de alteração'}
};
$('accountPasswordSave')?.addEventListener('click',async()=>{
  if(!user||user.is_anonymous)return accountNotice('Inicia sessão com uma conta para alterar a palavra-passe.','error');
  const button=$('accountPasswordSave'),password=$('accountNewPassword').value,confirmPassword=$('accountConfirmPassword').value;
  if(password.length<8)return accountNotice('A nova palavra-passe deve ter pelo menos 8 caracteres.','error');
  if(password!==confirmPassword)return accountNotice('As duas palavras-passe não coincidem.','error');
  button.disabled=true;button.textContent='A atualizar…';
  try{
    await requireSafePassword(password);
    const {error}=await sb.auth.updateUser({password});
    if(error)throw error;
    $('accountNewPassword').value='';$('accountConfirmPassword').value='';
    accountNotice('Palavra-passe atualizada com sucesso.','success');
  }catch(error){accountNotice('Não foi possível atualizar a palavra-passe: '+(error.message||error),'error')}
  finally{button.disabled=false;button.textContent='🔐 Atualizar palavra-passe'}
};
$('accountPreferencesSave')?.addEventListener('click',async()=>{
  if(!user||user.is_anonymous)return accountNotice('Inicia sessão com uma conta para guardar preferências.','error');
  const button=$('accountPreferencesSave'),newLang=$('accountLanguage').value,appearance=$('accountAppearance').value;
  button.disabled=true;button.textContent='A guardar…';
  lang=newLang;localStorage.setItem('hwpc_lang',lang);$('language').value=lang;
  document.body.classList.toggle('theme-light',appearance==='light');
  localStorage.setItem('hwpc_theme',appearance);const themeToggle=$('themeToggle');if(themeToggle)themeToggle.textContent=appearance==='light'?'☀':'☾';
  try{
    const {data,error}=await sb.auth.updateUser({data:{...(user.user_metadata||{}),preferred_language:lang,appearance}});
    if(error)throw error;
    user=data.user||user;
    translate();renderAccount();
    accountNotice('Preferências guardadas nesta conta e neste dispositivo.','success');
  }catch(error){
    translate();renderAccount();
    accountNotice('Preferências aplicadas neste dispositivo, mas não foi possível sincronizá-las com a conta: '+(error.message||error),'error');
  }finally{button.disabled=false;button.textContent='✓ Guardar preferências'}
};
async function accountSignOut(){
  if(!user||user.is_anonymous)return;
  const button=$('accountLogout');if(button)button.disabled=true;
  await save();
  const {error}=await sb.auth.signOut();
  if(error){accountNotice('Não foi possível terminar a sessão: '+error.message,'error');if(button)button.disabled=false;return}
  user=null;latestQuota=null;db={items:[],watch:[]};updateAccountButton();showHome();
  await ensureAnonymousSession();
  if(user){updateAccountButton();await load()}else updateAccountButton();
  if(button)button.disabled=false;
}
async function runBillingAction(action){
  if(!sb||!user||user.is_anonymous)return accountNotice('Inicia sessão com uma conta registada para usar o Premium.','error');
  const button=action==='checkout'?$('premiumSubscribeBtn'):$('premiumManageBtn');
  const originalText=button.textContent;
  button.disabled=true;
  button.textContent=action==='checkout'?'A abrir pagamento…':action==='portal'?'A abrir gestão da subscrição…':action==='cancel'?'A cancelar renovação…':'A reativar renovação…';
  try{
    const {data,error}=await sb.functions.invoke('hw-billing',{body:{action}});
    if(error){
      let message=error.message||'Não foi possível contactar o serviço de faturação.';
      try{const detail=await error.context?.json();if(detail?.message)message=detail.message;}catch(e){}
      throw new Error(message);
    }
    if(data?.error)throw new Error(data.message||'Não foi possível processar o pedido.');
    if(action==='checkout'||action==='portal'){
      if(!data?.url)throw new Error(action==='portal'?'A Stripe não devolveu o endereço de gestão da subscrição.':'O Stripe não devolveu o endereço de pagamento.');
      window.location.assign(data.url);
      return;
    }
    billingDetails={...(billingDetails||{}),status:data.status,current_period_end:data.current_period_end,cancel_at_period_end:data.cancel_at_period_end};
    renderAccount();
    accountNotice(action==='cancel'
      ? 'Renovação cancelada. O Premium mantém-se até ao fim do período pago.'
      : 'Renovação reativada. O Premium continuará a renovar mensalmente.','success');
  }catch(error){
    accountNotice(error.message||'Não foi possível concluir a operação.','error');
  }finally{
    button.disabled=false;
    button.textContent=originalText;
    renderAccount();
  }
}
$('premiumSubscribeBtn')?.addEventListener('click',()=>runBillingAction('checkout'));
$('premiumManageBtn')?.addEventListener('click',()=>runBillingAction('portal'));

function handleSubscriptionReturn(){
  const params=new URLSearchParams(window.location.search);
  const result=params.get('subscription');
  if(!result||!user||user.is_anonymous)return;
  params.delete('subscription');
  const cleanUrl=window.location.pathname+(params.toString()?'?'+params.toString():'')+window.location.hash;
  window.history.replaceState({},'',cleanUrl);
  openWorkspace('accountPage');
  if(result==='success'){
    accountNotice('Pagamento concluído. O Premium será ativado assim que o Stripe confirmar a subscrição.','success');
    window.setTimeout(()=>refreshAccountPlan(),2500);
  }else if(result==='cancelled'){
    accountNotice('O pagamento foi cancelado. Não foi criada nenhuma subscrição.','error');
  }
}
$('accountLogout')?.addEventListener('click',async()=>{if(confirm('Queres terminar a sessão do HW Price Check neste dispositivo?'))await accountSignOut()});
$('accountSecurityLogout')?.addEventListener('click',async()=>{if(confirm('Queres terminar a sessão do HW Price Check neste dispositivo?'))await accountSignOut()});
$('search')?.addEventListener('input',render);
$('export')?.addEventListener('click',()=>{const rows=[['Modelo','Ano','Preço','Portes','Valor mínimo','Decisão'],...db.items.map(x=>[x.model,x.year,x.ask,x.shipping,x.min,x.decision])];const csv=rows.map(r=>r.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(';')).join('\n');const a=document.createElement('a');a.href=window.URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv'}));a.download='hw-price-check.csv';a.click()});

$('newsletterForm')?.addEventListener('submit',async e=>{
 e.preventDefault();
 const email=$('newsletterEmail').value.trim().toLowerCase(),button=$('newsletterSubmit'),status=$('newsletterStatus');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){status.textContent='Indica um endereço de email válido.';return}
 if(!sb){status.textContent='Serviço indisponível. Tenta novamente mais tarde.';return}
 button.disabled=true;button.textContent='A subscrever…';
 try{
  const {error}=await sb.from('newsletter_subscribers').insert({email});
  if(error&&error.code==='23505'){status.textContent='Este email já está inscrito.'}
  else if(error)throw error;
  else{status.textContent='Registo concluído. Obrigado!';$('newsletterEmail').value=''}
 }catch(err){console.error('Newsletter:',err);status.textContent='Não foi possível concluir a subscrição. Tenta novamente.'}
 finally{button.disabled=false;button.textContent='Subscrever'}
});

window.HWPC_MAIN_READY=true;updateVisitorCounter();translate();const bindInfoLink=(id,message)=>{const link=$(id);if(link)link.onclick=e=>{e.preventDefault();alert(message)}};bindInfoLink('contactLink','O contacto de suporte será publicado aqui assim que estiver definido.');bindInfoLink('termsLink','Os resultados e estimativas são informativos, dependem dos dados disponíveis e não constituem aconselhamento financeiro nem garantia de valorização. Confirma sempre a identificação, estado e comparáveis antes de comprar.');bindInfoLink('privacyLink','Os dados da coleção são associados à tua conta Supabase. As fotografias são enviadas para a análise que pedes. A política completa será publicada antes do lançamento comercial.');bindInfoLink('cookiesLink','A aplicação utiliza armazenamento local e tecnologias necessárias à sessão, preferências e funcionamento. A política detalhada será publicada antes do lançamento comercial.');if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
