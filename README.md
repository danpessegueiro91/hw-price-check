# HW Price Check

Aplicação web móvel para análise e gestão de coleção Hot Wheels.

- Oito idiomas: PT-PT, EN, ES, FR, DE, IT, NL e PT-BR.
- Autenticação e sincronização de coleção através do Supabase.
- Lista de procura e gestão de coleção.
- Avaliação de compra com custo total, intervalo de revenda e vendas comparáveis.
- Identificação por IA e pesquisa de vendas concluídas através de funções Supabase, quando estas estão configuradas e operacionais.
- Catálogo histórico Treasure Hunt / Super Treasure Hunt.
- Exportação e gestão de dados, interface adaptada a telemóvel e computador e suporte PWA.

## Critérios de avaliação

A aplicação deve recomendar **COMPRAR** apenas quando existem pelo menos duas vendas comparáveis documentadas, margem conservadora superior a 20% e, para TH/STH, confirmação acompanhada de pelo menos duas fotografias. Os resultados são indicativos e não garantem valorização ou preço de revenda.

## Serviços externos

A autenticação, sincronização, identificação por IA, pesquisa de vendas, quotas e faturação dependem da configuração do projeto Supabase e das respetivas Edge Functions. A newsletter só fica ativa quando o serviço de subscrição estiver configurado.

## Publicação

O workflow `.github/workflows/cloudflare-pages.yml` publica a aplicação em Cloudflare Pages após a validação automática do código.