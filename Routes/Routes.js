const express = require('express')
const router = express.Router()
const todolist = []

router.get('/',(req,res)=>{
    res.send({TodoList:todolist})
})

router.post('/add',(req,res)=>{
    const data = req.body
    const duplicate = todolist.find((ele)=> ele.id===data.id)
    if(duplicate){
        res.send('enter unique id')
    }
    else{
    todolist.push(data)
    res.send("Data stored successfully")
    }
})

router.get('/:id',(req,res)=>{
    const id = +req.params.id
    const data = todolist.find((ele)=> ele.id===id)
    if(data){
        res.send(data)
    }else{
        res.send('no data exist')
    }
})


module.exports = router;