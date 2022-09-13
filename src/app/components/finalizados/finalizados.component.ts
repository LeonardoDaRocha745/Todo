import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent implements OnInit {

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
        }
      })
    
    })
  }

  voltar(){
    //(router) é a variavel criada acima no construtor
    //quando o botão for clicado ele vai navegar para o path vazio
    this.router.navigate([''])
  }





}
