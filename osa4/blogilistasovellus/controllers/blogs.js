const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const user = request.user;
  const user_id = request.user._id.toString();
  const body = request.body;

  const blogPost = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user_id,
  });

  const newBlog = await blogPost.save();
  user.blogs = user.blogs.concat(newBlog._id);

  await user.save();

  response.status(201).json(newBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const user_id = request.user._id.toString();

  const blogWithUser = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });

  const blogUserId = blogWithUser.user._id.toString();

  if (blogUserId === user_id) {
    await Blog.findByIdAndRemove(blogWithUser._id);
    return response.status(204).end();
  } else {
    return response.status(400).json({
      error:
        "Cannot execute delete. Blog creator does not match with the token owner!",
    });
  }
});

blogsRouter.put("/:id", userExtractor, async (request, response) => {
  const user_id = request.user._id.toString();

  const blogWithUser = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });

  const blogUserId = blogWithUser.user._id.toString();

  if (blogUserId === user_id) {
    const { title, author, url, likes } = request.body;
    await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: "query" }
    );

    response.status(204).end();
  } else {
    return response.status(400).json({
      error:
        "Cannot execute update. Blog creator does not match with the token owner!",
    });
  }
});

module.exports = blogsRouter;
