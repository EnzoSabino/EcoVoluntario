import React, { useState } from 'react'
import { salvarUsuario } from '../services/api'

function Formulario({ aoCadastrarSucesso }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [categoriaEmpresa, setCategoriaEmpresa] = useState('Comercio') // Comercio ou ONG
  const [bairro, setBairro] = useState('')
  const [mensagem, setMensagem] = useState('')

 const manejarEnvio = (e) => {
  e.preventDefault()

  const novoUsuario = {
    nome,
    email,
    senha,
    tipoPessoa: 'CNPJ',
    categoriaEmpresa,
    bairro
  }

  try {
    salvarUsuario(novoUsuario)
    setMensagem('🌱 Cadastro de empresa/ONG realizado com sucesso! Faça login para aceder.')
    
    setNome('')
    setEmail('')
    setSenha('')
    setBairro('')

    if (aoCadastrarSucesso) aoCadastrarSucesso()
  } catch (erro) {
    setMensagem(`⚠️ Erro ao salvar cadastro.`)
  }
}

  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Cadastro de Empresa / ONG</h3>

      {mensagem && (
        <div className={`p-3 rounded-lg text-xs font-semibold mb-4 border ${
          mensagem.includes('⚠️') 
            ? 'bg-red-50 text-red-700 border-red-200' 
            : 'bg-green-50 text-green-700 border-green-200'
        }`}>
          {mensagem}
        </div>
      )}

      <form onSubmit={manejarEnvio} className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Razão Social / Nome da ONG</label>
          <input
            type="text"
            required
            placeholder="Ex: EcoComércio Ltda"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">E-mail Corporativo</label>
          <input
            type="email"
            required
            placeholder="contato@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Senha de Acesso</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Instituição</label>
            <select
              value={categoriaEmpresa}
              onChange={(e) => setCategoriaEmpresa(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
            >
              <option value="Comercio">Empresa / Comércio</option>
              <option value="ONG">ONG / Instituição</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Bairro / Localização</label>
            <input
              type="text"
              required
              placeholder="Ex: Centro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl transition-all shadow-md cursor-pointer text-sm mt-2"
        >
          Cadastrar Empresa
        </button>
      </form>
    </div>
  )
}

export default Formulario