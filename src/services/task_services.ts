import {DevDataSource} from "../connections/db_dev";
import {Task} from "../models/task";

const cursor = DevDataSource.getRepository(Task)

type newTaskResquest = {
    description: string,
    date_task: Date
}

type findTaskRequest = {
    id: string
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
    
    async updateTask() {
        
    }
    
    async deleteTask() {
        
    }
}