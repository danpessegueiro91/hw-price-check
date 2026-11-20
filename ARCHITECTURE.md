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

## Estado da execução

- Criada a branch isolada `refactor/catalog-architecture` e a PR #69 em modo draft.
- O visualizador de fotografias foi extraído de `catalog.js` para `photo-viewer.js`, com API pública `window.HWPCPhotoViewer`.
- O modal e o contentor persistente da imagem passaram a controlar os seus próprios eventos, evitando listeners em imagens recriadas.
- A PR #68 continua sem integração; não foi publicada qualquer alteração destas tentativas.
- Próxima etapa: confirmar os testes da PR #69 e continuar a separação dos dados e do armazenamento do catálogo.
