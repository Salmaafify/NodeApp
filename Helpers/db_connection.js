const mongoose = require('mongoose');
 //const dbUrl = 'mongodb://127.0.0.1:27017/Users-Api';
//const dbUrl = "mongodb+srv://SalmaMongo:SalmaMongo123@cluster0.06n0o.mongodb.net/Users-Api?retryWrites=true&w=majority"
const dbUrl = 'mongodb+srv://SalmaMongo:SalmaMongo123@cluster0.06n0o.mongodb.net/Users-Api?retryWrites=true&w=majority'
mongoose.connect(dbUrl,{useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true, 
    useFindAndModify:false})