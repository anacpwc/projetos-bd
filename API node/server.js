import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
 
const app = express();
app.use(express.json()); // API aceita JSON
 
mongoose.connect(process.env.MONGODB_URI,{dbName: 'Aula'}).then(() => console.log('Conectado ao MongoDB')).catch(err => console.error('Erro na conexão:', err.message));
const alunoSchema = new mongoose.Schema({
    nome: {type: String, required: true, trim: true, minlength: 2},
    idade: {type: String, required: true, min: 0, max: 120},
    curso: {type: String, required: true, trim: true},
    notas: {type: [Number], default: [], validate: v => v.every(n => n >=0 && n <= 10)}},
    {collection: 'Alunos', timestamp: true
});
const Aluno = mongoose.model('Aluno', alunoSchema, 'Alunos');
 
app.get('/', (req,res) => res.json({msg: 'API rodando'}));
 
app.post('/alunos', async (req, res) => {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
});
 
app.get('Alunos',async (req,res) => {
    const alunos = await Aluno.find();
    req.json(alunos);
});
 
app.listen(process.env.PORT, () => console.log(`Servidor rodando em https://localhost:${process.env.PORT}`));