import express from "express"
import mongoose, { Schema } from "mongoose";

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = 3000   
mongoose.connect(
  `mongodb+srv://anantttiwari03:anant@cluster0.co1tf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error', error);
});

const dataSchema = new mongoose.Schema({
  name: String,
  email:String
})

const data = mongoose.model("data", dataSchema)



app.get('/find', async (req, res) => {
try{
  const info = await data.find().select("-_id")
  res.json(info)
}
catch{
  res.status(500).json({ error: "Failed to fetch data" });
}
})

app.post("/data", (req, res)=>{
  const {name, email} =  req.body;
  // console.log(name)
const product = new data({name, email})
product.save()
res.json(product)
})

app.delete("/delete/:id", async (req,res)=>{
  try{
  const id  = req.params.id
  const product =  await data.findByIdAndDelete(id)
  res.json(product);
  }
  catch{
  res.status(500).json({ error: "Failed to delete data" });

  }
})

app.listen(port, () => {
  console.log(`Example app listening on port is ${port}`)
})