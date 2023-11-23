const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const port=3000

const tasks=[]
app.use(bodyParser.json())
app.get('/tasks', (req, res) =>{
    res.send(tasks);
  })
  app.get('/tasks/:id', (req, res) =>{
    for(let task of tasks){
        if(task.id==req.params.id){
            res.send(task);
        }
    }
    throw new Error(`Task with id:${id}doesnt exist`)
  })
  app.post('/tasks', (req, res) => {
    if(req.body){
      for(let task of tasks){
        if(task.id==req.body.id){
          throw new Error(`task with id ${task.id} already exists`)
        }
      }
      if(req.body.title!=undefined && req.body.title.length==0){
        console.log(req.body.title.length)
        throw new Error('title in task should not be empty')
      }
      if(req.body.description!=undefined && req.body.description.length==0){
        throw new Error('description in task should not be empty')
      }
      if(req.body.flag!=undefined && typeof req.body.flag!="boolean"){
        throw new Error('flag should be boolean')
      }
        tasks.push(req.body);
        res.send(tasks);
    }else{
        throw new Error('No body');
    }
  })
  app.put('/tasks/:id', (req, res) => {
    if(req.body){
      if(req.body.title!=undefined && req.body.title.length==0){
        throw new Error('title in task should not be empty')
      }
      if(req.body.description!=undefined && req.body.description.length==0){
        throw new Error('description in task should not be empty')
      }
      if(req.body.flag!=undefined && typeof req.body.flag!="boolean"){
        throw new Error('flag should be boolean')
      }
    for(let task of tasks){
        if(task.id==req.params.id){
            let index=tasks.indexOf(task);
            tasks[index]=req.body;
            res.send(tasks);
        }
    }
    throw new Error(`Task with id:${id}doesnt exist`)
  }else{
    throw new Error('No body');
  }
  })

  app.delete('/tasks/:id', (req, res) => {
    for(let task of tasks){
        if(task.id==req.params.id){
            let index=tasks.indexOf(task);
            tasks.splice(index,1);
            res.send(tasks);
        }
    }
    throw new Error(`Task with id:${id}doesnt exist`)
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })