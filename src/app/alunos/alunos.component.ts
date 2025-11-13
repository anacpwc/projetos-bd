import { Component, OnInit, inject } from '@angular/core';
import { AlunoService, Aluno } from '../aluno.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alunos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  private api = inject(AlunoService);

  alunos: Aluno[] = [];
  carregando = false;
  salvando = false;
  erro = '';

  nome = '';
  idade: number | null = null;
  curso = '';
  notasCsv = '';

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.carregando = true;
    this.api.listar().subscribe({
      next: (alunos) => {
        this.alunos = alunos;
        this.carregando = false;
      },
      error: (err) => {
        this.erro = err.error?.error ?? 'Falha ao carregar alunos';
        this.carregando = false;
      }
    });
  }

  criar() {
    // ✅ Validação simples
    if (!this.nome.trim() || this.idade == null || !this.curso.trim()) {
      this.erro = 'Preencha todos os campos obrigatórios';
      return;
    }

    // ✅ Conversão das notas em número
    const notas = this.notasCsv
      .split(',')
      .map(s => Number(s.trim()))
      .filter(n => !Number.isNaN(n) && n >= 0 && n <= 10);

    // ✅ Monta o objeto aluno
    const aluno: Aluno = {
      nome: this.nome.trim(),
      idade: Number(this.idade),
      curso: this.curso.trim(),
      notas
    };

    console.log('📤 Enviando aluno:', aluno);

    this.salvando = true;
    this.api.criar(aluno).subscribe({
      next: (novo) => {
        console.log('✅ Criado:', novo);
        this.nome = '';
        this.idade = null;
        this.curso = '';
        this.notasCsv = '';
        this.salvando = false;
        this.erro = '';
        this.carregar();
      },
      error: (err) => {
        console.error('❌ Erro ao criar:', err);
        this.erro = err.error?.error ?? 'Falha ao criar aluno';
        this.salvando = false;
      }
    });
  }

  excluir(id?: string) {
    if (!id) return;
    if (!confirm('Tem certeza que deseja excluir este aluno?')) return;

    this.api.excluir(id).subscribe({
      next: () => this.carregar(),
      error: (err) => {
        console.error('❌ Erro ao excluir:', err);
        this.erro = err.error?.error ?? 'Falha ao excluir aluno';
      }
    });
  }
}
