import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
  origin: [/^http:\/\/localhost:\d+$/],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect(process.env.MONGODB_URI, { dbName: 'Aula' })
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('❌ Erro na conexão:', err.message));

const alunoSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true, minlength: 2 },
  idade: { type: Number, required: true, min: 0, max: 120 },
  curso: { type: String, required: true, trim: true },
  notas: {
    type: [Number],
    default: [],
    validate: v => v.every(n => n >= 0 && n <= 10)
  }
}, { collection: 'Alunos', timestamps: true });

const Aluno = mongoose.model('Aluno', alunoSchema, 'Alunos');

app.get('/', (req, res) => res.json({ msg: 'API rodando' }));

app.get('/alunos', async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
});

app.post('/alunos', async (req, res) => {
  console.log('📦 Corpo recebido:', req.body);
  try {
    const aluno = await Aluno.create(req.body);
    console.log('✅ Aluno criado com sucesso:', aluno);
    res.status(201).json(aluno);
  } catch (err) {
    console.error('❌ Erro ao criar aluno:', err.message);
    res.status(400).json({ error: err.message });
  }
});

app.get('/alunos/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/alunos/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/alunos/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
