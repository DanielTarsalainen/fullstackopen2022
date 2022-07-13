const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const initialBlogs = [
  {
    title: "How to win",
    author: "Daniel Tarsalainen",
    url: "http://123.com",
    likes: 10,
    _id: "62cecd97e5df7e239fa1e103",
    user: "62cecd97e5df7e239fa1e199",
  },
  {
    title: "How to win more",
    author: "Jack Jackson",
    url: "http://123.com",
    likes: 10,
    _id: "62cecd97e5df7e239fa1e104",
    user: "62cecd97e5df7e239fa1e200",
  },
];

const initialUsers = [
  {
    username: "danukka",
    name: "Daniel Tarsalainen",
    password: "tosisalainen",
    _id: "62cecd97e5df7e239fa1e199",
  },
  {
    username: "jackson",
    name: "Jack Jackson",
    password: "salainen",
    _id: "62cecd97e5df7e239fa1e200",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  return users.map((user) => user.toJSON());
};

const testToken = async () => {
  const username = "danukka";

  const user = await User.findOne({ username });

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  token = jwt.sign(userForToken, process.env.SECRET);

  return token;
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
  testToken,
};
