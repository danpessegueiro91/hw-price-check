# Migração Cloudflare — levantamento verificado

Data do levantamento: 22-11-2026. Este trabalho prepara a migração; ainda não representa uma mudança de produção.

## Inventário live confirmado
- 4 utilizadores Auth; 0 utilizadores anónimos.
- Tabelas públicas: 11. Contagens: catalog_image_admins 1; catalog_images 30; collection_items 0; hw_billing_subscriptions 1; hw_market_refresh_auth 1; hw_model_price_history 21; hw_usage_quota 2; hw_user_entitlements 2; newsletter_subscribers 0; user_data 3; watchlist_items 0.
- Storage: bucket público hw-catalog com 30 JPEG (5 689 568 bytes); bucket privado hw-photos.
- 6 Edge Functions activas: hw-identify, hw-sold-comps, hw-marketplace-search, hw-billing, hw-stripe-webhook e hw-daily-market-refresh.
- 4 funções SQL: consume_hw_usage, get_my_hw_plan, is_catalog_image_admin e register_site_visitor.
- 1 cron activo: refresh diário às 05:30 UTC.
- O frontend usa Supabase Auth, PostgREST, RPC, Storage e Edge Functions em assets/js/app-core.js e assets/js/catalog.js.

## Arquitectura-alvo
Cloudflare Pages (frontend) + Worker (API e autenticação) + D1 (dados). Fotografias fixas do catálogo continuam como assets locais do site. Fotografias privadas dos utilizadores precisam de armazenamento de objectos privado antes de migrar o upload; o D1 só guarda metadados. R2 não foi presumido disponível.

## Regras de segurança e migração
1. Preservar UUIDs existentes como IDs de texto.
2. Não presumir que hashes de password do Supabase são portáveis. Importar as contas com reposição de password obrigatória e verificação de email explícita; nunca copiar passwords.
3. Manter Stripe como fornecedor externo, movendo estado da subscrição e webhook para o Worker; preservar IDs Stripe e ordenação/idempotência dos eventos.
4. Soldgraph, SoldComps, Gemini e fonte FX continuam serviços externos se as funcionalidades correspondentes forem mantidas. Segredos apenas no Worker, nunca no browser.
5. Não alterar, recomprimir ou apagar as imagens locais existentes. Preservar em particular assets/catalog/2026/sth/94-toyota-supra-tooned.jpg.
6. Supabase mantém-se intacto como fonte e rollback até todos os dados, hashes, fluxos e testes de produção estarem validados.
7. Nenhum corte para produção ou eliminação do Supabase nesta fase.

## Fases ainda necessárias
- Provisionar D1 e Worker na conta Cloudflare e validar permissões de deploy.
- Decidir armazenamento privado para uploads e entrega de email transaccional.
- Implementar autenticação, verificação e reset de password; importar as 4 contas com reset obrigatório.
- Migrar as 6 Edge Functions, 4 funções SQL e cron 05:30 UTC.
- Exportar/importar tabelas com contagens e hashes comparados.
- Substituir chamadas Supabase no frontend e remover o SDK/CDN.
- Executar testes unitários, browser, integração, segurança e smoke tests de produção.
- Fazer cutover só depois de todos os testes passarem; manter rollback disponível.

O ficheiro 0001-d1-schema.sql cria a estrutura de destino. Não contém dados reais nem executa qualquer alteração no Supabase.
