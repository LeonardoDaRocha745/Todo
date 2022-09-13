import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
//aqui que comunica com o Back-End
export class TodoService {
  //caminho da API q foi declarada no environment
  baseUrl = environment.baseUrl


  //colocar http no construtor pra comçar a fazer as requisições
  constructor(private http: HttpClient, private snack: MatSnackBar) { 

  }
  //observable vai fazer a reqsuisição no Backend 
  //e vai ficar observando quando a resposta retornar, e qnd ele retornar ele vai executar o trecho de código
  findAll():Observable<Todo[]>{
    return this.http.get<Todo []>(this.baseUrl);
  }
  findByID(id: any):Observable<Todo>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Todo>(url);
  }

  update(todo: Todo):Observable<Todo>{
    const url = `${this.baseUrl}/${todo.id}`
    return this.http.put<Todo>(url, todo)

  }

  

  delete(id: any):Observable<void>{
    // no backend a url que chama é com o id
    //passando que a url vai ser todos/o id q foi passado
    //como argumento nesse método de delete
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<void>(url);
  }

  create(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.baseUrl, todo)
  }


  message(msg: String):void {
    //os parametros do snackbar é a mensagem, oq vai estar escrito na ação, e as configurações do snack
    this.snack.open(`${msg}`, "Ok",{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration:4000,
    })
    
  }




}
