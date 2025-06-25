# Desafio Pós-Graduação Docker - FIAP Frontend Engineer

## 📋 Descrição do Projeto

Este projeto foi desenvolvido como parte do desafio da pós-graduação em Frontend Engineer da FIAP. A aplicação demonstra uma arquitetura completa de três camadas utilizando Docker e Docker Compose para orquestração de containers.

## 🏗️ Arquitetura da Aplicação

A aplicação é composta por três componentes principais:

- **Banco de Dados**: PostgreSQL para persistência de dados
- **API Backend**: Node.js/Express para lógica de negócio e endpoints REST
- **Frontend Web**: React com TypeScript e Vite para interface do usuário

Todos os componentes se comunicam através de uma rede Docker personalizada, garantindo isolamento e segurança.

## 🛠️ Tecnologias Utilizadas

- **Docker & Docker Compose**: Containerização e orquestração
- **PostgreSQL**: Sistema de gerenciamento de banco de dados
- **Node.js/Express**: Runtime e framework para o backend
- **React com TypeScript**: Framework frontend com tipagem estática
- **Vite**: Build tool e dev server para o frontend
- **CORS**: Middleware para controle de acesso entre origens
- **ESLint**: Linter para qualidade de código
- **pg**: Driver PostgreSQL para Node.js

## 📁 Estrutura do Projeto

```
Desafio-Pos-Docker/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       └── index.js
├── frontend/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── eslint.config.js
│   ├── index.html
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── global.css
│       └── vite-env.d.ts
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos

- Docker instalado (versão 20.0 ou superior)
- Docker Compose instalado (versão 1.27 ou superior)

### Executando a aplicação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd Desafio-Pos-Docker
```

2. Execute o comando para subir todos os serviços:

```bash
docker compose up -d
```

3. Aguarde todos os containers estarem prontos. Você pode acompanhar os logs:

```bash
docker compose logs -f
```

4. Acesse a aplicação:
   - Frontend: http://localhost:5174
   - API Backend: http://localhost:3000
   - Banco de dados: localhost:5432 (user: admin, password: admin, database: minhaapi)

### Parando a aplicação

```bash
docker compose down
```

Para remover também os volumes:

```bash
docker compose down -v
```

## 🔄 Comunicação entre Serviços

A aplicação implementa um sistema de dependências que garante:

1. **Aguarda do Banco**: O backend aguarda o PostgreSQL estar completamente inicializado
2. **Healthchecks**: Verificações de saúde para garantir que os serviços estão funcionais
3. **Rede Compartilhada**: Todos os containers utilizam a mesma rede Docker
4. **Variáveis de Ambiente**: Configurações centralizadas no docker-compose.yml

```yaml
# Exemplo de dependência no docker-compose.yml
depends_on:
  database:
    condition: service_healthy
```

## 🧪 Testando a Comunicação

Para verificar se os serviços estão se comunicando corretamente:

1. **Teste da API**:

```bash
curl http://localhost:3000/health
```

2. **Teste da conexão com banco**:

```bash
curl http://localhost:3000/api/users
```

3. **Logs dos containers**:

```bash
docker compose logs backend
docker compose logs frontend
docker compose logs db
```

## 📝 Funcionalidades Implementadas

- ✅ Conexão entre frontend e backend
- ✅ Conexão entre backend e banco de dados
- ✅ Inicialização ordenada dos serviços
- ✅ Healthchecks para todos os serviços
- ✅ Rede isolada para comunicação interna
- ✅ Persistência de dados com volumes
- ✅ Configuração via variáveis de ambiente

## 🔧 Configuração de Desenvolvimento

Para desenvolvimento local, você pode executar apenas serviços específicos:

```bash
# Apenas o banco de dados
docker compose up db

# Backend + Database
docker compose up backend db

# Frontend isolado (para desenvolvimento com hot reload)
docker compose up frontend

# Todos os serviços
docker compose up -d
```

O frontend está configurado com `Dockerfile.dev` que inclui hot reload e volumes para desenvolvimento em tempo real.

## 📚 Recursos de Aprendizado

Este projeto demonstra conceitos importantes de:

- Containerização com Docker
- Orquestração com Docker Compose
- Comunicação entre microserviços
- Gerenciamento de dependências em containers
- Configuração de redes Docker
- Persistência de dados com volumes

## 👨‍🎓 Sobre o Curso

Desenvolvido como parte da pós-graduação em **Frontend Engineer** da **FIAP**, este projeto aplica conceitos de DevOps e containerização essenciais para desenvolvedores frontend modernos.

## 📞 Contato

Para dúvidas sobre a implementação ou sugestões de melhoria, entre em contato através dos canais da FIAP ou crie uma issue neste repositório.
