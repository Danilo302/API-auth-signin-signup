import User from '../models/User.js';

const userController = {
  async getUserById(req, res) {
    try {
      const { id } = req.params;

      // Verificar se o ID fornecido é válido
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ mensagem: 'ID de usuário inválido' });
      }

      // Encontrar o usuário no banco de dados pelo ID
      const user = await User.findById(id);

      // Se o usuário não for encontrado
      if (!user) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      // Se o usuário for encontrado, retornar suas informações
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
    }
  },

  
};

export default userController;
