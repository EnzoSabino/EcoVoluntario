import React, { useState } from 'react'
import { salvarUsuario } from '../services/api'

function FormularioVoluntario({ aoCadastrarSucesso }) {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [bairro, setBairro] = useState('')
  const [interesse, setInteresse] = useState('Reflorestamento')
  const [mensagem, setMensagem] = useState('')

  // Função para formatar o CPF enquanto digita
  const aoMudarCPF = (e) => {
    let valor = e.target.value.replace(/\D/g, '')

    if (valor.length > 11) {
      valor = valor.slice(0, 11)
    }

    valor = valor
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')       .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

    setCpf(valor)
  }

  const manejarEnvio = (e) => {
    e.preventDefault()

    if (!nome || !email || !senha || !cpf || !bairro) {
      setMensagem('⚠️ Por favor, preencha todos os campos obrigatórios!')
      return
    }

    const novoVoluntario = {
      nome,
      cpf,
      email,
      senha,
      tipoPessoa: 'CPF',
      bairro,
      interesse
    }

    try {
      salvarUsuario(novoVoluntario)
      setMensagem('✅ Voluntário cadastrado com sucesso! Faça login para aceder.')
      
      setNome('')
      setCpf('')
      setEmail('')
      setSenha('')
      setBairro('')
      setInteresse('Reflorestamento')

      if (aoCadastrarSucesso) {
        aoCadastrarSucesso()
      }
    } catch (erro) {
      console.error('Erro ao salvar no localStorage:', erro)
      setMensagem('❌ Erro ao salvar cadastro.')
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 mb-8">
      <h3 className="text-xl font-bold text-slate-800 mb-1">Cadastro de Voluntário</h3>
      <p className="text-slate-500 text-sm mb-4">
        Junte-se à nossa rede e participe de ações ecológicas na sua região!
      </p>

      {mensagem && (
        <p className={`text-sm font-semibold p-3 rounded-lg mb-4 ${
          mensagem.includes('⚠️') || mensagem.includes('❌') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'
        }`}>
          {mensagem}
        </p>
      )}

      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo *</label>
          <input 
            type="text" 
            required
            placeholder="Digite seu nome" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-slate-700 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">CPF *</label>
            <input 
              type="text" 
              required
              placeholder="000.000.000-00" 
              value={cpf} 
              onChange={aoMudarCPF} 
              maxLength={14}
              className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-slate-700 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">E-mail de Contato *</label>
            <input 
              type="email" 
              required
              placeholder="seu.email@exemplo.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-slate-700 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Senha de Acesso *</label>
          <input 
            type="password" 
            required
            placeholder="••••••••" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-slate-700 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Bairro / Região *</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Asa Sul, Centro..." 
              value={bairro} 
              onChange={(e) => setBairro(e.target.value)} 
              className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-slate-700 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Área de Principal Interesse</label>
            <select 
              value={interesse} 
              onChange={(e) => setInteresse(e.target.value)} 
              className="w-full p-3 rounded-lg border border-slate-200 outline-none bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-slate-700 text-sm"
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