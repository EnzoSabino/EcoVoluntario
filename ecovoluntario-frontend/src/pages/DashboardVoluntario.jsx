import { useState } from 'react'

export default function DashboardVoluntario({ usuario, eventos }) {
  const [abaAtiva, setAbaAtiva] = useState('explorar')
  // Simulação de inscrições salvas no estado local
  const [minhasInscricoes, setMinhasInscricoes] = useState([])

  const inscreverEmEvento = (evento) => {
    if (!minhasInscricoes.some((item) => item.id === evento.id)) {
      setMinhasInscricoes([...minhasInscricoes, evento])
      alert(`Inscrição realizada com sucesso no evento: ${evento.titulo}`)
    } else {
      alert('Você já está inscrito neste evento!')
    }
  }

  // Cálculo fictício de horas acumuladas
  const totalHoras = minhasInscricoes.length * 4

  return (
    <div className="space-y-6">
      {/* CABEÇALHO DO DASHBOARD CPF */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800">
            Painel do Voluntário 🌿
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Bem-vindo(a), <strong className="text-slate-700">{usuario.nome}</strong> ({usuario.email})
          </p>
        </div>

        {/* NAVEGAÇÃO DE ABAS CPF */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setAbaAtiva('explorar')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              abaAtiva === 'explorar' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            Explorar Mutirões
          </button>
          <button
            onClick={() => setAbaAtiva('inscricoes')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              abaAtiva === 'inscricoes' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            Minhas Inscrições ({minhasInscricoes.length})
          </button>
          <button
            onClick={() => setAbaAtiva('horas')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              abaAtiva === 'horas' ? 'bg-white text-green-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            Meu Impacto & Horas
          </button>
        </div>
      </div>

      {/* ABA 1: EXPLORAR MUTIRÕES */}
      {abaAtiva === 'explorar' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Ações Ambientais Disponíveis</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {eventos.length > 0 ? (
              eventos.map((evento) => (
                <div key={evento.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md uppercase">
                      Mutirão
                    </span>
                    <h4 className="text-lg font-bold text-slate-800 mt-2">{evento.titulo}</h4>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">{evento.descricao}</p>
                    <p className="text-xs text-slate-400 mt-3 font-medium">📅 Data: {evento.data || 'A definir'}</p>
                  </div>

                  <button
                    onClick={() => inscreverEmEvento(evento)}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-xl text-xs transition-all shadow-sm cursor-pointer"
                  >
                    Quero Participar
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">Nenhum evento cadastrado no momento.</p>
            )}
          </div>
        </div>
      )}

      {/* ABA 2: MINHAS INSCRIÇÕES */}
      {abaAtiva === 'inscricoes' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Minhas Ações Confirmadas</h3>
          
          {minhasInscricoes.length > 0 ? (
            <div className="space-y-3">
              {minhasInscricoes.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{item.titulo}</h4>
                    <p className="text-xs text-slate-500">Status: <span className="text-green-600 font-bold">Inscrição Confirmada</span></p>
                  </div>
                  <span className="text-xs font-mono bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-600">
                    +4h de Impacto
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500">Você ainda não se inscreveu em nenhuma ação ecológica.</p>
          )}
        </div>
      )}

      {/* ABA 3: HORAS E CERTIFICADOS */}
      {abaAtiva === 'horas' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Relatório de Engajamento Comunitário</h3>
          <p className="text-xs text-slate-500 mb-6">Acompanhe e emita comprovantes das suas atividades voluntárias prestadas.</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
              <span className="text-xs font-bold text-emerald-800 uppercase">Horas Cumpridas</span>
              <p className="text-3xl font-black text-emerald-900 mt-1">{totalHoras} hrs</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <span className="text-xs font-bold text-slate-600 uppercase">Projetos Apoiados</span>
              <p className="text-3xl font-black text-slate-800 mt-1">{minhasInscricoes.length}</p>
            </div>
          </div>

          <button 
            disabled={totalHoras === 0}
            onClick={() => alert('Gerando certificado em PDF...')}
            className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
              totalHoras > 0 
                ? 'bg-slate-800 hover:bg-slate-900 text-white cursor-pointer' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {totalHoras > 0 ? '📄 Emitir Certificado de Voluntariado (PDF)' : 'Conclua ao menos 1 ação para liberar o certificado'}
          </button>
        </div>
      )}
    </div>
  )
}