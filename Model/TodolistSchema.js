const mongoose = require('mongoose')

const todoList = mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    item:{
        type:String,
        required:true
    },
    isPurchased:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model('todolist',todoList)