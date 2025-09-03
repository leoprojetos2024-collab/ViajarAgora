import pool from '../infra/db.js'

export async function getAllCards() {
    const result = await pool.query('SELECT * FROM card')
    return result.rows
}

export async function createCard(userData) {
    const { origem , destino , dataIda , dataVolta , valor } = userData
    const result = await pool.query( 
        `INSERT INTO card (origem, destino, dataIda, dataVolta, valor) 
    VALUES ($1,  $2,  $3,  $4,  $5) RETURNING *`,
    [origem , destino , dataIda , dataVolta , valor ]
)
       return result.rows[0]
}

  export async function updateCard(id, userData) {
    const { origem, destino, dataIda, dataVolta, valor } = userData
    const result = await pool.query(
      `UPDATE card SET 
       origem = $1, destino = $2, dataIda= $3, dataVolta = $4, valor = $5 WHERE id = $6 RETURNING *`,   
      [origem , destino , dataIda , dataVolta , valor , id]
    )
    return result.rows[0]
  }
  export async function deleteCard(id) {
  const result = await pool.query(
    'DELETE FROM card WHERE id = $1 RETURNING *',
    [id]
  )
  return result.rows[0]
}

