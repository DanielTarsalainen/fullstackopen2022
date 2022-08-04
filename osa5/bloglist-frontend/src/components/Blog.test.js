import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const user = {
  name: "Jakki Heikkinen",
};

test("renders title and author by default, nothing else", () => {
  const blog = {
    title: "How to become a competent programmer",
    likes: "12",
    author: "Daniel Johansson",
    url: "DanielJohansson.net",
    user,
  };

  render(<Blog blog={blog}></Blog>);

  const title_and_author = screen.getByText(
    "How to become a competent programmer Daniel Johansson"
  );

  const url = screen.queryByText("DanielJohansson.net");
  const likes = screen.queryByText("12");

  expect(title_and_author).toBeDefined();
  expect(url).toBeNull();
  expect(likes).toBeNull();
});

test("url and likes are shown, when 'view'-button is pressed", async () => {
  const blog = {
    title: "How to become a competent programmer pt.2",
    likes: "10",
    author: "Daniel Johansson",
    url: "DanielJohansson.net",
    user,
  };

  render(<Blog blog={blog} showAllInfo={true} />);

  const likes = await screen.findByText("10");
  const url = await screen.findByText("DanielJohansson.net");

  expect(likes).toBeDefined();
  expect(url).toBeDefined();
});

test("when like-button is pressed twice, event handler responsible for likes, is fired two times", async () => {
  const blog = {
    title: "How to become a competent programmer pt.2",
    likes: "10",
    author: "Daniel Johansson",
    url: "DanielJohansson.net",
    user,
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} showAllInfo={true} onUpdate={mockHandler} />);

  const mockUser = userEvent.setup();

  const button = screen.getByText("like");

  await mockUser.dblClick(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("when blog is created, callback function is called with valid information", async () => {
  const mockUser = userEvent.setup();
  const createBlog = jest.fn();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  const createButton = screen.getByText("create");

  const title = container.querySelector("#title");
  const author = container.querySelector("#author");
  const url = container.querySelector("#url");

  await mockUser.type(title, "How to become a competent programmer pt.2");
  await mockUser.type(author, "Daniel Johansson");
  await mockUser.type(url, "DanielJohansson.net");

  await mockUser.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    "How to become a competent programmer pt.2"
  );
  expect(createBlog.mock.calls[0][0].author).toBe("Daniel Johansson");
  expect(createBlog.mock.calls[0][0].url).toBe("DanielJohansson.net");
});
