// This is the main file of this api
require('dotenv').config()
const http=require('http')

const url=require('url')
const server=http.createServer(function(req,res){
    const parsedUrl=url.parse(req.url,true)
    const path=parsedUrl.pathname
    const trimmedPath=path.replace(/^\/+|\/+$/g,'')
   const method=req.method.toLowerCase()
    res.end('my name is Micheal Opeyemi Awoniran\n')
    console.log(method, trimmedPath)
})
const port=process.env.PORT||50000

server.listen(port,(req,res)=>{
    console.log(`server listening on port ${port}`)
})