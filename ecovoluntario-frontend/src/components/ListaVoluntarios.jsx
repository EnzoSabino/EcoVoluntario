function ListaVoluntarios({ voluntarios = [] }) {
  if (voluntarios.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-slate-100 text-center text-slate-500 shadow-sm">
        <p className="text-sm">Nenhum voluntário cadastrado até o momento. 🙋‍♂️</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {voluntarios.map((voluntario) => (
        <div 
          key={voluntario.id} 
          className="bg-white p-5 rounded-xl border border-slate-100 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                🙋‍♂️ Voluntário
              </span>
              <span className="text-xs text-slate-400 font-mono">#{voluntario.id}</span>
            </div>

            <h4 className="text-lg font-bold text-slate-800 mb-1">
              {voluntario.nome || voluntario.nome_fantasia || 'Voluntário Anônimo'}
            </h4>

            {voluntario.email && (
              <p className="text-slate-600 text-xs mb-2 flex items-center gap-1">
                ✉️ <strong className="font-semibold">Contato:</strong> {voluntario.email}
              </p>
            )}

            {voluntario.habilidades && (
              <p className="text-slate-500 text-sm mb-2">
                🛠️ <strong className="font-semibold text-slate-700">Habilidades:</strong> {voluntario.habilidades}
              </p>
            )}

            {voluntario.disponibilidade && (
              <p className="text-slate-500 text-sm mb-2">
                ⏰ <strong className="font-semibold text-slate-700">Disponibilidade:</strong> {voluntario.disponibilidade}
              </p>
            )}
          </div>

          <div className="border-t border-slate-100 pt-3 mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Cadastrado no portal</span>
            {voluntario.cidade && (
              <span>📍 {voluntario.cidade}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListaVoluntarios