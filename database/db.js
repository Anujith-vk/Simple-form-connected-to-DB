const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/FIRST_COMPLETE_PROJECT')
.then((result)=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY");  

})
.catch((err)=>{
    console.log("ERROR WHILE CONNECTING THE DATABASE");
})
module.exports=mongoose