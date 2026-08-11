# Plano de Correção: Erro 401 e Mensagem de Falha ao Salvar

O usuário reportou um erro visual onde mensagens de erro "401 (Unauthorized)" e "erro ao salvar" aparecem no site. Isso ocorre quando a sessão do administrador expira mas o frontend tenta realizar operações autenticadas, ou quando o backend retorna erro sem que o frontend trate a expiração do token redirecionando para o login.

## Alterações Técnicas

### 1. Centralização da Tratativa de Erro 401
- Modificar `src/lib/api.ts` para interceptar respostas 401 em todas as funções de API autenticadas.
- Criar uma função auxiliar `handleResponse` que verifica `res.status === 401`.
- Caso seja 401, limpar o token (`clearToken`) e lançar um erro específico de "Sessão expirada".

### 2. Redirecionamento Automático no Frontend
- Atualizar `src/routes/admin.index.tsx` e possivelmente `src/components/AdminSidebar.tsx` ou um hook global para detectar o erro de sessão expirada e redirecionar para `/admin/login`.
- Atualmente, o `AdminSidebar.tsx` ou as páginas individuais de admin não parecem tratar o erro de fetch falho com 401 de forma global.

### 3. Melhoria na Experiência do Usuário
- Em `src/routes/admin.login.tsx`, garantir que se o usuário for redirecionado por expiração, uma mensagem clara seja exibida.
- Corrigir a mensagem "erro ao salvar" para ser um Toast ou alerta amigável em vez de texto bruto injetado na tela (se for o caso de algum componente estar renderizando o erro diretamente no DOM de forma não formatada).

## Detalhes de Implementação
- **api.ts**: Refatorar chamadas de fetch para usar um wrapper que limpa o localStorage se o status for 401.
- **Admin Layout/Sidebar**: Adicionar um listener ou verificação nas mutações de dados para disparar o redirecionamento.
