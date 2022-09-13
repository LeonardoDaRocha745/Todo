import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todo: Todo = {
    tituloString: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private service: TodoService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    //recuperando ID
    //sempre que o component for iniciado ele vai pegar o ID do path
    //e vai atribuir ao ID do nosso Todo
    this.todo.id = this.route.snapshot.paramMap.get("id")!
    //quando inicia o componente executa o método findbyid
    this.findById()
  }

  findById():void {
    this.service.findByID(this.todo.id).subscribe((resposta)=>{
      this.todo = resposta;
    })
  }

  update():void {
    this.service.update(this.todo).subscribe((resposta) =>{
      this.service.message('Tarefa atualizada com sucesso!')
      this.router.navigate (['']);
    }, err =>{
      this.service.message('Erro ao atualizar tarefa')
      this.router.navigate (['']);
    })

    console.log(this.todo.dataParaFinalizar)
  }
  formataData():void{
    let data = new Date (this.todo.dataParaFinalizar)
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

}
