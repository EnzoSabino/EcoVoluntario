// Dados iniciais para quando o usuário abrir a aplicação pela primeira vez
const USUARIOS_INICIAIS = [
  {
    id: 1,
    nome: "EcoVoluntário Exemplo",
    email: "voluntario@ecovoluntario.com",
    senha: "123",
    tipoPessoa: "CPF",
    cpf: "000.000.000-00",
    bairro: "Centro",
    interesse: "Reflorestamento"
  },
  {
    id: 2,
    nome: "Empresa Parceira Verde",
    email: "empresa@ecovoluntario.com",
    senha: "123",
    tipoPessoa: "CNPJ",
    categoriaEmpresa: "Comercio",
    bairro: "Asa Sul"
  }
]

const EVENTOS_INICIAIS = [
  {
    id: 1,
    titulo: "Mutirão de Reflorestamento Parque Central",
    descricao: "Plantio de 100 mudas nativas com a comunidade local.",
    data: "2026-10-15",
    data_evento: "2026-10-15",
    local: "Parque Central",
    localizacao: "Parque Central",
    criadorId: 2,
    organizador_id: 2,
    inscritos: []
  }
]

// Inicializa o localStorage se estiver vazio
const inicializarStorage = () => {
  if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify(USUARIOS_INICIAIS))
  }
  if (!localStorage.getItem('eventos')) {
    localStorage.setItem('eventos', JSON.stringify(EVENTOS_INICIAIS))
  }
}

// 👥 USUÁRIOS
export const getUsuarios = () => {
  inicializarStorage()
  return JSON.parse(localStorage.getItem('usuarios')) || []
}

export const salvarUsuario = (novoUsuario) => {
  const usuarios = getUsuarios()
  const usuarioComId = {
    ...novoUsuario,
    id: Date.now() // Gera um ID único numérico baseado no timestamp
  }
  usuarios.push(usuarioComId)
  localStorage.setItem('usuarios', JSON.stringify(usuarios))
  return usuarioComId
}

// 🌱 EVENTOS
export const getEventos = () => {
  inicializarStorage()
  return JSON.parse(localStorage.getItem('eventos')) || []
}

export const salvarEvento = (novoEvento) => {
  const eventos = getEventos()
  const eventoComId = {
    ...novoEvento,
    id: Date.now()
  }
  eventos.push(eventoComId)
  localStorage.setItem('eventos', JSON.stringify(eventos))
  return eventoComId
}