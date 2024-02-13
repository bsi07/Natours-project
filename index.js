const fs = require("fs")
const url = require('url')
// const file = fs.readFileSync('../1-node-farm/starter/txt/final.txt','utf-8')
// // console.log(file)
// // const hello = "Hello WORLD"
// // console.log(hello)

// const writeFile = `This is all i know about avocado ${file} written on ${Date.now()}`
// // fs.writeFileSync('../1-node-farm/starter/txt/start.txt',writeFile)
// // console.log("File written")

// //async code

// fs.readFile('../1-node-farm/starter/txt/final.txt','utf-8',(err,data)=>{
//     console.log(data)
// })
// console.log("Reading.............")
// fs.writeFile('../1-node-farm/starter/txt/start1.txt',writeFile,'utf-8',(err,data)=>{
//     console.log("File written")
// })

const http = require("http");
const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/product.html`,'utf-8');
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8');
const products = JSON.parse(data)

const replaceTemplate = require('./starter/modules/replaceTemplate')
const server = http.createServer((req,res)=>{
    
    const {pathname,query} = url.parse(req.url,true)
   

    if(pathname== '/' || pathname == '/overview'){
        res.writeHead(404,{
            'Content-type':"text/html",
        })
        
        const cardsHtml =  products.map((el)=>replaceTemplate(tempCard,el))

        const result = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
        res.end(result)

    } else if(pathname== '/product'){
        res.writeHead(404,{
            'Content-type':"text/html",
        })
       let dataObj = products[query.id];
    let output = replaceTemplate(tempProduct,dataObj)
    res.end(output)

    } else if(pathname== '/api'){
        res.writeHead('200',{
            'Content-type':'application/json'
        })
        res.end(data)
        
    } else{
        res.writeHead(404,{
            'Content-type':"text/html",
            "my-own-header":"Hello world"
        })
        res.end("<h1>Page Not Found</h1>")
    }
})

server.listen(8080,'127.0.0.1',()=>{
    console.log("Listening on port 8080")
})