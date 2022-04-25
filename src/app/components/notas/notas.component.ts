import { Component, OnInit } from '@angular/core';

import { Task } from 'src/app/interfaces/task';
import { TasksService } from 'src/app/services/tasks.service';
import { CreateTask } from 'src/app/interfaces/create-task';
import { FormBuilder } from '@angular/forms';
import { UpdateTask } from 'src/app/interfaces/update-task';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  FormTask = this.formBuilder.group({
      title: '',
      description: '',
  }) 
  
  FormTaskEdit = this.formBuilder.group({
    title: '',
    description: '',
  }) 


  newTask: CreateTask = {} as CreateTask;
  ListOfTasks: Task[] = [];
  id: string = '';
  Task: CreateTask = {} as CreateTask;
  updatedTask: UpdateTask = {} as UpdateTask;
  status: boolean = false;

  constructor(private tasksService: TasksService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllTask();
  }

  createNewTask() {
    this.newTask = this.FormTask.value;
    console.log(this.newTask);
    this.tasksService.createTask(this.newTask).subscribe((res) => {
      window.location.reload();
    })
  }

  getAllTask() {
    this.tasksService.getTasks().subscribe((res: any) => {
      this.ListOfTasks = res.body.tasks;
    })
  }

  getOneTask(id: string) {
    this.tasksService.getTask(id).subscribe((res) => {
    })
  }

  deleteTask(id: string) {
    this.tasksService.deleteTask(id).subscribe((res) => {
      window.location.reload();
    })
  }

  editTask(id: string, title: string, description: string) {
    this.Task ={ title, description }
    this.id = id;
    this.status = true;
    console.log(this.Task);
  }

  UpdateTask() {
    console.log(this.FormTaskEdit.value);
    const done = false;
    this.tasksService.updateTask(this.id, this.FormTaskEdit.value).subscribe((res: any) => {
      window.location.reload();
      this.status = false;
    })
  }
}
