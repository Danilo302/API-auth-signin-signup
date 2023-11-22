import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authController = {
  async signup(req, res) {
    try {
      const { nome, email, senha, telefones } = req.body;

      // Verificar se o email já está cadastrado
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ mensagem: 'E-mail já existente' });
      }

      // Criptografar a senha antes de salvar no banco de dados
      const hashedPassword = await bcrypt.hash(senha, 10); // 10 é o custo da criptografia

      //Data de Criacao
      const data_criacao = new Date()

      // Criar um novo usuário
      const newUser = new User({
        nome,
        email,
        senha: hashedPassword,
        telefones,
        data_criacao
      });

      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, 'seu_segredo_secreto', { expiresIn: '1h' });

      const responseData = {
        id: newUser._id,
        data_criacao: newUser.data_criacao,
        data_atualizacao: newUser.data_atualizacao,
        ultimo_login: newUser.ultimo_login,
        token
      };

      res.status(201).json({ mensagem: 'Usuário criado com sucesso', responseData});
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao criar usuário' });
    }
  },

  async signin(req, res) {
    try {
      const { email, senha } = req.body;

      // Verificar se o usuário existe no banco de dados
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
      }

      // Verificar se a senha está correta
      const passwordMatch = await bcrypt.compare(senha, user.senha);
      if (!passwordMatch) {
        return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
      }

      // Gerar token JWT
      const token = jwt.sign({ userId: user._id }, 'seu_segredo_secreto', { expiresIn: '1h' });

      res.status(200).json({ token, userId:user._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao autenticar usuário' });
    }
  }
};

export default authController;
