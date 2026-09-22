import { useState, useEffect } from 'react'
import FormularioVoluntario from './components/FormularioVoluntario'
import Formulario from './components/Formulario'
import ListaParceiros from './components/ListaParceiros'
import FormularioEventos from './components/FormularioEvento'
import ListaEventos from './components/ListaEventos'
import ListaVoluntarios from './components/ListaVoluntarios'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [eventos, setEventos] = useState([])
  
  // Estado dos campos do formulário de login
const [emailLogin, setEmailLogin] = useState('')
const [senhaLogin, setSenhaLogin] = useState('')
const [mensagemErro, setMensagemErro] = useState('')

  //  Sessão do Usuário (null = Deslogado)
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  
  // Controle de Telas: 'landing' | 'auth' | 'dashboard'
  const [telaAtual, setTelaAtual] = useState('landing')
  
  // Estado do Módulo de Autenticação
  const [modoAutenticacao, setModoAutenticacao] = useState('login') // 'login' | 'cadastro'
  const [tipoPessoa, setTipoPessoa] = useState('CPF') // 'CPF' | 'CNPJ'
  
  // Aba Ativa do Dashboard
  const [abaDashboard, setAbaDashboard] = useState('eventos')

  const buscarUsuarios = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/usuarios')
      const dados = await resposta.json()
      setUsuarios(dados)
    } catch (erro) {
      console.error('Erro ao buscar usuários:', erro)
    }
  }

  const buscarEventos = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/eventos')
      const dados = await resposta.json()
      setEventos(dados)
    } catch (erro) {
      console.error('Erro ao buscar eventos:', erro)
    }
  }

  useEffect(() => {
    buscarUsuarios()
    buscarEventos()
  }, [])

  // NAVEGAÇÃO DIRETA PARA CADASTROS
  const irParaCadastroCPF = () => {
    setTipoPessoa('CPF')
    setModoAutenticacao('cadastro')
    setTelaAtual('auth')
  }

  const irParaCadastroCNPJ = () => {
    setTipoPessoa('CNPJ')
    setModoAutenticacao('cadastro')
    setTelaAtual('auth')
  }

  const irParaLogin = () => {
    setModoAutenticacao('login')
    setTelaAtual('auth')
  }

// Login consultando o db.json
const efetuarLogin = async (e) => {
  e.preventDefault()
  setMensagemErro('')

  try {
    const resposta = await fetch('http://localhost:3000/usuarios')
    const listaUsuarios = await resposta.json()

    // Procura o usuário que combine Email, Senha e Tipo de Pessoa (CPF / CNPJ)
    const usuarioEncontrado = listaUsuarios.find(
      (u) => 
        u.email.toLowerCase() === emailLogin.toLowerCase() && 
        u.senha === senhaLogin &&
        u.tipoPessoa === tipoPessoa
    )

    if (usuarioEncontrado) {
      setUsuarioLogado(usuarioEncontrado)
      setTelaAtual('dashboard')
      setEmailLogin('')
      setSenhaLogin('')
    } else {
      setMensagemErro(`Credenciais inválidas para conta ${tipoPessoa}. Verifique o e-mail e senha.`)
    }
  } catch (erro) {
    console.error('Erro ao conectar com a API:', erro)
    setMensagemErro('Servidor indisponível. Verifique se o JSON-Server está rodando na porta 3000.')
  }
}

  const efetuarLogout = () => {
    setUsuarioLogado(null)
    setTelaAtual('landing')
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased font-sans">

      {/* HEADER FIXO */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setTelaAtual('landing')} 
            className="text-2xl font-black text-green-600 tracking-tight cursor-pointer"
          >
            EcoVoluntário
          </button>

          <div className="flex items-center gap-3">
            {usuarioLogado ? (
              <div className="flex items-center gap-3">
                <span className="text-xs bg-green-100 text-green-800 px-3 py-1.5 rounded-full font-bold">
                  {usuarioLogado.tipo === 'CPF' ? 'Voluntário (CPF)' : 'Empresa / ONG (CNPJ)'}
                </span>
                <span className="text-sm font-semibold text-slate-700 hidden sm:inline">
                  {usuarioLogado.nome}
                </span>
                <button 
                  onClick={efetuarLogout}
                  className="text-xs text-red-600 hover:text-red-800 border border-red-200 px-3 py-1.5 rounded-lg font-semibold hover:bg-red-50 transition-all cursor-pointer"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button 
                onClick={irParaLogin}
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Entrar / Cadastrar
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          1. LANDING PAGE
      ───────────────────────────────────────────────────────────── */}
      {telaAtual === 'landing' && (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center py-12 px-6 bg-emerald-900 text-white rounded-3xl shadow-xl mb-12 relative overflow-hidden">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Conectando pessoas e empresas por um futuro sustentável
            </h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto mb-8">
              Plataforma de engajamento ambiental para voluntariado, projetos comunitários e investimento corporativo de impacto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={irParaCadastroCPF}
                className="bg-white text-emerald-900 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-emerald-50 transition-all cursor-pointer"
              >
                Quero ser Voluntário
              </button>
              <button 
                onClick={irParaCadastroCNPJ}
                className="bg-emerald-700 text-white border border-emerald-500 font-bold px-6 py-3.5 rounded-xl hover:bg-emerald-600 transition-all cursor-pointer"
              >
                Sou Empresa / ONG
              </button>
            </div>
          </div>
<div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Para Voluntários</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Encontre projetos e ações na sua região, inscreva-se em mutirões de plantio ou reciclagem, acompanhe suas horas de dedicação e receba certificações de apoio ambiental.
              </p>
              <ul className="text-xs text-slate-500 space-y-2 font-medium">
                <li>• Inscrição simplificada em ações locais</li>
                <li>• Histórico e comprovante de participação</li>
                <li>• Transparência do uso dos recursos</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Para Empresas e ONGs</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Crie projetos de responsabilidade socioambiental, patrocine iniciativas existentes com insumos ou apoio financeiro e fortaleça suas métricas de ESG.
              </p>
              <ul className="text-xs text-slate-500 space-y-2 font-medium">
                <li>• Publicação e moderação de projetos ambientais</li>
                <li>• Canal direto para patrocínio e doações corporativas</li>
                <li>• Painel de controle de transparência e impacto</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. AUTENTICAÇÃO (LOGIN / CADASTRO)
      ───────────────────────────────────────────────────────────── */}
      {telaAtual === 'auth' && (
        <div className="max-w-xl mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
            
            {/* ABAS INFERIORES: ALTERNAR ENTRE LOGIN E CADASTRO */}
            <div className="flex border-b border-slate-200 mb-6">
              <button
                onClick={() => setModoAutenticacao('login')}
                className={`flex-1 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer ${
                  modoAutenticacao === 'login' 
                    ? 'border-green-600 text-green-600' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Já tenho conta (Login)
              </button>
              <button
                onClick={() => setModoAutenticacao('cadastro')}
                className={`flex-1 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer ${
                  modoAutenticacao === 'cadastro' 
                    ? 'border-green-600 text-green-600' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Criar Nova Conta
              </button>
            </div>

            {/* SELETOR DE PERFIL (CPF vs CNPJ) */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Selecione o tipo da conta
              </label>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setTipoPessoa('CPF')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    tipoPessoa === 'CPF' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  Voluntário
                </button>
                <button
                  onClick={() => setTipoPessoa('CNPJ')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    tipoPessoa === 'CNPJ' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  Empresa / ONG
                </button>
              </div>
            </div>

            {/* FORMULÁRIO DINÂMICO */}
            {modoAutenticacao === 'login' ? (
              <form onSubmit={efetuarLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tipoPessoa === 'CPF' ? 'E-mail ou CPF' : 'E-mail corporativo ou CNPJ'}
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder={tipoPessoa === 'CPF' ? '000.000.000-00' : '00.000.000/0001-00'}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Senha</label>
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl transition-all shadow-md cursor-pointer text-sm"
                >
                  Entrar
                </button>
              </form>
            ) : (
              /* EXIBE FORMULÁRIO DE CADASTRO CORRESPONDENTE AO SELETOR */
              tipoPessoa === 'CPF' ? (
                <FormularioVoluntario 
                  aoCadastrarSucesso={() => {
                    buscarUsuarios()
                    setModoAutenticacao('login')
                  }} 
                />
              ) : (
                <Formulario 
                  aoCadastrarSucesso={() => {
                    buscarUsuarios()
                    setModoAutenticacao('login')
                  }} 
                />
              )
            )}

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. DASHBOARD PERSONALIZADO POR TIPO DE USUÁRIO
      ───────────────────────────────────────────────────────────── */}
      {telaAtual === 'dashboard' && usuarioLogado && (
        <div className="max-w-5xl mx-auto px-4 py-8">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800">
                Painel do {usuarioLogado.tipo === 'CPF' ? 'Voluntário' : 'Parceiro Corporativo'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Conectado como <strong className="text-slate-700">{usuarioLogado.email}</strong>
              </p>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl gap-1 w-full md:w-auto overflow-x-auto">
              <button 
                onClick={() => setAbaDashboard('eventos')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  abaDashboard === 'eventos' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-600'
                }`}
              >
                Ações & Eventos
              </button>

              {usuarioLogado.tipo === 'CNPJ' ? (
                <>
                  <button 
                    onClick={() => setAbaDashboard('criar_evento')}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      abaDashboard === 'criar_evento' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    + Criar Ação Corporativa
                  </button>
                  <button 
                    onClick={() => setAbaDashboard('transparencia')}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      abaDashboard === 'transparencia' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Prestação de Contas
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setAbaDashboard('minhas_inscricoes')}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      abaDashboard === 'minhas_inscricoes' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Minhas Inscrições
                  </button>
                  <button 
                    onClick={() => setAbaDashboard('beneficios')}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      abaDashboard === 'beneficios' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Incentivos & Horas
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {abaDashboard === 'eventos' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-slate-800">Eventos Disponíveis para Atuação</h3>
                  <span className="text-xs text-slate-400 font-mono">Total: {eventos.length}</span>
                </div>
                <ListaEventos eventos={eventos} />
              </div>
            )}

            {abaDashboard === 'criar_evento' && usuarioLogado.tipo === 'CNPJ' && (
              <FormularioEventos usuarios={usuarios} aoCriarSucesso={buscarEventos} />
            )}

            {abaDashboard === 'transparencia' && usuarioLogado.tipo === 'CNPJ' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Controle de Transparência e Aportes</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Relatório dos patrocínios e recursos destinados a projetos ambientais comunitários.
                </p>
                <ListaParceiros usuarios={usuarios.filter((u) => u.tipo === 'Comercio' || u.tipo === 'ONG')} />
              </div>
            )}

            {abaDashboard === 'minhas_inscricoes' && usuarioLogado.tipo === 'CPF' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Ações em que você está inscrito</h3>
                <p className="text-sm text-slate-600">Acompanhe as datas e orientações para os mutirões ecológicos.</p>
              </div>
            )}

            {abaDashboard === 'beneficios' && usuarioLogado.tipo === 'CPF' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Certificados e Contrapartidas</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Consulte seu saldo de horas acumuladas e resgate declarações de participação voluntária.
                </p>
                <ListaVoluntarios voluntarios={usuarios.filter((u) => u.tipo === 'Voluntario')} />
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  )
}

export default App