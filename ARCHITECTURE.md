# HW Price Check — auditoria técnica e plano de reorganização

Data da auditoria: 2026-11-20

## Estado observado na branch principal

A aplicação é um site estático em HTML, CSS e JavaScript vanilla. Não existe necessidade técnica demonstrada para introduzir React, Vue ou um bundler.

### Inventário medido
- `index.html`: cerca de 117 KB, com 25 blocos `<style>` e 6 blocos `<script>` inline, além de carregar os scripts externos.
- `assets/js/app-core.js`: cerca de 79 KB, 704 linhas, 39 funções e 32 registos de eventos.
- `assets/js/catalog.js`: cerca de 37 KB, com dados históricos, preços, URLs de imagens, criação de páginas, renderização, uploads, modais, navegação e eventos no mesmo IIFE.
- `assets/js/i18n.js`: cerca de 66 KB, com dicionários, tradução do DOM, MutationObserver e pedido externo ao MyMemory.
- Os testes Playwright são executados em Chromium, servindo o site com o servidor HTTP do Python.

## Problemas concretos identificados

1. **Responsabilidades misturadas:** o catálogo contém dados, renderização, navegação, permissões Supabase, uploads, modal e visualizador.
2. **Eventos concorrentes:** foram acumulados listeners directos, delegados e handlers associados a elementos que são substituídos com `innerHTML`.
3. **Tradução instável:** o fallback MyMemory faz pedidos externos durante testes e alterações do DOM; os logs registam falhas de rede e podem tornar os testes lentos ou não determinísticos.
4. **HTML demasiado concentrado:** grande parte da apresentação e estrutura está no `index.html`, dificultando localizar regressões e rever alterações.
5. **Cobertura insuficiente:** os testes anteriores não cobriam adequadamente o ciclo abrir → ampliar → fechar → fechar ficha → reabrir, nem isolavam a tradução externa.

## Regras para a reorganização

- Manter HTML/CSS/JavaScript vanilla; sem framework ou build step sem necessidade comprovada.
- Um módulo deve ter uma responsabilidade e uma API explícita.
- Cada interação deve ter um único proprietário de eventos.
- Não associar listeners a nós que são destruídos em cada renderização; usar contentores persistentes ou delegação única.
- A interface principal não pode depender de serviços externos de tradução para funcionar.
- Os testes não podem depender de Internet, Supabase real ou imagens de terceiros; usar respostas controladas e fixtures.
- Nenhuma alteração entra em `main` nem é publicada sem validação completa.

## Separação proposta

1. `assets/js/catalog-data.js`: listas de modelos, metadados e valores; sem DOM, rede ou eventos.
2. `assets/js/catalog-storage.js`: acesso Supabase às fotografias, permissões e upload; sem renderização.
3. `assets/js/photo-viewer.js`: visualizador isolado (zoom, arrastar, roda do rato e fecho).
4. `assets/js/catalog-ui.js`: cartões, filtros e ficha do modelo.
5. `assets/js/navigation.js`: navegação entre páginas, sem reescrever handlers do catálogo.
6. `assets/js/i18n.js`: dicionários locais e tradução determinística; tradução externa deixa de ser requisito da interface.
7. `assets/js/app-core.js`: análise, coleção, lista de procura e conta, com as dependências externas encapsuladas.

## Testes de aceitação obrigatórios

- Abrir a mesma ficha pelo menos 5 vezes, fechando-a entre aberturas.
- Ampliar a fotografia a partir do cartão e da ficha.
- Aumentar/diminuir zoom, repor, arrastar, usar roda do rato e Escape.
- Fechar o visualizador sem fechar indevidamente a ficha.
- Verificar ausência de erros JavaScript não tratados.
- Verificar os 8 idiomas suportados sem pedidos externos.
- Verificar que apenas o administrador vê e consegue usar os controlos de upload.
- Verificar falhas de rede/Supabase sem bloquear a navegação ou o catálogo.
- Verificar desktop e viewport móvel.
- Executar validação de assets, Playwright e CodeQL; só depois permitir deploy de produção.

## Auditoria integral — 2026-11-21

### Repositório e publicação
- A aplicação continua a ser HTML/CSS/JavaScript vanilla, sem bundler.
- Inventário confirmado: 31 ficheiros na main antes da auditoria.
- O deploy Cloudflare do commit 1391249acd2098569e54b3c101d2a66c36e5cf3b terminou com sucesso, mas isso não garantia que os recursos visuais existissem.
- A branch audit/full-project-review e a PR #70 contêm as primeiras correcções; não integrar antes dos testes e da revisão final.

### Catálogo e fotografias
- A tabela public.catalog_images tinha apenas uma linha: 2026 TH — '87 Buick Regal GNX.
- O bucket hw-catalog tinha apenas um objecto correspondente.
- O catálogo de 2026 tem 15 TH e 15 STH. Foram recolhidas e verificadas referências de imagem nas fichas individuais HWtreasure e adicionadas ao mapa IMAGES em assets/js/catalog.js.
- As referências são imagens externas de cartas Hot Wheels; ainda não foram copiadas para o Storage próprio. A biblioteca Supabase continua disponível para substituição/gestão pelo administrador.
- O Service Worker não incluía photo-viewer.js nos recursos essenciais. A branch actualiza a versão da cache e inclui esse módulo.
- Foi acrescentado um teste Playwright para exigir 30 imagens distintas no catálogo de 2026. O primeiro ensaio falhou porque o CI não tem acesso às imagens externas; o teste foi ajustado para simular a resposta de imagem e validar as referências sem depender da Internet.

### Supabase e funções Edge
- O projecto está activo e as cinco Edge Functions estão activas: hw-marketplace-search, hw-sold-comps, hw-identify, hw-billing e hw-stripe-webhook.
- Antes da auditoria, apenas hw-marketplace-search estava versionada no GitHub. As outras quatro fontes foram copiadas das versões actualmente publicadas para supabase/functions/, sem alterar o código em produção.
- hw-marketplace-search no GitHub coincide byte a byte com a versão publicada (versão 3).
- O administrador de fotografias está correctamente associado à conta configurada.
- O Supabase Advisor assinala: catalog_image_admins com RLS sem políticas explícitas; função is_catalog_image_admin() SECURITY DEFINER executável por anon/authenticated; protecção de palavras-passe comprometidas desactivada; e um índice em falta para a FK de catalog_images.created_by. Estes pontos ficam registados para revisão específica; não foram alteradas permissões de produção durante esta fase.

### Dívida técnica e próximos passos
- app-core.js e catalog.js mantêm dados do catálogo em blocos separados: 2024–2026 estão em app-core.js; os anos anteriores estão em catalog.js. A dependência global CATALOG é implícita e deve ser eliminada numa refactorização testada.
- index.html continua a concentrar a maior parte do CSS e estrutura da página.
- navigation.js é carregado depois de app-core.js, mas sai imediatamente porque HWPC_MAIN_READY já está definido; é código redundante.
- O histórico de migrações do Supabase contém 15 entradas, mas o repositório só tem uma migração SQL. É necessário reconciliar e versionar a história de schema antes de novas alterações estruturais.
- Não integrar alterações nem publicar enquanto a validação de assets, os testes Playwright e CodeQL não estiverem concluídos.
