import { useState } from 'react'

function FormularioVoluntario({ aoCadastrarSucesso }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [bairro, setBairro] = useState('')
  const [interesse, setInteresse] = useState('Reflorestamento')
  const [mensagem, setMensagem] = useState('')
  const [cpf, setCpf] = useState('')

    const aoMudarCPF = (e) => {
    let valor = e.target.value.replace(/\D/g, '')

    if (valor.length > 11) {
      valor = valor.slice(0, 11)
    }

    valor = valor
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

    setCpf(valor)
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()

    if (!nome || !email || !bairro) {
      setMensagem('⚠️ Por favor, preencha todos os campos!')
      return
    }

    const novoVoluntario = {
      nome,
      email,
      tipo: 'Voluntario',
      bairro: `${bairro} (Interesse: ${interesse})` // Salva o interesse junto com o bairro no banco
    }

    try {
      const resposta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoVoluntario)
      })

      if (resposta.ok) {
        setMensagem('✅ Voluntário cadastrado com sucesso!')
        setNome('')
        setEmail('')
        setBairro('')
        setInteresse('Reflorestamento')
        
        if (aoCadastrarSucesso) {
          aoCadastrarSucesso()
        }
      } else {
        setMensagem('❌ Erro ao cadastrar voluntário no servidor.')
      }
    } catch (erro) {
      console.error('Erro na requisição:', erro)
      setMensagem('❌ Falha ao se conectar com o servidor.')
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 mb-8">
      <h3 className="text-xl font-bold text-slate-800 mb-1">Cadastro de Voluntário</h3>
      <p className="text-slate-500 text-sm mb-4">
        Junte-se à nossa rede e participe de ações ecológicas na sua região!
      </p>

      {mensagem && (
        <p className={`text-sm font-semibold p-3 rounded-lg mb-4 ${mensagem.includes('⚠️') || mensagem.includes('❌') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
          {mensagem}
        </p>
      )}

      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo</label>
          <input 
            type="text" 
            placeholder="Digite seu nome" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-slate-700"
          />
        </div>

    <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">CPF *</label>
          <input 
            type="text" 
            placeholder="Digite seu CPF" 
            value={cpf} 
            onChange={aoMudarCPF} 
            maxLength={14}
            className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-slate-700 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">E-mail de Contato</label>
          <input 
            type="email" 
            placeholder="seu.email@exemplo.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-slate-700"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Bairro / Região</label>
            <input 
              type="text" 
              placeholder="Ex: Asa Sul, Centro..." 
              value={bairro} 
              onChange={(e) => setBairro(e.target.value)} 
              className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Área de Principal Interesse</label>
            <select 
              value={interesse} 
              onChange={(e) => setInteresse(e.target.value)} 
              className="w-full p-3 rounded-lg border border-slate-200 outline-none bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-slate-700"
            >
              <option value="Reflorestamento">🌲 Plantio / Reflorestamento</option>
              <option value="Limpeza de Praias/Rios">🌊 Limpeza de Praias e Rios</option>
              <option value="Reciclagem e Coleta">♻️ Reciclagem e Coleta Seletiva</option>
              <option value="Educação Ambiental">📚 Educação Ambiental</option>
              <option value="Apoio Logístico">🚚 Logística e Organização de Eventos</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full p-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg cursor-pointer shadow-sm hover:shadow transition-all text-center mt-2"
        >
          Quero ser Voluntário
        </button>
      </form>
    </div>
  )
}

export default FormularioVoluntario