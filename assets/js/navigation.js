
(()=> {
  if(window.HWPC_MAIN_READY)return;
  const $=id=>document.getElementById(id);
  const showPage=view=>{
    $('homePage')?.classList.add('hidden');
    $('appWorkspace')?.classList.remove('hidden');
    document.querySelectorAll('.view').forEach(x=>x.classList.toggle('hidden',x.id!==view));
    document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.view===view));
    document.querySelectorAll('[data-page]').forEach(x=>x.classList.toggle('active',x.dataset.page===view));
    $('appWorkspace')?.scrollIntoView({behavior:'smooth',block:'start'});
  };
  const tell=s=>{const n=$('appNotice');if(n)n.textContent=s;const q=$('heroSearchFeedback');if(q)q.textContent=s;};
  document.querySelectorAll('[data-page]').forEach(b=>{
    if(b.dataset.page==='home')b.addEventListener('click',()=>{ $('appWorkspace')?.classList.add('hidden');$('homePage')?.classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'});});
    else if(['analyse','collection','watch'].includes(b.dataset.page))b.addEventListener('click',()=>showPage(b.dataset.page));
    else b.addEventListener('click',()=>{ $('homePage')?.classList.remove('hidden');$('appWorkspace')?.classList.add('hidden');$('guidesSection')?.scrollIntoView({behavior:'smooth'});});
  });
  $('heroAnalyse')?.addEventListener('click',()=>{
    const q=$('heroSearch')?.value.trim()||'';
    if($('model'))$('model').value=q;
    showPage('analyse');
    if($('aiStatus'))$('aiStatus').textContent=q?'Modelo preenchido. Adiciona fotografias para o identificar.':'Escreve um modelo ou escolhe uma fotografia para começar.';
    tell(q?'Modelo enviado para análise.':'Área de análise aberta.');
  });
  $('heroCamera')?.addEventListener('click',()=>{
    showPage('analyse');
    const p=document.querySelector('[data-photo="0"]');
    if(p)p.click();else tell('Não foi possível encontrar o seletor de fotografias.');
  });
  $('heroSearch')?.addEventListener('keydown',e=>{if(e.key==='Enter')$('heroAnalyse')?.click()});
  $('signupTop')?.addEventListener('click',()=>{if($('authGate'))$('authGate').classList.remove('hidden')});
  $('signupHero')?.addEventListener('click',()=>{if($('authGate'))$('authGate').classList.remove('hidden')});
  $('account')?.addEventListener('click',()=>{if($('authGate'))$('authGate').classList.remove('hidden')});
  $('themeToggle')?.addEventListener('click',()=>document.body.classList.toggle('theme-light'));
  document.querySelectorAll('[data-photo]').forEach(input=>{
    input.addEventListener('change',()=>{
      const file=input.files?.[0];if(!file)return;
      const url=window.URL.createObjectURL(file),label=input.parentElement;
      if(label){label.innerHTML='';const img=document.createElement('img');img.src=url;label.append(img);label.append(input);}
      tell('Fotografia carregada. Podes acrescentar o verso e os detalhes e depois identificar.');
      if($('aiStatus'))$('aiStatus').textContent='Fotografia carregada. Adiciona outras vistas e carrega em “Identificar com Gemini”.';
    });
  });
  tell('Modo de navegação de reserva ativo. Algumas funções de conta podem exigir atualização da página.');
})();
