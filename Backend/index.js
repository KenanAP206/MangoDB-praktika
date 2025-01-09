const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const cors=require("cors")
const dotenv=require("dotenv")
let mongoose=require("mongoose")

app.use(bodyParser.json())
app.use(cors())
dotenv.config()


app.get("/",(req,res)=>{
     res.send("Welcome to my MangoDB")   
})

const carSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  modelName: { type: String },
  year: { type: Number },
  color: { type: String},
  isNew: { type: Boolean }
});

const CarModel = mongoose.model('Car', carSchema);

app.get("/cars", async (req,res)=>{
    let cars= await CarModel.find()
    res.send(cars)
})

app.get("/cars/:id",async (req,res)=>{
    let id=req.params.id
    let mycar= await CarModel.findById(id)
    res.send({
        message:"Success GetById",
        data:mycar
    })
})


app.delete("/cars/:id", async  (req,res)=>{
    let {id}=req.params
   await CarModel.findByIdAndDelete(id)
   res.send({
    message:"Success Delete",
})
})

app.post("/cars", async (req,res)=>{
    let newCar= CarModel(req.body)
   await newCar.save()
   res.send({
     message:"Success Post",
     data:req.body
   })
})


mongoose.connect(process.env.ConnectionString)
.then(()=>{
    console.log("connected")
})

app.listen(3311,()=>{
    console.log("Server 3311 portundan oxunur")
})