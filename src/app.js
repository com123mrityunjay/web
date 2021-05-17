const express = require("express");
const path = require("path"); 
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
require("dotenv").config();
require("./db/conn");
const register= require("./models/register");
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("elect"));
//console.log(path.join(__dirname, "../public"));
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);
app.get("/", (req,res) => {
    res.render("login")
});
app.get("/register", (req,res)=>{
    res.render("register");
})
app.post("/register", async (req,res)=>{
    try {

        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if(password === cpassword)
        {
            const staffRegister = new register({
                id: req.body.id,
                password: password,
                cpassword: cpassword                
            })
            const registered = await staffRegister.save();
            res.status(201).render("login");
        }
        else{
            res.send("Passwords don't match.");
        }
    } catch(error) {
        res.status(400).send(error);
    }
    
})
app.post("/login", async(req,res)=>{
    try {
       const id = req.body.id;
       const password = req.body.password;     
       const userid = await register.findOne({id});
       const isMatch = await bcrypt.compare(password,userid.password);
       if(isMatch){
        res.status(201).render("home");           
       }else{
           res.send("Invalid Credentials");
       }

    } catch (error) {
        res.status(400).send("Invalid Credentials")
        
    }
})
app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});