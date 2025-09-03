import { getAllCards , createCard , updateCard , deleteCard } from '../repositories/repositories.cards.js';

export default async function cardsRoutes(api){

api.get('/cards', async (request, reply) => {
  try {
    const cards = await getAllCards();
    reply.send(cards)
  } catch (err) {
    api.log.error(err)
    reply.code(500).send({ error: 'Erro ao buscar usuários no banco de dados' })
  }
})

api.post('/cards', async (req, rep) => {
  try {
 const cards = await createCard(req.body)
  rep.code(201).send(cards)
  } catch (err) {
    api.log.error(err)
    rep.code(500).send({ error: 'Erro ao criar cadastro' })
  }
  })

  api.put('/cards/:id', async (request, reply) => {
  const { id } = request.params
  try {
    const cards = await updateCard(id, request.body)
    if(!cards) {
      reply.code(404).send({ error: 'Usuário não encontrado' })
    } else {
      reply.send(cards)
    }
  } catch (err) {
    api.log.error(err)
    reply.code(500).send({ error: 'Erro ao atualizar usuário' })
  }
})

api.delete('/cards/:id', async (req, rep) => {
  const { id } = req.params

  try {
    const cards = await deleteCard(id)
      if (!cards) {
      rep.code(404).send({ error: 'Usuário não encontrado' })
    } else {
      rep.send({
        message: 'Usuário removido com sucesso',
        usuario: cards
      })
    }
  } catch (err) {
    api.log.error(err)
    rep.code(500).send({ error: 'Erro ao deletar usuário' })
  }
})

;}


