import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'


dotenv.config();
const app = express();

app.use(cors());

// Configuração do banco de dados
const user_db = process.env.DB_USER;
const pass_db = process.env.DB_PASS;



mongoose
  .connect(`mongodb+srv://${user_db}:${pass_db}@cluster0.ivxoajq.mongodb.net`)
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor está rodando na porta 3000');
    });
    console.log('Conectou ao banco de dados');
  })
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

// Middleware para lidar com solicitações JSON
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

export default app;


