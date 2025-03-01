const express = require ("express");
const app = express();
const formidable = require("express-formidable");
const { request } = require("http");
const fs = require("fs").promises;

app.use(express.static("public"))
app.use(formidable());

app.get("/", (req, response) => {
    console.log("Hello console");

    response.status(200).send("Hello World!");
    console.log("Hello word again ");
  });

  app.get("/get-posts", (req, response) => {
    
    fs.readFile(__dirname + "/data/posts.json")
    .then(file => {
        const blogpost = JSON.parse(file);
        response.status(200).send(blogpost);
        //console.log(blogpost);
  })
  //express.response.status(200).send(blogpost);
});
    
  

  app.post("/create-post", (request, response) => {
    newBlogpost = request.fields.blogpost;
    fs.readFile(__dirname + "/data/posts.json")
    .then(file => {
        const blogposts = JSON.parse(file);
        const newTimestamp = Date.now();
        blogposts[newTimestamp] = newBlogpost;
        fs.writeFile(
            __dirname + "/data/posts.json",
             JSON.stringify(blogposts)
            ).then(() => {
                response.status(200).send({"message":newBlogpost});
        });
     

        });
  
});
    

app.listen(3000, () => {
    console.log("Server is listening on port 3000. Ready to accept requests!");
  });