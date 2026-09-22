import React, { useState } from 'react'
import FormularioEvento from '../components/FormularioEvento'

function DashboardEmpresa({ usuario, eventos = [], buscarEventos }) {
  const [abaAtiva, setAbaAtiva] = useState('meus_projetos')

  // Função enviada como callback após salvar o evento
  const tratarSucessoCriacao = () => {
    if (buscarEventos) {
      buscarEventos() // Atualiza a lista de eventos no App.jsx
    }
    setAbaAtiva('meus_projetos') // Redireciona de volta para a aba da lista
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">
            Painel Corporativo (ESG) 🏢
          </h2>
          <p className="text-slate-500 text-sm">
            Gestão de projetos socioambientais de {usuario?.nome || 'Empresa'}.
          </p>
        </div>
        <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-xl text-xs font-bold border border-blue-200">
          Perfil: Empresa / ONG (CNPJ)
        </div>
      </div>

      {/* NAVEGAÇÃO DE ABAS */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setAbaAtiva('meus_projetos')}
          className={`pb-3 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            abaAtiva === 'meus_projetos'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Todos os Projetos ({eventos.length})
        </button>
        <button
          onClick={() => setAbaAtiva('novo_projeto')}
          className={`pb-3 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            abaAtiva === 'novo_projeto'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          + Criar Novo Projeto
        </button>
      </div>

      {/* ABA 1: LISTA DE PROJETOS */}
      {abaAtiva === 'meus_projetos' && (
        <div className="grid md:grid-cols-2 gap-4">
          {eventos.length === 0 ? (
            <div className="col-span-2 bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
              Nenhum projeto cadastrado no sistema.
            </div>
          ) : (
            eventos.map((ev) => (
              <div key={ev.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 text-lg mb-2">{ev.titulo}</h3>
                <p className="text-slate-600 text-xs mb-4">{ev.descricao}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>📅 {ev.data || ev.data_evento}</span>
                  <span>📍 {ev.local || ev.localizacao}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ABA 2: FORMULÁRIO DE NOVO EVENTO */}
      {abaAtiva === 'novo_projeto' && (
        <FormularioEvento
          usuarioLogado={usuario}
          aoCriarSucesso={tratarSucessoCriacao}
        />
      )}
    </div>
  )
}

export default DashboardEmpresa