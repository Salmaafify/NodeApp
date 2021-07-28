require('./Helpers/db_connection');
const express = require('express'); //for router
const morgan = require('morgan'); 
const multer = require('multer');
const userRouter = require('./Routers/userRouter')
const cors = require('cors')
// const fileApload = require('express-fileupload')

///////////////////////////////////////////////////////////////////
const port = 4000;
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
// app.use(fileApload)
app.use('/',express.static('index.html'))
app.use('/uploads',express.static('uploads'));
app.use('/api',userRouter)

app.use((err,req,res,next)=>{
    res.status(500).json({'msg':err})
})
//////////////////////////////////////////////////////////////////
app.listen(port,()=>{
    console.log('Server Is Listening On Port '+port)
})



