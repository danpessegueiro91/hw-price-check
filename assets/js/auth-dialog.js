
document.addEventListener('click',function(event){
  const target=event.target;
  const closeButton=target&&target.closest?target.closest('#authClose'):null;
  if(!closeButton)return;
  event.preventDefault();
  event.stopPropagation();
  const gate=document.getElementById('authGate');
  if(gate){
    gate.classList.add('hidden');
    gate.setAttribute('aria-hidden','true');
  }
},true);
