import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {
 routerLink="/usuarioAdd/{{student.id}}" 
  list: Todo[] = [];
  listFinished: Todo [] = [];
  finalizado = 0;
  

  //colocando no construtor o serviço de Todo criado, para q possamos acessar os metodos criados lá
  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
    //chamar o método findAll criado abaixo, para ele ser executado quando iniciar a página
    this.findAll();
  }

  findAll():void{
    //inscrevendo a resposta do Backend na lista
    //a resposta do BackEnd está sendo tratada no serviço 
    this.service.findAll().subscribe((resposta) => {

      //para cada todo se ele tiver finalizado listFinished vai recever um todo
      //se nao estiver, o array de list vai receber um todo
      //"todo" é a variavél que foi criada no forEach que vai receber a resposta da API(um objeto todo)
      resposta.forEach(todo => {
        if(todo.finalizado){
          this.listFinished.push(todo)
        }else {
          this.list.push(todo)
        }
      })
      this.finalizado = this.listFinished.length

    
    })
  }

  //passando o id por parametro para saber qual todo apagar
  delete(id:any):void {
      this.service.delete(id).subscribe((resposta)=>{
        if(resposta === null){
          this.service.message('Tarefa deletada com sucesso!');
          this.list = this.list.filter(todo => todo.id !== id);
        }
      })
  }


  //passando o item do FOR como parametro q foi gerado no html
  finalizar(item :Todo):void {
    item.finalizado = true;
    this.service.update(item).subscribe(() =>{
      this.service.message('Tarefa finalizada com sucesso!');
      this.list = this.list.filter(todo => todo.id !== item.id); 
      this.finalizado++;
    }) 
  }


}
