const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});

let posts = [
  new Post("title of post", "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.", "There are many variations of passages of Lorem Ipsum available")
];
function Post(title, body, preview) {
    this.title = title
    this.body = body
    this.preview = preview
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

app.get("/post/:postName", function(req, res){
  console.log(req.params.postName.replace(/-/g, ' '));
  for (var i = 0; i < posts.length; i ++){
    if (posts[i].title === req.params.postName.replace(/-/g, ' ')){
      res.render("post", {
        post: posts[i]
      });
    }

  }
});

app.post("/compose", async function(req, res){
  const post = new Post(req.body.title, req.body.body, req.body.body.slice(0, 100) +"...");
  posts.push(post);
  res.redirect("/");
});

app.post("/post")
