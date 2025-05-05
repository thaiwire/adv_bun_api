import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";  // bun add @elysiajs/cors
import {swagger} from "@elysiajs/swagger"; // bun add @elysiajs/swagger
import {staticPlugin} from "@elysiajs/static"; // bun add @elysiajs/static

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(staticPlugin(
    {
      prefix: "/uploads",
      assets: "./uploads",  
  }))

  .get("/", () => "Hello Elysia")
  .get("/hello", () => {
    return "Hello Elysia by API";
  })
  .get("/json-data", () => {
    return {message: "Hello Elysia by JSON"};
  })
  .get('/hello/:name', ({ params }) => {
    return {name : params.name}
  })
  .get('/hello/:name/:age', ({ params }) => {
    const name = params.name;
    const age = params.age;
    return {
      name: name,
      age: age
    }
  })
  .get('/api/person/:id/:name', ({ params } : {
    params :{
      id: string;
      name: string;
    }}) => {
    const id = params.id;
    const name = params.name;
    return {
      name: name,
      id : id 
    }
  })
  .get('/customers/query', ({ query } : {
    query : {
      age: number;
      name: string;
    }
  }) => {
    const age = query.age;
    const name = query.name;
    return {
      name: name,
      age : age
    }
  })

  // post request
  .post('/book/create', ({ body } :{
    body : {
      id: string;
      name : string;
      price : number
    }
  }) => {
    const id = body.id;
    const name = body.name;
    const price = body.price;
    return {
      id: id,
      name: name,
      price: price
    } 
  })    
  // put request
  .put('/book/update/:id', ({ params, body } :{
    params : {
      id: string;
    },
    body : {      
      name : string;
      price : number
    }
  }) => {
    const id = params.id;
    const name = body.name;
    const price = body.price;
    return  {message : "Book updated successfully"}
     
  })

  // delete request
  .delete('/book/delete/:id', ({ params } :{
    params : {
      id: string;
    }
  }) => {
    const id = params.id;
    return {message : "Book deleted successfully"}
  })
  // file upload
  .post('/upload-file', ({ body } : {
    body : {
      file: File;
    }
  }) => {
    Bun.write('uploads/' + body.file.name, body.file);
    return {message : "File uploaded successfully"}
  })
  // write file
  .get('/write-file', () => {
    Bun.write('uploads/test.txt', 'Hello Elysia');
    return {message : "File written successfully"}
  })
  // read file
  .get('/read-file', () => {
    const file = Bun.file('uploads/test.txt');
    return  file.text()
  })   

  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
