const express = require('express')
const router = express.Router()
const todoList = require('../Model/TodolistSchema')

router.get('/',async(req,res)=>{
    const data = await todoList.find()
    console.log(data)
    res.send({TodoList:data})
})

router.post('/add',async (req,res)=>{ 
    const data = await todoList.find()
    const exsisting = data.find((ele)=> ele.id == +req.body.id)
    if(exsisting){
        res.send('duplicate data found')
    }
    else{
        const result = await todoList.create(req.body)
        res.send({
            message:'data added successfully',
            data:result
        })
    }
})

router.get('/:id',async (req,res)=>{
    const id = req.params.id
    const data = await todoList.find({id:id})
    if(data){
        res.send(data)
    }else{
        res.send('no data exist')
    }
})


module.exports = router;