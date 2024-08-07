import express from 'express'
import webSocket from 'ws'

const app = express()
const wss = new webSocket.Server({port:3000})
app.use(express.static('templates'))
wss.on('connection',(ws)=>{
    console.log("User connection")
    ws.on("message",(context)=>{
       const msg = context.toString()
       console.log(msg)
       wss.clients.forEach((client)=>{
        if(client.readyState === webSocket.OPEN){
            client.send(msg)
        }
       })
    })
    ws.on("close",(context)=>{
        console.log(`user was disconnect`)
    })
})

app.get("/",(req,res,next)=>{
    res.sendFile("C:/Users/CAMT/Desktop/network/express-ws/templates/chat.html")
})

app.listen(3100,()=>console.log(`Server is running on port:${3100}`))