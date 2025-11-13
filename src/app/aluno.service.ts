import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aluno {
  _id?: string;
  nome: string;
  idade: number;
  curso: string;
  notas: number[];
}

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private http = inject(HttpClient);
  private base = 'http://localhost:3000/alunos'; // ✅ http (não https)

  listar(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.base);
  }

  buscarPorId(id: string): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.base}/${id}`); // ✅ corrigido
  }

  criar(aluno: Aluno): Observable<Aluno> {
    console.log(aluno);
    return this.http.post<Aluno>(this.base, aluno);
  }

  atualizar(id: string, aluno: Partial<Aluno>): Observable<Aluno> {
    return this.http.patch<Aluno>(`${this.base}/${id}`, aluno); // ✅ corrigido
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`); // ✅ corrigido
  }
}
