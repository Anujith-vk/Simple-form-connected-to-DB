const mongoose=require('mongoose')

const format=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    branch:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:true
    },
    proof:{
        type:String,
        require:true
    }
})
const Form=mongoose.model('Form',format)
module.exports=Form