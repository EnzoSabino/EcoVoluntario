import React, { useState } from 'react'

function Formulario({ aoCadastrarSucesso }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tipo, setTipo] = useState('Comercio')
  const [bairro, setBairro] = useState('')
  const [mensagem, setMensagem] = useState('')

  const manejarEnvio = (e) => {
    e.preventDefault()
    const nuevoUsuario = { nome, email, tipo, bairro }

    fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
    })
    .then(async resposta => {
      const dados = await resposta.json()
      if (!resposta.ok) throw new Error(dados.mensagem || 'Erro ao cadastrar')
      
      setMensagem('🌱 Cadastro realizado com sucesso!')
      aoCadastrarSucesso() // 🔄 Avisa o componente pai (App) para atualizar a lista
      
      setNome('')
      setEmail('')
      setBairro('')
    })
    .catch(erro => setMensagem(`⚠️ Erro: ${erro.message}`))
  }

  return (
    <div style={{ backgroundColor: '#f0f4f1', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
      <h3>Formulário de Cadastro</h3>
      {mensagem && <p style={{ fontWeight: 'bold', color: mensagem.includes('⚠️') ? 'red' : 'green' }}>{mensagem}</p>}

      <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Nome do Comércio" value={nome} onChange={(e) => setNome(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="email" placeholder="E-mail de Contato" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="Comercio">Empresa / Comércio</option>
          <option value="ONG">ONG / Instituição</option>
        </select>

        <input type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Cadastrar Parceiro
        </button>
      </form>
    </div>
  )
}

export default Formulario