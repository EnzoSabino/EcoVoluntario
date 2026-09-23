# 🌿 EcoVoluntário

> Plataforma web de engajamento socioambiental para conexão entre voluntários, empresas e ONGs.

O **EcoVoluntário** é uma Single Page Application (SPA) desenvolvida para facilitar a criação, descoberta e participação em mutirões e ações ecológicas (como plantio de mudas, limpeza de rios e praias, e workshops de reciclagem).

---

## 1 Demonstração & Deploy

A aplicação está configurada para deploy contínuo e pode ser acedida online em:
- **Link do Projeto:** [Insira aqui o link da Vercel]

---

## 2 Funcionalidades Principais

###  Perfil Voluntário (CPF)
- **Cadastro e Autenticação:** Registo com dados pessoais, localização e áreas de interesse.
- **Explorar Mutirões:** Visualização de eventos e ações ambientais disponíveis na região.
- **Inscrição em Ações:** Candidatura direta a eventos com gestão de inscrições no painel do utilizador.

###  Perfil Empresa / ONG (CNPJ)
- **Painel Corporativo (ESG):** Gestão dedicada para organizações socioambientais.
- **Criação de Projetos:** Formulario simplificado para publicação de novos mutirões e iniciativas ecológicas.
- **Gestão de Ações:** Acompanhamento de eventos ativos criados pela organização.

---

## 3 Tecnologias Utilizadas

- **Frontend:** [React.js](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Persistência de Dados:** Client-side via `localStorage` (arquitetura desacoplada e pronta para deploy em nuvem)
- **Alojamento:** [Vercel](https://vercel.com/)
- **Controlo de Versão:** Git / GitHub

---

## 4 Estrutura do Projeto

O repositório está organizado em arquitetura de subpastas para separar as responsabilidades do servidor API e da aplicação Web:

```text
ecovoluntario/
├── ecovoluntario-backend/        # Servidor de API REST (Simulado)
│   ├── db.json                   # Base de dados estruturada (usuários e eventos)
│   └── package.json              # Dependências e scripts do servidor json-server
│
└── ecovoluntario-frontend/       # Aplicação Single Page Application (SPA)
    ├── public/                   # Ficheiros estáticos
    ├── src/
    │   ├── assets/               # Imagens e recursos visuais
    │   ├── components/           # Formularíos e componentes reutilizáveis
    │   ├── pages/                # Dashboards dedicados (Voluntário e Empresa)
    │   ├── services/             # Módulo de persistência e comunicação (api.js)
    │   ├── App.jsx               # Gestão de estados globais, rotas e sessão
    │   ├── main.jsx              # Ponto de entrada do React
    │   └── index.css             # Configurações globais do Tailwind CSS
    ├── .gitignore
    ├── eslint.config.js
    └── package.json              # Dependências do frontend React
