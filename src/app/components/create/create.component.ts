import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  //os valores q o usuario digitar vai vir pra ca
  todo: Todo = {
    tituloString: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
  }

  create():void {
    this.formataData()
    //todo que recuperou os dados do input vai se inscrever e enviar para API
    this.service.create(this.todo).subscribe((resposta) =>{
      this.service.message('Tarefa criada com sucesso!')
      this.router.navigate (['']);
    }, err =>{
      this.service.message('Erro ao criar tarefa')
      this.router.navigate (['']);
    })

    console.log(this.todo.dataParaFinalizar)
  }
  formataData():void{
    let data = new Date (this.todo.dataParaFinalizar)
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

}
