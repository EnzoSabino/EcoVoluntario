import React from 'react'

function ListaParceiros({ usuarios }) {
  return (
    <div>
      <h3>🏪 Comércios Parceiros Cadastrados:</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {usuarios.length === 0 ? (
          <p>Nenhum comércio cadastrado ou carregando dados...</p>
        ) : (
          usuarios.map((usuario) => (
            <div key={usuario.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
              <h4 style={{ margin: '0 0 5px 0', color: '#2e7d32' }}>{usuario.nome}</h4>
              <p style={{ margin: '0 0 5px 0' }}><strong>E-mail:</strong> {usuario.email}</p>
              <p style={{ margin: '0' }}><strong>Bairro:</strong> {usuario.bairro} | <strong>Tipo:</strong> {usuario.tipo}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ListaParceiros