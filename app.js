//a web server using expressjs
const express=require('express')
//step1-import the package-mongoose
let mongoose=require('mongoose')
const cors=require('cors')
let products=require('./products')
const app=express();
app.use(cors())
app.use(express.json())
const port=3000;

//step2-->establish a connection


async function connection(){
   await mongoose.connect('mongodb://localhost:27017/silconecommerce')
}

//step3-create a schema

let productschema=new mongoose.Schema({
    title:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true}
})

//s4-model
let productmodel=mongoose.model('products',productschema)

//api which send the  products  as a response
app.get('/products',(req,res)=>{
  res.json(products)
})

//api they will send the details i have to store it

app.post('/products',(req,res)=>{
  const {id,title,image,price}=req.body
  let newproduct={id,title,image,price}
  products.push(newproduct)
  res.json({"msg":"products are added succesfully"})
})

//http://localhost:3000/products/9/user/91
app.get('/products/:n',(req,res)=>{
    let id=req.params.n
  res.json(products[id-1])
})

app.listen(port,async ()=>{
    console.log(`the server is running on ${port}`)
await connection();
let finaldata= await productmodel.create({})
console.log("db is connected")
console.log(finaldata)

})