import jwt from 'jsonwebtoken';

const authUtils = {
  generateAccessToken(userId) {
    return jwt.sign({ userId }, 'seu_segredo_secreto', { expiresIn: '1h' });
  },

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, 'seu_segredo_secreto');
      return decoded;
    } catch (error) {
      return null; // Token inválido ou expirado
    }
  }
};

export default authUtils;
