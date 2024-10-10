import { describe } from "node:test";
import {DevDataSource} from "../connections/dbDev";
import {Task} from "../models/task";

const cursor = DevDataSource.getRepository(Task)

type newTaskResquest = {
    description: string,
    date_task: Date
}

type findTaskRequest = {
    id: string
}

type updateTaskRequest ={
    id: string
    description: string,
    date_task: Date
}

export class TaskService{
    async creatTask({
        description, date_task
    }: newTaskResquest):Promise<Task | Error> {
        const task = cursor.create({
            description, date_task
        })
        await cursor.save(task)
        return task
    }
    
    async readOneTask({id}: findTaskRequest) :
    Promise <Task | Error> {
        const task = await cursor.findOne({where: {id}})
        if(!task){
            return new Error("Task not found!")
        }
        return task 
    }
    
    async readAllTask(){
        const tasks = await cursor.find()
        return tasks 
    }
    
    async updateTask( { id, description, date_task } : updateTaskRequest): Promise<Task | Error>{
        const task = await cursor.findOne({where: {id}})
        if(!task){
            return new Error("Task not found!")
        }

        task.description = description ? description : task.description
        task.date_task = date_task ? date_task : task.date_task

        await cursor.save(task)
        return task 
    }
    
    async deleteTask( {id}:findTaskRequest): Promise<String | Error> {
        const task = await cursor.findOne({where: {id}})
        if(!task){
            return new Error("Task not found!")
        }
        await cursor.delete(task.id)
        return "Task removed successfully"
        
    }
}