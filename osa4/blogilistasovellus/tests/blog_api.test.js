const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const token = { value: "" };

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  // Option #1
  // const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  // const promiseArray = blogObjects.map((blog) => blog.save());
  // await Promise.all(promiseArray);

  // Option #2 (keeps the order)
  // for (let blog of helper.initialBlogs) {
  //   let blogObject = new Blog(blog);
  //   await blogObject.save();

  // Option #3 quickest way using mongoose
  await Blog.insertMany(helper.initialBlogs);
  await User.insertMany(helper.initialUsers);

  token.value = await helper.testToken();
});

describe("returned data is valid", () => {
  test("object identifier must be named 'id'", async () => {
    let databaseData = await helper.blogsInDb();

    databaseData.map((object) => expect(object.id).toBeDefined());
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("A specific note is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");
    const contents = response.body.map((r) => r.title);

    expect(contents).toContainEqual("How to win");
  });
});

describe("addition of a new blog", () => {
  test("a valid note can be added ", async () => {
    const newBlog = {
      title: "How to always win part 3",
      author: "Jack Jackson",
      url: "http://123.com",
      likes: 10,
      user: "62cebc2c036763d56a69e310",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token.value)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((r) => r.title);

    expect(contents).toContainEqual("How to always win part 3");
  });

  test("Default is 0 if likes isnt set", async () => {
    const newBlog = {
      title: "How to always win part 4",
      author: "Jack Jackson",
      url: "http://123.com",
      user: "62cebc2c036763d56a69e310",
    };

    const newObj = new Blog(newBlog);

    expect(newObj.likes).toEqual(0);

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token.value)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    const foundObj = blogsAtEnd.find((obj) => obj.title === newBlog.title);

    expect(foundObj.likes).toEqual(0);
  });

  test("If title and url arent included, response is 400 Bad Request", async () => {
    const newBlog = {
      title: "",
      author: "Jack Jackson",
      url: "",
      likes: 102,
      user: "62cebc2c036763d56a69e310",
    };
    const newObj = new Blog(newBlog);

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token.value)
      .send(newObj)
      .expect(400);
  });

  test("If token isn't included, a blog wont be added and 401 Unauthorized is returned", async () => {
    const newBlog = {
      title: "How to always win part 4",
      author: "Jack Jackson",
      url: "http://123.com",
      likes: 50,
      user: "62cebc2c036763d56a69e310",
    };

    const newObj = new Blog(newBlog);

    await api.post("/api/blogs").send(newObj).expect(401);

    const blogsAtEnd = await helper.blogsInDb();

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).not.toContainEqual("How to always win part 4");
  });
});

describe("deletion of a note", () => {
  test("A blog gets removed and returns 204, a blog cannot be found from db afterwards", async () => {
    const blogsInTheBeginning = await helper.blogsInDb();

    const selectedBlog = blogsInTheBeginning[0];

    await api
      .delete(`/api/blogs/${selectedBlog.id}`)
      .set("Authorization", "bearer " + token.value)
      .expect(204);

    const blogsInTheEnd = await helper.blogsInDb();

    expect(blogsInTheEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsInTheEnd.map((blog) => blog.title);

    expect(titles).not.toContain(selectedBlog);
  });
});

describe("update of a note", () => {
  test("a blog can be updated (doesnt find the new title from old titles, returns 204 when update is made, new titles contain the updated title", async () => {
    const blogsInTheBeginning = await helper.blogsInDb();
    const selectedBlog = blogsInTheBeginning[0];

    const newTitle = "How to win in life";

    const oldTitles = blogsInTheBeginning.map((obj) => obj.title);

    expect(oldTitles).not.toContain(newTitle);

    selectedBlog["title"] = newTitle;

    await api
      .put(`/api/blogs/${selectedBlog.id}`)
      .set("Authorization", "bearer " + token.value)
      .send(selectedBlog)
      .expect(204);

    const blogsInTheEnd = await helper.blogsInDb();

    const newTitles = blogsInTheEnd.map((blog) => blog.title);

    expect(newTitles).toContainEqual(newTitle);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
