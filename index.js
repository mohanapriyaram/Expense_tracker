// console.log("priya")
// const http=require('http')
// const { default: mongoose } = require('mongoose')
// const { userInfo } = require('os')
// const { hasUncaughtExceptionCaptureCallback } = require('process')
// console.log("hello")
// http.createServer(function(request,response){
   
// }).listen(8000)

//expense tracker
//adding a new expense/income
// displaying existing expense
// editing existing entries 
// deleting hasUncaughtExceptionCaptureCallbackbudget ReportingObservercreating new userInfo
// validating user

const express=require('express')
const { mongoose } = require('mongoose')
const {Expense} =require('./schema.js')
const app=express()
const bodyparser =require('body-parser')
app.use(bodyparser.json())

async function connectToDb(){
 try{
  await mongoose.connect(`mongodb+srv://mohanapriya:mohanapriyar2004@cluster0.uc9tzda.mongodb.net/Expencetracker?retryWrites=true&w=majority&appName=Cluster0`)
  const port=8000
  app.listen(port,function(){
    console.log(`listening on port ${port}`)
})
 }
catch(error){
  console.log("couldn /'establish connection" )
}
}//mongoose connect is a  synchronous 


connectToDb()
app.post('/addexpense', async function(request,response){
  console.group(request.body)
    try{
   await Expense.create({
      "amount": request.body.amount,
      "category": request.body.category,
      "date": request.body.date
    })
    console.log(request.body)
    response.status(201).json({
      "status":"success",
      "message":"new entry created"
    })
    }
  
    catch(error){
      response.status(500).json({
     "status":"failure",
     "message":"item  couldn't added"
      })
    }
  })
  app.get('/getexpense',async function(request,response){
    try{
      const expenseData = await Expense.find()
      response.status(200).json(expenseData)
      
    }
    catch(error){
      response.status(500).json({
        "status":"failure",
        "message":"couldn/' fetch entry",
        "error":error
      })
    }
  })
   app.delete('/deleteexpense/:id',async function(request,response){
      // console.log(request.params.id)
       const expenseData=Expense.findById(request.params)
      try
        
      {
        if(expenseData){
          await Expense.findByIdAndDelete(request.params.id)
          response.status(200).json({
            "status":"success",
            "message":"deleted entry "
          })
        
          }
          else{
            response.status(200).json({
              "status":"failure",
              "message":"could not delete entry",
              "error":error
            })
          }
      }catch(error){
        response.status(404).json({
          "status":"failure",
          "message":"could not delete entry",
          "error":error
        })
      }
    
      
      
   })
app.patch('/editexpense/:id',async function(request,response){
   
    const expenseentry=await Expense.findById(request.params.id)
    if(expenseentry){
      try{
        await expenseentry.updateOne({
          "amount":request.body.amount,
          "category":request.body.category,
          "date":request.body.date
         })
         response.status(200).json({
          "status":"success",
          "message":"update entry"
          
        })
      }
      catch(error){
        response.status(404).json({
          "status":"failure",
          "message":"could not update entry",
          
        })
      }       
    }
    else{
      response.status(404).json({
        "status":"failure",
        "message":"could not update entry"
        
      })
    }
  
      
    
})











