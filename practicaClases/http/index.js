import http from "http";
//res => respuestas - req => request
const server = http.createServer((req, res)=>{
    res.setHeader("Content-Type", "text/plain");

    if(req.method==="GET"&&req.url==="/"){
        res.end("hola");
    }else if(req.method==="GET"&&req.url==="/api/products"){
        res.end("Lista de productos");
    }
});

server.listen(8080,()=>{
    console.log("servidor inciado correctamente");
});