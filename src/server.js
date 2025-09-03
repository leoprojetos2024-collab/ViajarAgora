import fastify from "fastify" 
import dotenv from 'dotenv'
import cardsRoutes from '../src/routes/cards.routes.js'
import cors from '@fastify/cors'

dotenv.config()

const api = fastify({
    logger: true
})

await api.register(cors, {
  origin: true, // Permite todas as origens (desenvolvimento)
  credentials: true, // Permite cookies e headers de autenticação
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
})

await api.register(cardsRoutes)

const PORT = process.env.PORT || 3000


api.get ('/', async(request , reply)=>{
    reply.send({message: 'Servidor funcionando!'})
});
   
const start = async () => {
  try {
    await api.listen({ port:PORT, host: '0.0.0.0', port:   3000 })
    console.log('Servidor rodando em http://localhost:3000')
  } catch (err) {
    api.log.error(err)
    process.exit(1)
  }
}



// 


start()