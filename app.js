const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");

let models = require("./models");

app.engine("mustache", mustacheExpress());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "mustache");

app.get("/", function(req, res) {
  res.render("blog");
});

app.get("/posts", function(req, res) {
  models.Post.findAll().then(function(list) {
    res.render("blog", { posts: list });
  });
});

app.get("/updatePost/:id", function(req, res) {
  let id = req.params.id;
  models.Post.findOne({
    where: {
      id: id
    }
  }).then(function(post) {
    res.render("updatePost", { post: post });
  });
});

app.get("/posts/:category", (req, res) => {
  let category = req.params.category;

  models.Post.findAll({
    where: {
      category: category
    }
  }).then(function(post) {
    res.render("blog", { posts: post });
  });
});

app.post("/addPost", function(req, res) {
  let post = {
    title: req.body.title,
    body: req.body.body,
    category: req.body.category,
    isPublished: true
  };

  models.Post.create(post).then(function() {
    res.redirect("/posts");
  });
});

app.post("/updatePost", function(req, res) {
  let updatedPost = {
    title: req.body.title,
    body: req.body.body,
    category: req.body.category,
    isPublished: true
  };

  models.Post.findOne({
    where: {
      id: req.body.postId
    }
  }).then(function(post) {
    post.update(updatedPost);
    res.redirect("/posts");
  });
});

app.post("/deletePost", function(req, res) {
  let postId = req.body.postId;
  models.Post.findOne({
    where: {
      id: postId
    }
  })
    .then(function(list) {
      return list.destroy();
    })
    .then(function() {
      res.redirect("/posts");
    });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
