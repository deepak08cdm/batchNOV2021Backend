const express = require('express')
const router = express.Router()
const todoList = require('../Model/TodolistSchema')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = 'C:/Users/Deepak Sharma/Desktop/batch/backend/Routes/logs.txt'

function middlewareCheck (req,res,next){
    const {Authentication} = req.cookies
    const token = Authentication.split(' ')[1]
    if(!token){
        res.status(401).send('unable to access')
    }
    else{
        jwt.verify(token,'bhjasvcablaca15d1v51a5sv486a61qw611F65FB6551SV654f65a4f89WF32A16C4W6D4V',function (err, decode){
            console.log('error',err)
            console.log('decode',decode)
            if(decode){
                next()
            }
            else{
                res.status(403).send('unautherized access')
            }
        })
    }
}
router.post('/login',(req,res)=>{
    const body = req.body
    if(body.username==='deepak' && body.password==='deepak@123'){
    const token = jwt.sign(body,'bhjasvcablaca15d1v51a5sv486a61qw611F65FB6551SV654f65a4f89WF32A16C4W6D4V')
    res.cookie('Authentication',`Bearer ${token}`,{expires:new Date(Date.now()+3600000)})
    res.send('user authenticated successfully')}
    else{
        res.cookie('Authentication',`Bearer`,{expires:new Date(Date.now()+3600000)})
        res.status(403).send('unautherized user')
    }
})
router.get('/',middlewareCheck,async(req,res)=>{
    // fs.readFile(path, 'utf8', (err,data)=>{
    //     console.log(data)
    //     fs.writeFile(path,data+"enter the content here!",(err)=>{
    //         console.log(err)
    //     })
    // })
    const data = await todoList.find()
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
router.post('/',(req,res)=>{
    console.log('post call')
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