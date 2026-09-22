import { useState, useEffect } from 'react'
import FormularioVoluntario from './components/FormularioVoluntario'
import Formulario from './components/Formulario'

// Import das funções de persistência via LocalStorage
import { getUsuarios, getEventos } from './services/api'

// Páginas / Painéis dedicados por perfil
import DashboardVoluntario from './pages/DashboardVoluntario'
import DashboardEmpresa from './pages/DashboardEmpresa'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [eventos, setEventos] = useState([])

  // Campos do formulário de login
  const [emailLogin, setEmailLogin] = useState('')
  const [senhaLogin, setSenhaLogin] = useState('')
  const [mensagemErro, setMensagemErro] = useState('')

  // Sessão do Utilizador (Lê do localStorage na inicialização)
  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const usuarioSalvo = localStorage.getItem('usuarioLogado')
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null
  })

  // Controle de Ecrãs: Se houver usuário logado, abre direto no dashboard
  const [telaAtual, setTelaAtual] = useState(() => {
    return localStorage.getItem('usuarioLogado') ? 'dashboard' : 'landing'
  })

  // Módulo de Autenticação
  const [modoAutenticacao, setModoAutenticacao] = useState('login')
  const [tipoPessoa, setTipoPessoa] = useState('CPF')

  const carregarDados = () => {
    setUsuarios(getUsuarios())
    setEventos(getEventos())
  }

  useEffect(() => {
    carregarDados()
  }, [])

  // NAVEGAÇÃO
  const irParaCadastroCPF = () => {
    setTipoPessoa('CPF')
    setModoAutenticacao('cadastro')
    setTelaAtual('auth')
    setMensagemErro('')
  }

  const irParaCadastroCNPJ = () => {
    setTipoPessoa('CNPJ')
    setModoAutenticacao('cadastro')
    setTelaAtual('auth')
    setMensagemErro('')
  }

  const irParaLogin = () => {
    setModoAutenticacao('login')
    setTelaAtual('auth')
    setMensagemErro('')
  }

  // LOGIN LOCALSTORAGE
  const efetuarLogin = (e) => {
    e.preventDefault()
    setMensagemErro('')

    const listaUsuarios = getUsuarios()

    const usuarioEncontrado = listaUsuarios.find(
      (u) =>
        u.email.toLowerCase() === emailLogin.toLowerCase() &&
        u.senha === senhaLogin &&
        (u.tipoPessoa === tipoPessoa || u.tipo === tipoPessoa)
    )

    if (usuarioEncontrado) {
      setUsuarioLogado(usuarioEncontrado)
      // Guardar sessão no localStorage
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado))
      setTelaAtual('dashboard')
      setEmailLogin('')
      setSenhaLogin('')
    } else {
      setMensagemErro(`Credenciais inválidas para conta ${tipoPessoa}. Verifique o e-mail e a senha.`)
    }
  }

  // LOGOUT
  const efetuarLogout = () => {
    setUsuarioLogado(null)
    localStorage.removeItem('usuarioLogado')
    setTelaAtual('landing')
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased font-sans">
      {/* HEADER FIXO */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setTelaAtual(usuarioLogado ? 'dashboard' : 'landing')}
            className="text-2xl font-black text-green-600 tracking-tight cursor-pointer"
          >
            EcoVoluntário
          </button>

          <div className="flex items-center gap-3">
            {usuarioLogado ? (
              <div className="flex items-center gap-3">
                <span className="text-xs bg-green-100 text-green-800 px-3 py-1.5 rounded-full font-bold">
                  {usuarioLogado.tipoPessoa === 'CPF' || usuarioLogado.tipo === 'CPF'
                    ? 'Voluntário (CPF)'
                    : 'Empresa / ONG (CNPJ)'}
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

      {/* 1. LANDING PAGE */}
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
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Para Empresas e ONGs</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Crie projetos de responsabilidade socioambiental, patrocine iniciativas existentes com insumos ou apoio financeiro e fortaleça suas métricas de ESG.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. AUTENTICAÇÃO */}
      {telaAtual === 'auth' && (
        <div className="max-w-xl mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
            <div className="flex border-b border-slate-200 mb-6">
              <button
                onClick={() => { setModoAutenticacao('login'); setMensagemErro(''); }}
                className={`flex-1 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer ${
                  modoAutenticacao === 'login'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Já tenho conta (Login)
              </button>
              <button
                onClick={() => { setModoAutenticacao('cadastro'); setMensagemErro(''); }}
                className={`flex-1 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer ${
                  modoAutenticacao === 'cadastro'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Criar Nova Conta
              </button>
            </div>

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
                  Voluntário (CPF)
                </button>
                <button
                  onClick={() => setTipoPessoa('CNPJ')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    tipoPessoa === 'CNPJ' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  Empresa / ONG (CNPJ)
                </button>
              </div>
            </div>

            {modoAutenticacao === 'login' ? (
              <form onSubmit={efetuarLogin} className="space-y-4">
                {mensagemErro && (
                  <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200">
                    {mensagemErro}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    required
                    value={emailLogin}
                    onChange={(e) => setEmailLogin(e.target.value)}
                    placeholder="seuemail@dominio.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Senha</label>
                  <input
                    type="password"
                    required
                    value={senhaLogin}
                    onChange={(e) => setSenhaLogin(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl transition-all shadow-md cursor-pointer text-sm"
                >
                  Entrar no Painel ({tipoPessoa})
                </button>
              </form>
            ) : (
              tipoPessoa === 'CPF' ? (
                <FormularioVoluntario
                  aoCadastrarSucesso={() => {
                    carregarDados()
                    setModoAutenticacao('login')
                  }}
                />
              ) : (
                <Formulario
                  aoCadastrarSucesso={() => {
                    carregarDados()
                    setModoAutenticacao('login')
                  }}
                />
              )
            )}
          </div>
        </div>
      )}

      {/* 3. DASHBOARDS */}
      {telaAtual === 'dashboard' && usuarioLogado && (
        <div className="max-w-5xl mx-auto px-4 py-8">
          {(usuarioLogado.tipoPessoa === 'CPF' || usuarioLogado.tipo === 'CPF') ? (
            <DashboardVoluntario usuario={usuarioLogado} eventos={eventos} />
          ) : (
            <DashboardEmpresa
              usuario={usuarioLogado}
              eventos={eventos}
              buscarEventos={carregarDados}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default App