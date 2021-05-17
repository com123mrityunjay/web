const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/StaffRegistration", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log(`Connection Successfull`);
}).catch((e) => {
    console.log(`No Connection`);
})