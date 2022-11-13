import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import {Task} from 'src/app/models/task' ;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  editForm = false;
  showForm = false;
  search = '';
  myTask: Task= {
    id: 0,
    label: '',
    completed: false ,
  };
  tasks : Task[]= [];
  constructor(private taskService :TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks() { 
    this.taskService.fidAll()
    .subscribe( 
      response =>
        this.tasks = response
      
    )
  }
  deleteTask(id:any){
    this.taskService.deleteTask(id)
    .subscribe(()=>{
      this.tasks = this.tasks.filter(task=>{
        task.id !== id
      })
    })
  }
  persistTask(){
   this.taskService.persistTask(this.myTask)
   .subscribe((task)=>{
    this.tasks = [task , ...this.tasks]
    this.resetTask()
    this.showForm = false;
   })
  }
  resetTask(){
    this.myTask = {
      id: 0,
      label: '',
      completed: false,
  }
}
togleCompleted(task:any){   
  this.taskService.completed( task.id ,task.completed)
  .subscribe(()=>{
    task.completed = !task.completed
  })
}
editTask(task:any){
  this.myTask = task
  this.editForm = true ;
}
updateTask(){
  this.taskService.updateTask(this.myTask)
  .subscribe(()=>{
    this.resetTask()
    this.editForm = false ;
  });
}
searchTask(){
  this.tasks = this.tasks.filter((task)=>{
    task.label.includes(this.search) 
  })
}

}


