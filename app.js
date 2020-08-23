const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});

let posts = [];
function Post(title, body) {
    this.title = title
    this.body = body;
}

app.get("/", function(req, res) {
  res.render("home", {
    posts: posts
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.post("/compose", function(req, res){
  const post = new Post(req.body.title, req.body.body);
  posts.push(post);
  res.redirect("/");
});
