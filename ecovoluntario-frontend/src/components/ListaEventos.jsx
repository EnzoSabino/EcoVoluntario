function ListaEventos({ eventos = [] }) {
  if (eventos.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-slate-100 text-center text-slate-500 shadow-sm">
        <p className="text-sm">Nenhum evento ecológico cadastrado até o momento. 🌲</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {eventos.map((evento) => (
        <div 
          key={evento.id} 
          className="bg-white p-5 rounded-xl border border-slate-100 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full">
                📅 {new Date(evento.data_evento).toLocaleDateString('pt-BR')}
              </span>
              <span className="text-xs text-slate-400 font-mono">#{evento.id}</span>
            </div>

            <h4 className="text-lg font-bold text-slate-800 mb-1">{evento.titulo}</h4>
            <p className="text-slate-600 text-xs mb-3 flex items-center gap-1">
              📍 <strong className="font-semibold">Local:</strong> {evento.localizacao}
            </p>
            <p className="text-slate-500 text-sm mb-4 line-clamp-3">
              {evento.descricao}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-3 mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>
              👤 <strong className="text-slate-700">Organizador:</strong> {evento.organizador_nome || `ID #${evento.organizador_id}`}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListaEventos