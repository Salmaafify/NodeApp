const userRouter = require('express').Router()
const User = require('../Models/userModel');
const multer = require('multer');
///////////////////////////////////////////////////////////////////////////////////////
//storage
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

// uploads Image
const  uploads = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined,true)
    }
})
//uploads.single('image'),
// ,uploads.single('userImage')
//////////////////////////////////////////////////////////////////
userRouter.post('/users',uploads.single('userImage'),async(req,res)=>{
//   var imgPath = req.file.path;
//   var image = User.image.data = fs.readFileSync(imgPath);
//   User.image.contentType = 'image/jpg';
// const file = req.files.userImage
// file.mv()
console.log(req.file)
    var obj = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        userImage:  req.file.path
    }
    const user = new User(obj);
    //req.user.image = req.file.buffer
    try{
        await user.save();
        res.status(201).json(user);
    }
    catch(error){
        res.status(400).json(error)
    }
})
////////////////////////////////////////////////////////////////////
userRouter.get('/users',(req,res)=>{
    if(req.query.name){
        console.log(req.query.name)
        User.find({name:req.query.name}).then((user)=>{
            res.status(200).json(user)
        }).catch((error)=>{
            res.status(500).json(error)
    })
}
else{
   
    User.find({}).then((users)=>{
        res.status(200).json(users)
    }).catch((error)=>{
        res.status(500).json(error)
    })
}
})
//////////////////////////////////////////////////////////////////////
userRouter.get('/users/:id',(req,res)=>{
    const _id = req.params.id;
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).json("This User Is Not Found")
        }
        res.status(200).json(user)
    }).catch((error)=>{
        res.status(500).json(error)
    })
})
////////////////////////////////////////////////////////////
// userRouter.get(`/users?name`,(req,res)=>{
//     //const name = req.query
//     console.log(req.query)
// })
///////////////////////////////////////////////////////////////////
userRouter.patch('/users/:id',uploads.single('userImage'),async(req,res)=>{
    const updates = Object.keys(req.body);
    const _id = req.params.id;
    console.log(updates)
    console.log(req.file)
    try{
        const user = await User.findById(_id);
        updates.forEach((update)=>{
            user[update] = req.body[update]
    })
       if(req.file){
        user.userImage = req.file.path;
       }
        
        await user.save()
        if(!user){
            res.status(404).json("No User Is Found")
        }
        res.status(200).json(user)
    }
    catch(error){
        res.status(400).json(error)
    }
})
////////////////////////////////////////////////////////////////
userRouter.delete('/users/:id',async(req,res)=>{
    const _id = req.params.id;
    try{
        const user = await User.findByIdAndDelete(_id);
        if(!user){
            res.status(404).json("No User Is Found")
        }
        res.status(200).json(user)
    }
    catch(error){
        res.status(400).json(error)
    }
})


////
// userRouter.post('/users/image',uploads.single('image'),async(req,res)=>{
//     try{
//         req.user.image = req.file.buffer
//         await req.user.save()
//         res.send()
//     }catch(e){
//         res.send(e)
//     }
// })

// const upload = multer({dest:'uploads/'}).single("demo_image");
// userRouter.post("/image", (req, res) => {
//     upload(req, res, (err) => {
//      if(err) {
//        res.status(400).send("Something went wrong!");
//      }
//      console.log(req.file)
//      res.send(req.file);
//    });
//  });

module.exports = userRouter;