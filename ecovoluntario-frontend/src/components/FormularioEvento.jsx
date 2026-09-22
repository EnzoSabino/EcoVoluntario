import { useState } from 'react'

function FormularioEvento({ usuarios, aoCriarSucesso }) {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [dataEvento, setDataEvento] = useState('')
  const [localizacao, setLocalizacao] = useState('')
  const [organizadorId, setOrganizadorId] = useState('')
  const [mensagem, setMensagem] = useState('')

  const manejarEnvio = async (e) => {
    e.preventDefault()

    if (!organizadorId) {
      setMensagem('⚠️ Erro: Você precisa selecionar uma Empresa, ONG ou Voluntário cadastrado para criar o evento!')
      return
    }

    if (!titulo || !descricao || !dataEvento || !localizacao) {
      setMensagem('⚠️ Preencha todos os campos do evento.')
      return
    }

    const novoEvento = {
      titulo,
      descricao,
      data_evento: dataEvento,
      localizacao,
      organizador_id: Number(organizadorId)
    }

    try {
      const resposta = await fetch('http://localhost:3000/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoEvento)
      })

      if (resposta.ok) {
        setMensagem('✅ Evento criado com sucesso e vinculado ao organizador!')
        setTitulo('')
        setDescricao('')
        setDataEvento('')
        setLocalizacao('')
        setOrganizadorId('')
        if (aoCriarSucesso) aoCriarSucesso()
      } else {
        const erro = await resposta.json()
        setMensagem(`❌ ${erro.mensagem || 'Erro ao criar evento.'}`)
      }
    } catch (erro) {
      console.error('Erro ao conectar:', erro)
      setMensagem('❌ Falha na conexão com o servidor.')
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 mb-8">
      <h3 className="text-xl font-bold text-slate-800 mb-1">Criar Nova Ação Ecológica</h3>
      <p className="text-slate-500 text-sm mb-4">
        Somente entidades e membros cadastrados podem publicar eventos.
      </p>

      {mensagem && (
        <p className={`text-sm font-semibold p-3 rounded-lg mb-4 ${
          mensagem.includes('⚠️') || mensagem.includes('❌') 
            ? 'bg-red-50 text-red-600' 
            : 'bg-green-50 text-green-700'
        }`}>
          {mensagem}
        </p>
      )}

      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        {/* 🔒 SELEÇÃO OBRIGATÓRIA DO ORGANIZADOR */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Organizador Responsável (Cadastrado) *
          </label>
          <select 
            value={organizadorId} 
            onChange={(e) => setOrganizadorId(e.target.value)}
            className="w-full p-3 rounded-lg border border-slate-200 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-slate-700 text-sm"
          >
            <option value="">-- Selecione quem está criando este evento --</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nome} ({u.tipo || 'Cadastrado'}) - ID: #{u.id}
              </option>
            ))}
          </select>
          {usuarios.length === 0 && (
            <p className="text-xs text-amber-600 mt-1">
              Nenhum usuário ou empresa cadastrada ainda. Cadastre um primeiro!
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Título do Evento</label>
          <input 
            type="text" 
            placeholder="Ex: Mutirão de Limpeza do Rio local" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-green-500 text-slate-700 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Data do Evento</label>
            <input 
              type="date" 
              value={dataEvento} 
              onChange={(e) => setDataEvento(e.target.value)} 
              className="w-full p-3 rounded-lg border border-slate-200 outline-none text-slate-700 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Localização / Bairro</label>
            <input 
              type="text" 
              placeholder="Ex: Parque Central, Asa Sul..." 
              value={localizacao} 
              onChange={(e) => setLocalizacao(e.target.value)} 
              className="w-full p-3 rounded-lg border border-slate-200 outline-none text-slate-700 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Descrição e Objetivos</label>
          <textarea 
            rows="3"
            placeholder="Explique o que será feito e quais insumos/ajuda serão necessários..." 
            value={descricao} 
            onChange={(e) => setDescricao(e.target.value)} 
            className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-green-500 text-slate-700 text-sm"
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full p-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg cursor-pointer shadow-sm hover:shadow transition-all text-center mt-2"
        >
          Publicar Evento
        </button>
      </form>
    </div>
  )
}

export default FormularioEvento