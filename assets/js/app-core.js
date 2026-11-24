
const SUPABASE_URL='https://hvxszwbszrigeznmmkeb.supabase.co',KEY='sb_publishable_onFuWjOv4XdLMoA0enaCgA_OcX1deTF',sb=window.supabase?.createClient?window.supabase.createClient(SUPABASE_URL,KEY):null;
const T={
pt:{headline:'Descobre o valor das tuas Hot Wheels',subhead:'Pesquisa modelos, analisa o valor de mercado, consulta vendas reais e gere a tua coleção num só lugar.',analyse:'Analisar',collection:'Coleção',watch:'À procura',photo:'Fotografias',photoHelp:'Uma única fotografia nítida é suficiente para começar. As fotografias do verso e dos detalhes são opcionais e ajudam apenas a aumentar a confiança.',details:'Dados do modelo',model:'Modelo / nome *',year:'Ano / série / referência',type:'Classificação',condition:'Estado',assessment:'Avaliação de compra',ask:'Preço pedido (€)',shipping:'Portes e taxas (€)',purchasePrice:'Preço de compra (€)',purchaseShipping:'Portes pagos (€)',saveAnalysis:'Guardar nesta coleção',analysisSaved:'Guardado na coleção.',min:'Valor de revenda mínimo (€)',max:'Valor de revenda máximo (€)',sold:'Vendas concluídas comparáveis',certainty:'Confirmação TH/STH',evidence:'Evidências / links de vendas concluídas',notes:'Notas e justificação',evaluate:'Avaliar oportunidade',clear:'Limpar',limits:'Os preços pedidos e as vendas concluídas são apresentados separadamente. Confirma sempre a variante e a condição: as estimativas dependem da amostra disponível e não são promessas de venda.',items:'Itens',invested:'Investido',value:'Valor estimado',collectionTitle:'A minha coleção',search:'Pesquisar modelo…',empty:'Ainda não tens modelos guardados.',export:'Exportar cópia CSV',watchTitle:'Lista de procura',wanted:'Modelo procurado',limit:'Preço máximo (€)',add:'Adicionar',watchEmpty:'Lista vazia.',login:'Entrar',signup:'Criar conta',authIntro:'Cria uma conta ou inicia sessão para manter a tua coleção sincronizada.',pw:'Palavra-passe',saved:'Guardado neste dispositivo.',buy:'COMPRAR',pass:'PASSAR',check:'CONFIRMAR',total:'Custo total',range:'Revenda estimada',margin:'Margem estimada',reason:'Decisão baseada nos dados introduzidos.',askLogin:'Não é necessário iniciar sessão.'},
en:{headline:'Discover the value of your Hot Wheels',subhead:'Review models, track your collection and monitor your investment — asking prices are not completed sales.',analyse:'Analyse',collection:'Collection',watch:'Watchlist',photo:'Photos',photoHelp:'One clear photo is enough to start. Back and detail photos are optional and only help improve confidence.',details:'Model details',model:'Model / name *',year:'Year / series / reference',type:'Classification',condition:'Condition',assessment:'Purchase assessment',ask:'Asking price (€)',shipping:'Shipping and fees (€)',purchasePrice:'Purchase price (€)',purchaseShipping:'Shipping paid (€)',saveAnalysis:'Save to collection',analysisSaved:'Saved to collection.',min:'Minimum resale value (€)',max:'Maximum resale value (€)',sold:'Comparable completed sales',certainty:'TH/STH confirmation',evidence:'Evidence / completed-sale links',notes:'Notes and reasoning',evaluate:'Assess opportunity',clear:'Clear',limits:'No automatic eBay/Vinted search or TH/STH confirmation without evidence. Projections are scenarios, not promises.',items:'Items',invested:'Invested',value:'Estimated value',collectionTitle:'My collection',search:'Search model…',empty:'No saved models yet.',export:'Export CSV backup',watchTitle:'Watchlist',wanted:'Wanted model',limit:'Maximum price (€)',add:'Add',watchEmpty:'Empty list.',login:'Log in',signup:'Create account',authIntro:'Create an account or log in to sync your collection.',pw:'Password',saved:'Saved and synced.',buy:'BUY',pass:'PASS',check:'CHECK',total:'Total cost',range:'Estimated resale',margin:'Estimated margin',reason:'Decision based on entered data.',askLogin:'Log in first.'},
es:{headline:'Descubre el valor de tus Hot Wheels',subhead:'Analiza modelos y sigue tu colección. Los precios anunciados no son ventas cerradas.',analyse:'Analizar',collection:'Colección',watch:'Buscando',photo:'Fotos',photoHelp:'Una sola foto nítida es suficiente para empezar. Las fotos del reverso y los detalles son opcionales y solo mejoran la confianza.',details:'Datos del modelo',model:'Modelo / nombre *',year:'Año / serie / referencia',type:'Clasificación',condition:'Estado',assessment:'Evaluación de compra',ask:'Precio pedido (€)',shipping:'Envío y tasas (€)',purchasePrice:'Precio de compra (€)',purchaseShipping:'Envío pagado (€)',saveAnalysis:'Guardar en la colección',analysisSaved:'Guardado en la colección.',min:'Valor mínimo de reventa (€)',max:'Valor máximo de reventa (€)',sold:'Ventas comparables cerradas',certainty:'Confirmación TH/STH',evidence:'Pruebas / enlaces de ventas',notes:'Notas y justificación',evaluate:'Evaluar oportunidad',clear:'Limpiar',limits:'Sin búsqueda automática en eBay/Vinted ni confirmación TH/STH sin pruebas.',items:'Artículos',invested:'Invertido',value:'Valor estimado',collectionTitle:'Mi colección',search:'Buscar modelo…',empty:'Aún no hay modelos.',export:'Exportar CSV',watchTitle:'Lista de búsqueda',wanted:'Modelo buscado',limit:'Precio máximo (€)',add:'Añadir',watchEmpty:'Lista vacía.',login:'Entrar',signup:'Crear cuenta',authIntro:'Crea una cuenta o inicia sesión para sincronizar tu colección.',pw:'Contraseña',saved:'Guardado y sincronizado.',buy:'COMPRAR',pass:'PASAR',check:'CONFIRMAR',total:'Coste total',range:'Reventa estimada',margin:'Margen estimado',reason:'Decisión basada en los datos introducidos.',askLogin:'Inicia sesión primero.'},
fr:{headline:'Découvre la valeur de tes Hot Wheels',subhead:'Analyse ta collection. Les prix affichés ne sont pas des ventes conclues.',analyse:'Analyser',collection:'Collection',watch:'À rechercher',photo:'Photos',photoHelp:'Une seule photo nette suffit pour commencer. Les photos du verso et des détails sont facultatives et améliorent seulement la confiance.',details:'Détails du modèle',model:'Modèle / nom *',year:'Année / série / référence',type:'Classification',condition:'État',assessment:'Évaluation d’achat',ask:'Prix demandé (€)',shipping:'Livraison et frais (€)',purchasePrice:'Prix d’achat (€)',purchaseShipping:'Livraison payée (€)',saveAnalysis:'Enregistrer dans la collection',analysisSaved:'Ajouté à la collection.',min:'Valeur minimale (€)',max:'Valeur maximale (€)',sold:'Ventes comparables conclues',certainty:'Confirmation TH/STH',evidence:'Preuves / liens de ventes',notes:'Notes et justification',evaluate:'Évaluer',clear:'Effacer',limits:'Pas de recherche eBay/Vinted ni de confirmation TH/STH sans preuve.',items:'Articles',invested:'Investi',value:'Valeur estimée',collectionTitle:'Ma collection',search:'Rechercher…',empty:'Aucun modèle enregistré.',export:'Exporter CSV',watchTitle:'Liste de recherche',wanted:'Modèle recherché',limit:'Prix maximum (€)',add:'Ajouter',watchEmpty:'Liste vide.',login:'Connexion',signup:'Créer un compte',authIntro:'Crée un compte ou connecte-toi pour synchroniser ta collection.',pw:'Mot de passe',saved:'Enregistré et synchronisé.',buy:'ACHETER',pass:'PASSER',check:'VÉRIFIER',total:'Coût total',range:'Revente estimée',margin:'Marge estimée',reason:'Décision basée sur les données saisies.',askLogin:'Connecte-toi d’abord.'},
de:{headline:'Entdecke den Wert deiner Hot Wheels',subhead:'Prüfe Modelle und verwalte deine Sammlung. Angebotspreise sind keine Verkäufe.',analyse:'Prüfen',collection:'Sammlung',watch:'Merkliste',photo:'Fotos',photoHelp:'Ein einziges scharfes Foto reicht für den Anfang. Rück- und Detailfotos sind optional und erhöhen nur die Sicherheit.',details:'Modelldaten',model:'Modell / Name *',year:'Jahr / Serie / Referenz',type:'Klassifizierung',condition:'Zustand',assessment:'Kaufbewertung',ask:'Angebotspreis (€)',shipping:'Versand und Gebühren (€)',purchasePrice:'Kaufpreis (€)',purchaseShipping:'Bezahlter Versand (€)',saveAnalysis:'In Sammlung speichern',analysisSaved:'In Sammlung gespeichert.',min:'Mindestwert (€)',max:'Höchstwert (€)',sold:'Vergleichbare Verkäufe',certainty:'TH/STH-Bestätigung',evidence:'Belege / Verkaufslinks',notes:'Notizen und Begründung',evaluate:'Bewerten',clear:'Leeren',limits:'Keine automatische eBay/Vinted-Suche oder TH/STH-Bestätigung ohne Belege.',items:'Artikel',invested:'Investiert',value:'Geschätzter Wert',collectionTitle:'Meine Sammlung',search:'Modell suchen…',empty:'Noch keine Modelle gespeichert.',export:'CSV exportieren',watchTitle:'Merkliste',wanted:'Gesuchtes Modell',limit:'Höchstpreis (€)',add:'Hinzufügen',watchEmpty:'Liste leer.',login:'Anmelden',signup:'Konto erstellen',authIntro:'Melde dich an, um deine Sammlung zu synchronisieren.',pw:'Passwort',saved:'Gespeichert und synchronisiert.',buy:'KAUFEN',pass:'NEIN',check:'PRÜFEN',total:'Gesamtkosten',range:'Geschätzter Wiederverkauf',margin:'Geschätzte Marge',reason:'Entscheidung basiert auf den eingegebenen Daten.',askLogin:'Bitte zuerst anmelden.'},
it:{headline:'Scopri il valore delle tue Hot Wheels',subhead:'Analizza i modelli e gestisci la collezione. I prezzi richiesti non sono vendite concluse.',analyse:'Analizza',collection:'Collezione',watch:'Da cercare',photo:'Foto',photoHelp:'Una sola foto nitida è sufficiente per iniziare. Le foto del retro e dei dettagli sono facoltative e aumentano solo la sicurezza.',details:'Dati del modello',model:'Modello / nome *',year:'Anno / serie / riferimento',type:'Classificazione',condition:'Condizioni',assessment:'Valutazione acquisto',ask:'Prezzo richiesto (€)',shipping:'Spedizione e costi (€)',purchasePrice:'Prezzo di acquisto (€)',purchaseShipping:'Spedizione pagata (€)',saveAnalysis:'Salva nella collezione',analysisSaved:'Salvato nella collezione.',min:'Valore minimo (€)',max:'Valore massimo (€)',sold:'Vendite comparabili concluse',certainty:'Conferma TH/STH',evidence:'Prove / link vendite',notes:'Note e motivazione',evaluate:'Valuta opportunità',clear:'Pulisci',limits:'Nessuna ricerca eBay/Vinted o conferma TH/STH automatica.',items:'Articoli',invested:'Investito',value:'Valore stimato',collectionTitle:'La mia collezione',search:'Cerca modello…',empty:'Nessun modello salvato.',export:'Esporta CSV',watchTitle:'Lista desideri',wanted:'Modello cercato',limit:'Prezzo massimo (€)',add:'Aggiungi',watchEmpty:'Lista vuota.',login:'Accedi',signup:'Crea account',authIntro:'Accedi per sincronizzare la tua collezione.',pw:'Password',saved:'Salvato e sincronizzato.',buy:'COMPRA',pass:'PASSA',check:'VERIFICA',total:'Costo totale',range:'Rivendita stimata',margin:'Margine stimato',reason:'Decisione basata sui dati inseriti.',askLogin:'Accedi prima.'},
nl:{headline:'Ontdek de waarde van je Hot Wheels',subhead:'Controleer modellen en beheer je collectie. Vraagprijzen zijn geen afgeronde verkopen.',analyse:'Controleren',collection:'Collectie',watch:'Gezocht',photo:'Foto’s',photoHelp:'Eén duidelijke foto is genoeg om te beginnen. Foto’s van de achterkant en details zijn optioneel en verhogen alleen de zekerheid.',details:'Modelgegevens',model:'Model / naam *',year:'Jaar / serie / referentie',type:'Classificatie',condition:'Staat',assessment:'Aankoopbeoordeling',ask:'Vraagprijs (€)',shipping:'Verzending en kosten (€)',purchasePrice:'Aankoopprijs (€)',purchaseShipping:'Betaalde verzending (€)',saveAnalysis:'Opslaan in collectie',analysisSaved:'Opgeslagen in collectie.',min:'Minimumwaarde (€)',max:'Maximumwaarde (€)',sold:'Vergelijkbare verkopen',certainty:'TH/STH-bevestiging',evidence:'Bewijs / verkooplinks',notes:'Notities en reden',evaluate:'Beoordeel',clear:'Wissen',limits:'Geen automatische eBay/Vinted-zoektocht of TH/STH-bevestiging zonder bewijs.',items:'Items',invested:'Geïnvesteerd',value:'Geschatte waarde',collectionTitle:'Mijn collectie',search:'Zoek model…',empty:'Nog geen modellen opgeslagen.',export:'CSV exporteren',watchTitle:'Zoeklijst',wanted:'Gezocht model',limit:'Maximumprijs (€)',add:'Toevoegen',watchEmpty:'Lijst leeg.',login:'Inloggen',signup:'Account maken',authIntro:'Log in om je collectie te synchroniseren.',pw:'Wachtwoord',saved:'Opgeslagen en gesynchroniseerd.',buy:'KOPEN',pass:'OVERSLAAN',check:'CONTROLEREN',total:'Totale kosten',range:'Geschatte doorverkoop',margin:'Geschatte marge',reason:'Beslissing op basis van ingevoerde gegevens.',askLogin:'Log eerst in.'},
br:{headline:'Descubra o valor dos seus Hot Wheels',subhead:'Analise modelos e acompanhe sua coleção. Preços anunciados não são vendas concluídas.',analyse:'Analisar',collection:'Coleção',watch:'Procurando',photo:'Fotos',photoHelp:'Uma única foto nítida é suficiente para começar. Fotos do verso e dos detalhes são opcionais e apenas aumentam a confiança.',details:'Dados do modelo',model:'Modelo / nome *',year:'Ano / série / referência',type:'Classificação',condition:'Estado',assessment:'Avaliação de compra',ask:'Preço anunciado (€)',shipping:'Frete e taxas (€)',purchasePrice:'Preço de compra (€)',purchaseShipping:'Frete pago (€)',saveAnalysis:'Salvar na coleção',analysisSaved:'Salvo na coleção.',min:'Valor mínimo de revenda (€)',max:'Valor máximo de revenda (€)',sold:'Vendas comparáveis concluídas',certainty:'Confirmação TH/STH',evidence:'Evidências / links de vendas',notes:'Notas e justificativa',evaluate:'Avaliar oportunidade',clear:'Limpar',limits:'Sem busca automática no eBay/Vinted ou confirmação TH/STH sem evidências.',items:'Itens',invested:'Investido',value:'Valor estimado',collectionTitle:'Minha coleção',search:'Buscar modelo…',empty:'Ainda não há modelos salvos.',export:'Exportar CSV',watchTitle:'Lista de desejos',wanted:'Modelo procurado',limit:'Preço máximo (€)',add:'Adicionar',watchEmpty:'Lista vazia.',login:'Entrar',signup:'Criar conta',authIntro:'Entre para sincronizar sua coleção.',pw:'Senha',saved:'Salvo e sincronizado.',buy:'COMPRAR',pass:'PASSAR',check:'CONFIRMAR',total:'Custo total',range:'Revenda estimada',margin:'Margem estimada',reason:'Decisão baseada nos dados informados.',askLogin:'Entre primeiro.'}};
let lang='pt',user=null,adminSession=false,db={items:[],watch:[]},photos=['','',''],photoFiles=[null,null,null],photoPreviewUrls=[null,null,null],lastEval=null,latestQuota=null,billingDetails=null;
const GUEST_BACKUP_KEY='hwpc_guest_backup_v1';
const LOCAL_DATA_KEY='hwpc_local_collection_v1';
// Remove legacy browser identifiers and guest preferences; preferences now live in memory or account metadata.
try{['hwpc_visitor_id','hwpc_lang','hwpc-language','hwpc_theme'].forEach(key=>localStorage.removeItem(key))}catch(_){}

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
async function updateVisitorCounter(){
  const target=$('visitorCounter');
  if(!target)return;
  const set=(value,state='ready')=>{target.textContent=value;target.dataset.state=state;};
  if(!sb){set('Visitantes: indisponível','error');return;}
  try{
    // Reuse the Supabase auth UUID already required by the app instead of
    // creating a second, long-lived browser identifier in localStorage.
    const {data:{session}}=await sb.auth.getSession();
    const visitorId=session?.user?.id;
    if(!visitorId)throw new Error('Sessão de visitante indisponível');
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
const fields={soldSiteLabel:'market',headline:'headline',subhead:'subhead',tabAnalyse:'analyse',tabCollection:'collection',tabWatch:'watch',photoTitle:'photo',photoHelp:'photoHelp',detailsTitle:'details',modelLabel:'model',yearLabel:'year',typeLabel:'type',conditionLabel:'condition',purchasePriceLabel:'purchasePrice',purchaseShippingLabel:'purchaseShipping',itemsLabel:'items',investedLabel:'invested',valueLabel:'value',collectionTitle:'collectionTitle',export:'export',watchTitle:'watchTitle',wantedLabel:'wanted',limitLabel:'limit',addWatch:'add',limits:'limits',authIntro:'authIntro',pwLabel:'pw',login:'login',signup:'signup'};
function translate(){for(const [id,k] of Object.entries(fields)){const el=$(id);if(!el)continue;if(id==='headline'){const value=tr(k),parts=value.split(/(Hot Wheels)/i);el.replaceChildren();for(const part of parts){if(!part)continue;if(/^Hot Wheels$/i.test(part)){const emphasis=document.createElement('em');emphasis.textContent=part;el.append(emphasis)}else el.append(document.createTextNode(part))}}else el.textContent=id==='soldSiteLabel'?soldTr('market'):tr(k)}const language=$('language');if(language)language.value=lang;const authTitle=$('authTitle');if(authTitle)authTitle.textContent=tr('login');const search=$('search');if(search)search.placeholder=tr('search');const authHeading=$('authGate')?.querySelector('h2');if(authHeading)authHeading.textContent=tr('login');const tabAccount=$('tabAccount');if(tabAccount)tabAccount.textContent=({pt:'🏁 A Minha Conta',en:'🏁 My Account',es:'🏁 Mi cuenta',fr:'🏁 Mon compte',de:'🏁 Mein Konto',it:'🏁 Il mio account',nl:'🏁 Mijn account',br:'🏁 Minha conta'}[lang]||'🏁 A Minha Conta');updateAccountButton();if(lastSoldOut)renderSoldHistory(lastSoldOut,'aiResult')}
$('language')?.addEventListener('change',e=>{lang=e.target.value;translate()});
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{document.querySelectorAll('.view').forEach(v=>v.classList.toggle('hidden',v.id!==b.dataset.view));document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x===b));render();if(b.dataset.view==='accountPage')renderAccount()});
function status(s){const target=$('authStatus')||$('aiStatus')||$('appNotice');if(target)target.textContent=s}
function showGate(v){const gate=$('authGate');if(!gate)return;gate.classList.toggle('hidden',!v);gate.setAttribute('aria-hidden',String(!v))}
function showAdminLogin(){
  const modal=$('hwpcAdminModal');if(!modal)return;
  const form=$('hwpcAdminForm'),status=$('hwpcAdminStatus'),logout=$('hwpcAdminLogout');
  if(adminSession){form?.classList.add('hidden');logout?.classList.remove('hidden');if(status)status.textContent='Sessão de administrador ativa. Podes gerir as fotografias do catálogo.'}
  else{form?.classList.remove('hidden');logout?.classList.add('hidden');if(status)status.textContent='Acesso reservado à conta de administrador autorizada.'}
  modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');
  if(!adminSession)$('hwpcAdminEmail')?.focus();
}
window.hwpcShowAdminLogin=showAdminLogin;
$('openAdminLogin')?.addEventListener('click',showAdminLogin);
$('hwpcAdminClose')?.addEventListener('click',()=>{$('hwpcAdminModal')?.classList.add('hidden');$('hwpcAdminModal')?.setAttribute('aria-hidden','true')});
$('hwpcAdminModal')?.addEventListener('click',e=>{if(e.target===$('hwpcAdminModal'))$('hwpcAdminClose')?.click()});
$('hwpcAdminForm')?.addEventListener('submit',async e=>{
  e.preventDefault();
  if(!sb){$('hwpcAdminStatus').textContent='O serviço de autenticação não está disponível.';return}
  const button=$('hwpcAdminSubmit');button.disabled=true;button.textContent='A verificar…';
  try{
    const {data,error}=await sb.auth.signInWithPassword({email:$('hwpcAdminEmail').value.trim(),password:$('hwpcAdminPassword').value});
    if(error)throw error;
    const {data:allowed,error:permissionError}=await sb.rpc('is_catalog_image_admin');
    if(permissionError||allowed!==true){
      await sb.auth.signOut();user=null;adminSession=false;await ensureAnonymousSession();
      throw new Error('Esta conta não está autorizada a administrar o catálogo.');
    }
    user=data.user;adminSession=true;
    $('hwpcAdminPassword').value='';
    $('hwpcAdminStatus').textContent='Sessão iniciada. Já podes carregar fotografias.';
    window.dispatchEvent(new Event('hwpc:auth-updated'));
    showAdminLogin();
  }catch(error){$('hwpcAdminStatus').textContent=error?.message||'Não foi possível iniciar sessão.'}
  finally{button.disabled=false;button.textContent='Entrar como administrador'}
});
$('hwpcAdminLogout')?.addEventListener('click',async()=>{
  const button=$('hwpcAdminLogout');button.disabled=true;
  try{
    const {error}=await sb.auth.signOut();if(error)throw error;
    user=null;adminSession=false;await ensureAnonymousSession();
    window.dispatchEvent(new Event('hwpc:auth-updated'));
    $('hwpcAdminModal')?.classList.add('hidden');
  }catch(error){$('hwpcAdminStatus').textContent=error?.message||'Não foi possível terminar sessão.'}
  finally{button.disabled=false}
});

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
  const label='Pedidos gratuitos hoje: '+q.remaining+' de '+(q.limit||10)+' restantes.';
  $('quotaNotice').textContent=label+' Cada pedido a um serviço conta como 1 utilização; uma análise completa pode consumir várias.';
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
  if(!sb){user=null;$('appNotice').textContent='O serviço de pesquisa não carregou. Atualiza a página e tenta novamente.';return false;}
  const {data:{session}}=await sb.auth.getSession();
  if(session){user=session.user;return true;}
  if(!sb){user=null;$('appNotice').textContent='O serviço de pesquisa não carregou. Atualiza a página e tenta novamente.';return false;}const {data,error}=await sb.auth.signInAnonymously();
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
async function load(){
  const empty={items:[],watch:[]};
  let local=null,backup=null,legacy=null;
  try{
    const localText=localStorage.getItem(LOCAL_DATA_KEY);
    if(localText)local=JSON.parse(localText);
    const backupText=localStorage.getItem(GUEST_BACKUP_KEY);
    if(backupText)backup=JSON.parse(backupText);
  }catch(error){console.warn('Não foi possível ler a coleção local:',error)}
  if(!local&&sb&&user&&!user.is_anonymous){
    try{
      const {data,error}=await sb.from('user_data').select('payload').eq('user_id',user.id).maybeSingle();
      if(error)console.warn('Migração da coleção antiga indisponível:',error.message);
      else if(data?.payload)legacy=data.payload;
    }catch(error){console.warn('Migração da coleção antiga falhou:',error)}
  }
  const sources=[local,legacy,backup].filter(Boolean);
  const merge=(key)=>{
    const rows=sources.flatMap(value=>Array.isArray(value?.[key])?value[key]:[]);
    return [...new Map(rows.filter(x=>x&&typeof x==='object').map(x=>[String(x.id||crypto.randomUUID()),x])).values()];
  };
  db={items:merge('items'),watch:merge('watch')};
  try{
    localStorage.setItem(LOCAL_DATA_KEY,JSON.stringify(db));
    if(backup)localStorage.removeItem(GUEST_BACKUP_KEY);
  }catch(error){console.warn('Não foi possível guardar a migração local:',error)}
  render();
}
async function save(){
  try{
    localStorage.setItem(LOCAL_DATA_KEY,JSON.stringify({
      items:Array.isArray(db.items)?db.items:[],
      watch:Array.isArray(db.watch)?db.watch:[]
    }));
    status('Coleção guardada neste dispositivo. Não é sincronizada com outros dispositivos.');
    return true;
  }catch(error){
    status('Não foi possível guardar a coleção neste navegador. Exporta uma cópia CSV antes de limpar os dados do site.');
    console.error('Local collection save failed:',error);
    return false;
  }
}
function showHome(){ $('appWorkspace').classList.add('hidden');$('homePage').classList.remove('hidden');document.querySelectorAll('[data-page]').forEach(x=>x.classList.toggle('active',x.dataset.page==='home'));window.scrollTo({top:0,behavior:'smooth'}); } function openWorkspace(view){ $('homePage').classList.add('hidden');$('appWorkspace').classList.remove('hidden');const tab=document.querySelector('[data-view="'+view+'"]');if(tab)tab.click();if(view==='accountPage')renderAccount();document.querySelectorAll('[data-page]').forEach(x=>x.classList.toggle('active',x.dataset.page===view));$('appWorkspace').scrollIntoView({behavior:'smooth',block:'start'}); } $('menuToggle')?.addEventListener('click',()=>{const header=$('top');const open=header.classList.toggle('nav-open');$('menuToggle').setAttribute('aria-expanded',String(open));$('menuToggle').setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});document.querySelectorAll('#primaryNav [data-page]').forEach(b=>b.addEventListener('click',()=>{$('top')?.classList.remove('nav-open');$('menuToggle')?.setAttribute('aria-expanded','false')}));$('headerSearchForm')?.addEventListener('submit',e=>{e.preventDefault();const q=$('headerSearchInput').value.trim();openWorkspace('analyse');if(q){$('model').value=q;$('aiStatus').textContent='Modelo preenchido. Adiciona uma fotografia e carrega em “Identificar carro” para confirmar os detalhes.'}else{$('aiStatus').textContent='Escreve o nome do modelo ou adiciona uma fotografia para começar.'}$('model').focus()});$('heroAnalyse')?.addEventListener('click',()=>{const q=$('heroSearch').value.trim();openWorkspace('analyse');if(q){$('model').value=q;$('aiStatus').textContent='Modelo preenchido. Adiciona uma fotografia e carrega em “Identificar carro” para confirmar os detalhes.';$('model').focus()}else{$('aiStatus').textContent='Escreve o nome do modelo ou adiciona uma fotografia para começar.';$('model').focus()}$('heroSearchFeedback').textContent=q?'Modelo enviado para a área de análise.':'Abri a análise — escreve um modelo ou escolhe uma fotografia.'});$('heroCamera')?.addEventListener('click',()=>{const p=document.querySelector('[data-photo="0"]');if(!p){$('heroSearchFeedback').textContent='Não foi possível abrir a seleção de fotografias.';return}openWorkspace('analyse');const label=p.closest('label');if(label)label.click();else p.click();$('heroSearchFeedback').textContent='Escolhe uma fotografia da frente, verso ou detalhe do modelo.'});$('heroSearch')?.addEventListener('keydown',e=>{if(e.key==='Enter')$('heroAnalyse').click()});$('heroCollection')?.addEventListener('click',()=>openWorkspace('collection'));$('footerHome')?.addEventListener('click',e=>{e.preventDefault();showHome()});document.querySelectorAll('[data-page]').forEach(b=>{if(b.id==='heroCollection')return;b.onclick=()=>{const page=b.dataset.page;if(page==='home')showHome();else if(page==='analyse'||page==='collection'||page==='watch')openWorkspace(page);else{showHome();const target=page==='about'?'aboutSection':'guidesSection';document.getElementById(target).scrollIntoView({behavior:'smooth'});}}});document.getElementById('themeToggle')?.addEventListener('click',()=>{document.body.classList.toggle('theme-light');const light=document.body.classList.contains('theme-light');$('themeToggle').textContent=light?'☀':'☾'});
if(sb){
  sb.auth.getSession().then(async({data})=>{
    user=data.session?.user||null;
    const legacyUser=!!user&&!user.is_anonymous;
    if(legacyUser){
      const {data:allowed,error:permissionError}=await sb.rpc('is_catalog_image_admin');
      adminSession=!permissionError&&allowed===true;
      if(adminSession){
        await load();
        window.dispatchEvent(new Event('hwpc:auth-updated'));
      }else{
        await load();
        await sb.auth.signOut();
        user=null;
      }
    }
    if(!user)await ensureAnonymousSession();
    if(!legacyUser)await load();
  }).catch(error=>{
    console.warn('Sessão técnica indisponível:',error);
    user=null;
    $('appNotice').textContent='As ferramentas de pesquisa estão temporariamente indisponíveis. A coleção local continua acessível neste dispositivo.';
    load();
  });
}else{
  user=null;
  $('appNotice').textContent='As ferramentas de pesquisa estão temporariamente indisponíveis. A coleção local continua acessível neste dispositivo.';
  load();
}
document.querySelectorAll('[data-photo]').forEach(i=>i.addEventListener('change',()=>{const f=i.files[0];if(!f)return;const idx=+i.dataset.photo;if(photoPreviewUrls[idx])URL.revokeObjectURL(photoPreviewUrls[idx]);const url=URL.createObjectURL(f);photoPreviewUrls[idx]=url;photos[idx]='';photoFiles[idx]=f;const l=i.parentElement;l.textContent='';const img=document.createElement('img');img.src=url;img.alt=['Fotografia da frente','Fotografia do verso','Fotografia de detalhe'][idx]||'Fotografia Hot Wheels';l.append(img);l.append(i);$('aiStatus').textContent=tr('Fotografia carregada. Já podes identificar o carro com esta foto; as outras vistas são opcionais.');}));
$('addWatch')?.addEventListener('click',async()=>{const name=$('wanted').value.trim();if(!name)return;db.watch.unshift({id:crypto.randomUUID(),name,max:+$('limit').value||0,date:new Date().toISOString()});$('wanted').value='';$('limit').value='';await save();render()});

async function callFunction(name,body){
  if(!sb)throw new Error('O serviço de análise não carregou. Atualiza a página e tenta novamente.');let {data:{session}}=await sb.auth.getSession();
  if(!session){
    const ok=await ensureAnonymousSession();
    if(!ok)throw new Error('Não foi possível iniciar a sessão técnica anónima. As pesquisas ficam temporariamente indisponíveis.');
    ({data:{session}}=await sb.auth.getSession());
  }
  const {data,error}=await sb.functions.invoke(name,{body});
  if(error){
    let payload=null;
    try{if(error.context&&typeof error.context.json==='function')payload=await error.context.json()}catch(e){}
    if(payload?.quota)updateQuota(payload.quota);
    if(payload?.error==='quota_exceeded'){
      status(payload.message||'Atingiste o limite diário de pesquisas gratuitas. Volta amanhã para continuar.');
      throw new Error(payload.message||'Limite de pesquisas atingido.');
    }
    if(payload?.message)throw new Error(payload.message);
    throw error;
  }
  if(data?.quota)updateQuota(data.quota);
  if(data?.error)throw new Error(data.message||data.error);
  return data
}
function makeCollectionAnalysisItem(analysis,soldOut){
 const model=String($('model').value||'').trim();
 if(!model)throw new Error('Confirma primeiro o nome do modelo.');
 const readEuro=id=>{const raw=String($(id)?.value??'').trim().replace(',','.');const value=Number(raw);return raw&&Number.isFinite(value)&&value>0?Math.round(value*100)/100:0};
 const stats=soldOut?.stats||{};
 const currency=String(stats.currency||'').trim().toUpperCase();
 const median=Number(stats.median),p25=Number(stats.p25),p75=Number(stats.p75);
 const hasMarketEvidence=Number.isFinite(median)&&median>0&&/^[A-Z]{3}$/.test(currency);
 const eurRange=hasMarketEvidence&&currency==='EUR';
 const confidence=Number(analysis?.confidence);
 const marketEvidence=hasMarketEvidence?{
  source:String(soldOut?.provider||'eBay · vendas concluídas'),
  currency,median:Math.round(median*100)/100,
  p25:Number.isFinite(p25)&&p25>0?Math.round(p25*100)/100:null,
  p75:Number.isFinite(p75)&&p75>0?Math.round(p75*100)/100:null,
  salesCount:Math.max(0,Number(soldOut?.count??soldOut?.items?.length??0)||0),
  capturedAt:new Date().toISOString()
 }:null;
 return {
  id:crypto.randomUUID(),
  model,
  year:String($('year').value||'').trim(),
  ask:readEuro('purchasePrice'),
  shipping:readEuro('purchaseShipping'),
  min:eurRange?(Number.isFinite(p25)&&p25>0?Math.round(p25*100)/100:Math.round(median*100)/100):0,
  max:eurRange&&Number.isFinite(p75)&&p75>0?Math.round(p75*100)/100:0,
  decision:'check',
  classification:String($('type').value||'unknown'),
  condition:String($('condition').value||''),
  th_sth_status:String(analysis?.th_sth_status||$('certainty')?.value||'inconclusive'),
  confidence:Number.isFinite(confidence)?confidence:null,
  analysisNotes:String(analysis?.notes||'').slice(0,1800),
  visibleEvidence:Array.isArray(analysis?.visible_evidence)?analysis.visible_evidence.map(x=>String(x).slice(0,300)).slice(0,20):[],
  marketEvidence,
  source:'photo-identification',
  createdAt:new Date().toISOString()
 };
}
function appendSaveAnalysisButton(analysis,soldOut){
 const host=$('aiResult');if(!host||!analysis?.model)return;
 host.querySelector('.save-analysis-actions')?.remove();
 const wrap=document.createElement('div');wrap.className='save-analysis-actions';
 const note=document.createElement('p');note.className='note';note.textContent='Guarda a ficha e os dados de mercado. As fotografias usadas na identificação não são guardadas.';
 const button=document.createElement('button');button.type='button';button.className='btn primary';button.id='saveAnalysisToCollection';button.textContent=tr('saveAnalysis');
 button.addEventListener('click',async()=>{
  
  let item;
  try{item=makeCollectionAnalysisItem(analysis,soldOut)}catch(error){status(error.message);return}
  db.items=db.items||[];db.items.unshift(item);button.disabled=true;button.textContent='A guardar…';
  const persisted=await save();
  if(!persisted){
   db.items=db.items.filter(x=>x.id!==item.id);
   button.disabled=false;button.textContent=tr('saveAnalysis');
   return;
  }
  render();button.textContent=tr('analysisSaved');
  note.textContent='Guardado. Só ficaram na coleção os dados do modelo e da avaliação; nenhuma fotografia foi armazenada.';
 });
 wrap.append(button);host.append(note,wrap);
}
function fileData(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>{const original=reader.result;const image=new Image();image.onload=()=>{const maxSide=1400,scale=Math.min(1,maxSide/Math.max(image.width,image.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.width*scale));canvas.height=Math.max(1,Math.round(image.height*scale));const context=canvas.getContext('2d');if(!context){resolve({data:original});return}context.drawImage(image,0,0,canvas.width,canvas.height);canvas.toBlob(blob=>{if(!blob){resolve({data:original});return}const output=new FileReader();output.onload=()=>resolve({data:output.result});output.onerror=reject;output.readAsDataURL(blob)},'image/jpeg',0.78)};image.onerror=()=>resolve({data:original});image.src=original};reader.onerror=reject;reader.readAsDataURL(file)})}
$('identify')?.addEventListener('click',async()=>{const files=photoFiles.filter(Boolean);if(!files.length)return alert('Tira ou escolhe pelo menos uma fotografia.');$('aiStatus').textContent='A identificar o modelo pelas fotografias…';try{const imgs=await Promise.all(files.map(fileData));const out=await callFunction('hw-identify',{images:imgs});const a=out.analysis||{};$('aiStatus').textContent='Análise concluída · ';if(a.model)$('model').value=a.model;if(a.year)$('year').value=[a.year,a.series,a.number,a.reference_code].filter(Boolean).join(' · ');if(a.classification&&['mainline','th','sth','premium'].includes(a.classification))$('type').value=a.classification;if(a.th_sth_status&&$('certainty'))$('certainty').value=a.th_sth_status;$('aiResult').innerHTML='<div class="card"><b>'+safe(a.model||'Identificação inconclusiva')+'</b><p class="muted">'+safe(a.notes||'')+'</p><p class="note">Classificação: '+safe(a.classification||'unknown')+' · TH/STH: '+safe(a.th_sth_status||'inconclusive')+' · Confiança: '+safe(a.confidence??'—')+'%</p><p>'+safe((a.visible_evidence||[]).join(' · '))+'</p><p class="note">Fotos adicionais: '+safe((a.missing_photos||[]).join(', ')||'Não indicadas')+'</p></div>';if(a.model){const query=$('model').value.trim();$('aiStatus').textContent='Identificação concluída · a pesquisar vendas reais no eBay…';$('aiResult').insertAdjacentHTML('beforeend','<p class="note sold-auto-status">'+soldTr('autoCredit')+'</p>');let soldOut=null,marketOut=null,soldError=null,marketError=null;try{soldOut=await callFunction('hw-sold-comps',{query,site:$('soldSite').value,limit:30});renderSoldHistory(soldOut,'aiResult')}catch(error){soldError=error;console.warn('SoldComps indisponível; a pesquisa alternativa continua:',error)}$('aiStatus').textContent='A pesquisar vendas concluídas e anúncios no eBay, Vinted e Depop…';try{marketOut=await callFunction('hw-marketplace-search',{query,variant:$('year').value.trim()});renderMarketplaceSearch(marketOut,'aiResult')}catch(error){marketError=error;console.warn('Pesquisa Soldgraph indisponível:',error)}try{const historyOut=await callFunction('hw-marketplace-search',{action:'history',query,variant:$('year').value.trim()});renderModelPriceHistory(historyOut,'aiResult')}catch(historyError){console.warn('Histórico de valorização indisponível:',historyError)}if(soldError||marketError){$('aiResult').insertAdjacentHTML('beforeend','<div class="card sold-history-card"><b>Dados parciais</b><p class="note">'+safe([soldError?'SoldComps: '+soldError.message:'',marketError?'Soldgraph: '+marketError.message:''].filter(Boolean).join(' · '))+'</p><p class="note">A estimativa pode estar incompleta porque uma fonte não respondeu.</p></div>')}if(!soldOut&&(!marketOut||!Array.isArray(marketOut.sold)||marketOut.sold.length===0)){$('aiResult').insertAdjacentHTML('beforeend','<div class="card sold-history-card"><b>'+soldTr('unavailable')+'</b><p class="muted">'+safe(soldError?.message||marketError?.message||'Não foram devolvidas vendas concluídas por nenhuma das fontes.')+'</p></div>')}const q=soldOut?.quota||marketOut?.quota||{};$('aiStatus').textContent=(soldOut||marketOut?'Identificação e pesquisa concluídas':'Identificação concluída · não foi possível obter vendas nesta tentativa')+(Number.isFinite(q.remaining)?' · '+q.remaining+' pesquisas restantes':'');appendSaveAnalysisButton(a,soldOut);}}catch(e){$('aiStatus').textContent='Falha na análise: '+e.message}});

let lastSoldOut=null;
const SOLD_I18N={
pt:{title:'HISTÓRICO DE VENDAS · EBAY',median:'Mediana',central:'Intervalo central',found:'Vendas encontradas',currency:'Moeda',excluded:'Excluídas',credits:'Pesquisas utilizadas',trend:'Evolução dos preços vendidos',high:'Mais alto',low:'Mais baixo',sales:'Ver vendas individuais',empty:'Ainda não há vendas com preço e data suficientes para desenhar o histórico.',loading:'A procurar vendas concluídas reais no eBay…',unavailable:'Pesquisa indisponível',market:'Mercado eBay',autoCredit:'A pesquisa automática utiliza 1 pesquisa disponível.'},
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
function marketplaceSearchLinks(query){
 const q=encodeURIComponent(String(query||'').trim());
 const links=[
  ['eBay UK','https://www.ebay.co.uk/sch/i.html?_nkw='+q],
  ['Vinted Portugal','https://www.vinted.pt/catalog?search_text='+q],
  ['OLX Portugal','https://www.olx.pt/ads/q-'+q+'/'],
  ['Wallapop','https://www.wallapop.com/app/search?keywords='+q],
  ['Facebook Marketplace','https://www.facebook.com/marketplace/search/?query='+q],
  ['Catawiki','https://www.catawiki.com/en/s?q='+q],
  ['Etsy','https://www.etsy.com/search?q='+q],
  ['Mercari','https://www.mercari.com/search/?keyword='+q],
  ['Whatnot','https://www.whatnot.com/search?query='+q],
  ['Leboncoin','https://www.leboncoin.fr/recherche?text='+q],
  ['Subito','https://www.subito.it/annunci-italia/vendita/usato/?q='+q]
 ];
 return '<div class="marketplace-searches"><div class="sold-chart-title">Procurar anúncios activos noutros marketplaces</div><p class="note">Abre a pesquisa do modelo em cada plataforma. Estes são preços pedidos pelos vendedores, não vendas concluídas.</p><div class="marketplace-search-links">'+links.map(([name,url])=>'<a href="'+safe(url)+'" target="_blank" rel="noopener noreferrer">'+safe(name)+' ↗</a>').join('')+'</div></div>';
}
function renderSoldHistory(out,target='aiResult'){
 lastSoldOut=out;
 const stats=out.stats||{},rows=Array.isArray(out.items)?out.items:[],currency=stats.currency||'EUR';
 const points=rows.map((x,i)=>({x,s:Number(x.sold_price?.value),d:Date.parse(x.sold_at),i})).filter(p=>Number.isFinite(p.s)&&p.s>0&&Number.isFinite(p.d)).sort((a,b)=>a.d-b.d);
 const values=rows.map(x=>Number(x.sold_price?.value)).filter(v=>Number.isFinite(v)&&v>0),count=Number(out.count??stats.count??values.length)||values.length;
 const min=values.length?Math.min(...values):Number(stats.min??stats.low),max=values.length?Math.max(...values):Number(stats.max??stats.high);
 const siteLabel=({EBAY_US:'eBay US',EBAY_GB:'eBay UK',EBAY_DE:'eBay DE'}[out.site]||out.source||'eBay');
 const captured=out.captured_at?new Date(out.captured_at).toLocaleString('pt-PT'):'data não disponibilizada';
 let chart='';
 if(points.length>=2){
  const w=720,h=190,pad=28,span=max-min||1;
  const coords=points.map((p,i)=>({x:pad+i*(w-2*pad)/(points.length-1),y:h-pad-(p.s-min)/span*(h-2*pad),p}));
  const path=coords.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ');
  const circles=coords.map(p=>'<circle cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="4" fill="#ffd629"><title>'+safe(p.p.x.sold_at)+' · '+soldMoney(p.p.s,currency)+'</title></circle>').join('');
  chart='<div class="sold-chart-wrap"><svg class="sold-chart" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Histórico de vendas concluídas"><path d="M'+pad+' '+(h-pad)+' H'+(w-pad)+'" stroke="#49617d" fill="none"/><path d="'+path+'" fill="none" stroke="#ff6a24" stroke-width="3"/>'+circles+'</svg></div>';
 }else chart='<p class="note sold-empty">Não existem vendas datadas suficientes para desenhar o histórico.</p>';
 const items=rows.slice(0,30).map(x=>{const raw=String(x.url||x.link||''),url=raw.startsWith('https://')?raw:'';return '<div class="item"><div class="grow"><b>'+safe(x.title)+'</b><br><small>'+safe(x.sold_at||'Data não indicada')+' · '+safe(x.condition||'')+' · '+safe((x.flags||[]).join(', '))+'</small></div><b>'+soldMoney(x.sold_price?.value,currency)+'</b>'+(url?'<a href="'+safe(url)+'" target="_blank" rel="noopener noreferrer">Ver venda ↗</a>':'<span class="note">Link indisponível</span>')+'</div>'}).join('');
 const host=$(target);if(!host)return;host.querySelector('.sold-history-card')?.remove();
 const range=values.length?soldMoney(min,currency)+' – '+soldMoney(max,currency):'Sem amostra válida';
 const summary='<div class="stats sold-summary"><div class="stat"><small>Mediana de preços reportados</small><strong>'+soldMoney(stats.median,currency)+'</strong></div><div class="stat"><small>Mínimo – máximo</small><strong>'+range+'</strong></div><div class="stat"><small>Vendas usadas</small><strong>'+count+'</strong></div></div>';
 const provenance='<p class="note">Baseado em '+count+' vendas concluídas no '+safe(siteLabel)+', últimos '+safe(out.window_days||90)+' dias. Consulta: '+safe(captured)+(out.cached?' · resultado em cache':'')+'.</p><p class="note">Correspondência ainda baseada no texto da pesquisa: confirma manualmente casting, variante (Mainline/TH/STH) e condição antes de considerar esta estimativa definitiva.</p>';
 const warning=count<5?'<p class="note" role="status">⚠ Amostra reduzida: menos de 5 vendas. Esta estimativa é frágil; confirma os comparáveis individualmente.</p>':'';
 const foot='<p class="note">Moeda: '+safe(currency)+' · Registos excluídos: '+safe(stats.excluded??'—')+' · Fonte: SoldComps. Os anúncios activos não entram neste cálculo.</p>';
 host.insertAdjacentHTML('beforeend','<div class="card sold-history-card"><div class="eyebrow">'+soldTr('title')+'</div>'+provenance+summary+warning+'<div class="sold-chart-title">Vendas concluídas ao longo do período</div>'+chart+foot+'<details class="sold-list"><summary>Ver vendas individuais e confirmar a amostra</summary>'+items+'</details></div>');
}
function marketplacePrice(row){
 const price=row.displayed_price;
 if(price&&typeof price==='object'&&price.amount!=null)return soldMoney(price.amount,price.currency||'EUR');
 return safe(row.displayed_price_text||row.price_text||row.price||'Preço indisponível');
}
function renderModelPriceHistory(out,target='aiResult'){
 const host=$(target);if(!host)return;
 host.querySelector('.model-price-history-card')?.remove();
 const rows=Array.isArray(out.history)?out.history:[];
 const card=document.createElement('div');card.className='card model-price-history-card';
 if(!rows.length){card.innerHTML='<div class="eyebrow">VALORIZAÇÃO HISTÓRICA</div><p class="note">Ainda não há histórico guardado para esta referência. A partir das pesquisas com vendas concluídas, cada nova observação fica registada.</p>';host.append(card);return;}
 const points=rows.map(x=>({d:Date.parse(x.captured_at),v:Number(x.median_price),x})).filter(x=>Number.isFinite(x.d)&&Number.isFinite(x.v)).sort((a,b)=>a.d-b.d);
 const vals=points.map(x=>x.v),min=Math.min(...vals),max=Math.max(...vals),span=max-min||1;
 const w=720,h=210,pad=34;
 const coords=points.map((p,i)=>({x:points.length===1?w/2:pad+i*(w-2*pad)/(points.length-1),y:h-pad-(p.v-min)/span*(h-2*pad),p}));
 const path=coords.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ');
 const dots=coords.map(p=>'<circle cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="4" fill="#ffd629"><title>'+new Date(p.p.d).toLocaleString('pt-PT')+' · '+soldMoney(p.p.v,p.p.x.currency)+' · '+p.p.x.sales_count+' vendas</title></circle>').join('');
 const first=new Date(points[0].d).toLocaleDateString('pt-PT',{month:'short',year:'numeric'}),last=new Date(points.at(-1).d).toLocaleDateString('pt-PT',{month:'short',year:'numeric'});
 const latest=points.at(-1).p.x;
 card.innerHTML='<div class="eyebrow">VALORIZAÇÃO HISTÓRICA · '+points.length+' PESQUISAS</div><p class="note">Mediana das vendas concluídas por pesquisa. Os anúncios activos não entram neste gráfico.</p><div class="stats sold-summary"><div class="stat"><small>Mediana mais recente</small><strong>'+soldMoney(latest.median_price,latest.currency)+'</strong></div><div class="stat"><small>Vendas na última amostra</small><strong>'+safe(latest.sales_count)+'</strong></div><div class="stat"><small>Intervalo central</small><strong>'+soldMoney(latest.p25_price,latest.currency)+'–'+soldMoney(latest.p75_price,latest.currency)+'</strong></div></div><div class="sold-chart-wrap"><div class="sold-chart-meta"><span>Mínimo: <b>'+soldMoney(min,latest.currency)+'</b></span><span>Máximo: <b>'+soldMoney(max,latest.currency)+'</b></span></div><svg class="sold-chart" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Evolução histórica da mediana de vendas"><path d="M'+pad+' '+(h-pad)+' H'+(w-pad)+'" stroke="#49617d" fill="none"/><path d="'+path+'" stroke="#ff6a24" stroke-width="3" fill="none" stroke-linecap="round"/>'+dots+'</svg><div class="sold-chart-dates"><span>'+safe(first)+'</span><span>'+safe(last)+'</span></div></div><p class="note">Histórico guardado desde '+new Date(points[0].d).toLocaleDateString('pt-PT')+'. Cada ponto representa uma pesquisa, não uma venda individual.</p>';
 host.append(card);
}
function renderMarketplaceSearch(out,target='aiResult'){
 const host=$(target);if(!host)return;
 host.querySelector('.marketplace-live-card')?.remove();
 const card=document.createElement('div');card.className='card marketplace-live-card';
 const active=Array.isArray(out.active)?out.active:[],sold=Array.isArray(out.sold)?out.sold:[];
 const amount=row=>{const v=row.sold_price?.value??row.displayed_price?.amount??row.price?.amount??row.price_value??row.displayed_price_text??row.price_text??row.price;const n=typeof v==='number'?v:Number(String(v??'').replace(/[^0-9.,-]/g,'').replace(',','.'));return Number.isFinite(n)&&n>0?n:null};
 const prices=sold.map(amount).filter(v=>v!==null).sort((a,b)=>a-b);
 const median=prices.length?(prices.length%2?prices[(prices.length-1)/2]:(prices[prices.length/2-1]+prices[prices.length/2])/2):null;
 const currency=String(sold.find(x=>x.sold_price?.currency||x.displayed_price?.currency||x.currency)?.sold_price?.currency||sold.find(x=>x.displayed_price?.currency||x.currency)?.displayed_price?.currency||sold.find(x=>x.currency)?.currency||'GBP').toUpperCase();
 const captured=out.captured_at?new Date(out.captured_at).toLocaleString('pt-PT'):'data não disponibilizada';
 const activeSources=(out.sources?.active||[]).join(', ')||'nenhuma fonte activa concluída';
 const soldSources=(out.sources?.sold||[]).join(', ')||'nenhuma fonte de vendas concluída';
 const makeRows=(rows,limit=30)=>rows.slice(0,limit).map(row=>{
  const title=safe(row.title||'Anúncio Hot Wheels'),source=safe(row.source||row.provider||'Marketplace');
  const raw=String(row.link||row.url||''),url=raw.startsWith('https://')?raw:'';
  const image=String(row.image||row.image_url||''),safeImage=image.startsWith('https://')?image:'';
  const date=safe(row.sold_date||row.sold_date_text||row.date||'');
  return '<article class="marketplace-result">'+(safeImage?'<img loading="lazy" src="'+safe(safeImage)+'" alt="">':'')+'<div class="marketplace-result-copy"><strong>'+title+'</strong><small>'+source+(date?' · '+date:'')+'</small></div><b>'+marketplacePrice(row)+'</b>'+(url?'<a href="'+safe(url)+'" target="_blank" rel="noopener noreferrer">Abrir ↗</a>':'<span class="note">Link indisponível</span>')+'</article>';
 }).join('');
 const weak=prices.length<5;
 const stats=prices.length?'<div class="stats sold-summary"><div class="stat"><small>Mediana vendida</small><strong>'+soldMoney(median,currency)+'</strong></div><div class="stat"><small>Mínimo – máximo</small><strong>'+soldMoney(prices[0],currency)+' – '+soldMoney(prices.at(-1),currency)+'</strong></div><div class="stat"><small>Vendas com preço</small><strong>'+prices.length+'</strong></div></div>':'<p class="note">Não há vendas concluídas com preço válido para calcular uma estimativa.</p>';
 card.innerHTML='<div class="eyebrow">PESQUISA MULTIMARKETPLACE · SOLDGRAPH</div>'+
  '<p class="note">Recolha: '+safe(captured)+(out.cached?' · resultado em cache':'')+'. Anúncios activos são preços pedidos; vendas concluídas são transacções observadas. O preço mostrado numa venda pode não reflectir o valor final pago, por exemplo quando houve uma oferta aceite. Nunca juntamos estas categorias no mesmo cálculo. A correspondência do modelo continua a exigir confirmação de casting, variante e estado.</p>'+
  '<div class="sold-chart-title">Resumo das vendas concluídas</div>'+stats+
  (weak&&prices.length?'<p class="note" role="status">⚠ Amostra reduzida: menos de 5 vendas com preço. Estimativa frágil; confirma cada comparável.</p>':'')+
  '<div class="sold-chart-title">Anúncios activos · '+active.length+'</div><p class="note">Fontes que responderam: '+safe(activeSources)+'. Valores pedidos, não valores pagos.</p>'+
  (active.length?'<div class="marketplace-results">'+makeRows(active)+'</div>':'<p class="note">Sem anúncios activos devolvidos nesta pesquisa.</p>')+
  '<div class="sold-chart-title">Vendas concluídas · '+sold.length+'</div><p class="note">Fontes que responderam: '+safe(soldSources)+'.</p>'+
  (sold.length?'<details class="sold-list"><summary>Ver '+sold.length+' vendas usadas e respectivas ligações</summary><div class="marketplace-results">'+makeRows(sold,200)+'</div></details>':'<p class="note">Sem vendas concluídas devolvidas nesta pesquisa.</p>')+
  '<p class="note">'+(out.status==='partial'?'⚠ Dados parciais: uma ou mais fontes falharam ou não terminaram. ':'Estado: todas as fontes responderam. ')+'Créditos Soldgraph: '+safe(out.credits?.charged??0)+'</p>'+
  (out.errors?.length?'<p class="note">Fontes indisponíveis: '+safe(out.errors.join(' · '))+'</p>':'');
 host.append(card);
}
function formatMarketPrice(value,currency){
 try{return new Intl.NumberFormat('pt-PT',{style:'currency',currency:String(currency||'EUR').toUpperCase()}).format(Number(value)||0)}
 catch(_){return (Number(value)||0).toFixed(2)+' '+String(currency||'').toUpperCase()}
}
function render(){
 const items=db.items||[],watch=db.watch||[];
 $('count').textContent=items.length;
 $('invested').textContent=money(items.reduce((a,x)=>a+(+x.ask||0)+(+x.shipping||0),0));
 $('worth').textContent=money(items.reduce((a,x)=>a+(+x.min||0),0));
 const box=$('items');box.innerHTML='';
 const q=$('search').value?.toLowerCase()||'';
 const filtered=items.filter(x=>String(x.model||'').toLowerCase().includes(q));
 if(!filtered.length){box.className='empty';box.textContent=tr('empty')}
 else{
  box.className='';
  filtered.forEach(x=>{
   const row=document.createElement('div');row.className='item';
   const grow=document.createElement('div');grow.className='grow';
   const conditionNames={mint:'Blister impecável',good:'Bom estado',damaged:'Blister danificado',loose:'Sem blister'};
   const market=x.marketEvidence&&Number.isFinite(Number(x.marketEvidence.median))
    ? 'Mediana de vendas: '+formatMarketPrice(x.marketEvidence.median,x.marketEvidence.currency)+' · '+(Number(x.marketEvidence.salesCount)||0)+' vendas'
    : 'Valor estimado: '+money(x.min||0);
   const meta=[x.year||'',x.classification||'',conditionNames[x.condition]||x.condition||''].filter(Boolean).join(' · ');
   grow.innerHTML='<b>'+safe(x.model)+'</b><br><small>'+safe(meta)+'</small><br><small>Custo: '+money((+x.ask||0)+(+x.shipping||0))+' · '+safe(market)+'</small>';
   const badge=document.createElement('span');badge.className='note';badge.textContent=tr(x.decision||'check');
   const del=document.createElement('button');del.className='btn red';del.textContent='×';del.setAttribute('aria-label','Remover '+String(x.model||'modelo'));
   del.onclick=async()=>{db.items=db.items.filter(y=>y.id!==x.id);await save();render()};
   row.append(grow,badge,del);box.append(row);
  });
 }
 const wb=$('watchItems');wb.innerHTML='';
 if(!watch.length){wb.className='empty';wb.textContent=tr('watchEmpty')}
 else{
  wb.className='';
  watch.forEach(x=>{
   const row=document.createElement('div');row.className='item';
   const grow=document.createElement('div');grow.className='grow';grow.textContent=x.name+' · até '+money(x.max);
   const del=document.createElement('button');del.className='btn red';del.textContent='×';del.setAttribute('aria-label','Remover '+String(x.name||'modelo'));
   del.onclick=async()=>{db.watch=db.watch.filter(y=>y.id!==x.id);await save();render()};
   row.append(grow,del);wb.append(row);
  });
 }
}
function safe(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

const ACCOUNT_I18N={
  pt:{myAccount:'A Minha Conta',premiumActive:'Subscrição Premium anterior',renewalCancelled:d=>'A renovação foi cancelada. Manténs o acesso até '+d+'.',manage:'⚙ Gerir subscrição anterior'},
  en:{myAccount:'My Account',premiumActive:'Previous Premium subscription',renewalCancelled:d=>'Renewal cancelled. You keep access until '+d+'.',manage:'⚙ Manage previous subscription'},
  es:{myAccount:'Mi cuenta',premiumActive:'Suscripción Premium anterior',renewalCancelled:d=>'La renovación se ha cancelado. Mantienes el acceso hasta el '+d+'.',manage:'⚙ Gestionar suscripción anterior'},
  fr:{myAccount:'Mon compte',premiumActive:'Ancien abonnement Premium',renewalCancelled:d=>'Le renouvellement est annulé. Tu conserves l’accès jusqu’au '+d+'.',manage:'⚙ Gérer l’ancien abonnement'},
  de:{myAccount:'Mein Konto',premiumActive:'Früheres Premium-Abonnement',renewalCancelled:d=>'Die Verlängerung wurde gekündigt. Du behältst den Zugang bis '+d+'.',manage:'⚙ Früheres Abonnement verwalten'},
  it:{myAccount:'Il mio account',premiumActive:'Abbonamento Premium precedente',renewalCancelled:d=>'Il rinnovo è stato annullato. Mantieni l’accesso fino al '+d+'.',manage:'⚙ Gestisci abbonamento precedente'},
  nl:{myAccount:'Mijn account',premiumActive:'Eerder Premium-abonnement',renewalCancelled:d=>'De verlenging is geannuleerd. Je behoudt toegang tot '+d+'.',manage:'⚙ Eerder abonnement beheren'},
  br:{myAccount:'Minha conta',premiumActive:'Assinatura Premium anterior',renewalCancelled:d=>'A renovação foi cancelada. Você mantém o acesso até '+d+'.',manage:'⚙ Gerenciar assinatura anterior'}
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
    $('language').value=lang;
  }
  if(prefs.appearance==='light'||prefs.appearance==='dark'){
    const light=prefs.appearance==='light';
    document.body.classList.toggle('theme-light',light);
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
function renderAccount(){}
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
});
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
});
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
});
$('accountPreferencesSave')?.addEventListener('click',async()=>{
  if(!user||user.is_anonymous)return accountNotice('Inicia sessão com uma conta para guardar preferências.','error');
  const button=$('accountPreferencesSave'),newLang=$('accountLanguage').value,appearance=$('accountAppearance').value;
  button.disabled=true;button.textContent='A guardar…';
  lang=newLang;$('language').value=lang;
  document.body.classList.toggle('theme-light',appearance==='light');
  const themeToggle=$('themeToggle');if(themeToggle)themeToggle.textContent=appearance==='light'?'☀':'☾';
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
});
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
  if(action!=='portal')return accountNotice('Não são aceites novos pagamentos. O Premium é atribuído separadamente.','error');
  if(!sb||!user||user.is_anonymous)return accountNotice('Inicia sessão com uma conta registada para gerir a subscrição anterior.','error');
  const button=$('premiumManageBtn');
  const originalText=button.textContent;
  button.disabled=true;
  button.textContent='A abrir gestão da subscrição…';
  try{
    const {data,error}=await sb.functions.invoke('hw-billing',{body:{action}});
    if(error){
      let message=error.message||'Não foi possível contactar o serviço de faturação.';
      try{const detail=await error.context?.json();if(detail?.message)message=detail.message;}catch(e){}
      throw new Error(message);
    }
    if(data?.error)throw new Error(data.message||'Não foi possível processar o pedido.');
    if(action==='portal'){
      if(!data?.url)throw new Error('Não foi possível abrir a gestão da subscrição anterior.');
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
    accountNotice('As novas compras Premium estão desativadas. Se tens uma subscrição anterior, gere-a na tua conta.','error');
    window.setTimeout(()=>refreshAccountPlan(),1200);
  }else if(result==='cancelled'){
    accountNotice('O pagamento foi cancelado. Não foi criada nenhuma subscrição.','error');
  }
}
$('accountLogout')?.addEventListener('click',async()=>{if(confirm('Queres terminar a sessão do HW Price Check neste dispositivo?'))await accountSignOut()});
$('accountSecurityLogout')?.addEventListener('click',async()=>{if(confirm('Queres terminar a sessão do HW Price Check neste dispositivo?'))await accountSignOut()});
$('search')?.addEventListener('input',render);
$('export')?.addEventListener('click',()=>{const rows=[['Modelo','Ano','Classificação','Estado','Preço de compra (€)','Portes pagos (€)','Valor mínimo estimado (€)','Mediana de vendas','Moeda','N.º de vendas','Decisão'],...db.items.map(x=>[x.model,x.year,x.classification,x.condition,x.ask,x.shipping,x.min,x.marketEvidence?.median,x.marketEvidence?.currency,x.marketEvidence?.salesCount,x.decision])];const csv=rows.map(r=>r.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(';')).join('\n');const a=document.createElement('a');a.href=window.URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv'}));a.download='hw-price-check.csv';a.click()});



window.HWPC_MAIN_READY=true;translate();if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
