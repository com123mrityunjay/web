const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const employeeSchema = new mongoose.Schema({
    id: {
        type:Number,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    cpassword: {
        type:String,
        required:true
    }
}) 
employeeSchema.pre("save", async function(next){
    if(this.isModified("password")){
        
        this.password = await bcrypt.hash(this.password,10);
        
    }    
    this.cpassword = undefined;
    next();
    
})
const Register = new mongoose.model("Register",employeeSchema);
module.exports= Register;
