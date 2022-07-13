const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a new username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "danukka",
      name: "Daniel Tarsalainen",
      password: "tosisalainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);

    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username is already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "tosisalainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");

    const usersAtTheEnd = await helper.usersInDb();

    expect(usersAtTheEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if username is not long enough", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ro",
      name: "Superuser",
      password: "tosisalainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtTheEnd = await helper.usersInDb();

    expect(usersAtTheEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if password is not long enough", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "rollo",
      name: "Superuser",
      password: "sa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password must be at least 3 characters long"
    );

    const usersAtTheEnd = await helper.usersInDb();

    expect(usersAtTheEnd).toHaveLength(usersAtStart.length);
  });
});
