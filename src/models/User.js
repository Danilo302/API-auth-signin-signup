import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  senha: {
    type: String,
    required: true
  },
  telefones: [{
    numero: String,
    ddd: String
  }],
  data_criacao: {
    type: Date,
    //default: Date.now
  },
  data_atualizacao: {
    type: Date,
    default: Date.now
  },
  ultimo_login: {
    type: Date,
    default: Date.now
  }
});

// Atualiza as datas antes de salvar o documento
userSchema.pre('save', function (next) {
  const currentDate = new Date();

  // Atualiza a data de atualização sempre que o documento for salvo
  this.data_atualizacao = currentDate;

  // Se o documento for novo, atualiza a data de criação
  if (!this.data_criacao) {
    this.data_criacao = currentDate;
  }

  next();
});

const User = mongoose.model('User', userSchema);

export default User;
