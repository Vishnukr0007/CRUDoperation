const  express=require('express')
const app=express();
const port=3000;
const UserModel=require('./model/user')
const Cors=require('cors')
const mongoose=require('mongoose')
app.use(express.json())
app.use(Cors())
mongoose.connect('mongodb://localhost:27017/store ')
.then((res)=>{
    console.log('mogodb connected succesfully')
})
.catch((err)=>{
    console.log(err);
    
}) 
  app.post('/userpost',async(req,res)=>{
    try{
        const{name,email,phone,age}=req.body;
        const newUser=await UserModel.create({name,email,phone,age});
        res.status(201).json(newUser)
    }catch(error){
        res.status(500).json({error:error.message})
    }
    
    
})

app.get('/userget',async(req,res)=>{
    try{
        const users=await UserModel.find();
        res.json(users);
    }catch(error){
  res.status(500).json({error:error.message});
    }
})

app.get('/data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT route 
app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email,phone, age } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(id, { name, email,phone, age }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/userdelete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await UserModel.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  



app.listen(port,()=>{
console.log(`server is running on :${port}`);
 
    })