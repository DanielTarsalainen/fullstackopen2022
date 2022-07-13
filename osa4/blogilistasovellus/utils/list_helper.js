var lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) =>
  blogs.reduce((prev, curr) => prev + curr.likes, 0);

const favoriteBlog = (blogs) =>
  blogs.find(
    (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
  );

const mostBlogs = (blogsArray) =>
  lodash.maxBy(
    blogsArray.reduce((allBlogs, singleBlog) => {
      const tryToFind = allBlogs.find(
        (element) => element.author === singleBlog.author
      );
      if (tryToFind) {
        const i = allBlogs.indexOf(tryToFind);
        allBlogs.splice(i, 1, {
          author: tryToFind.author,
          blogs: (tryToFind.blogs += 1),
        });
      } else {
        const obj = { author: singleBlog.author, blogs: 1 };
        allBlogs.push(obj);
      }
      return allBlogs;
    }, []),
    function (o) {
      return o.blogs;
    }
  );

const mostLikes = (blogsArray) =>
  lodash.maxBy(
    blogsArray.reduce((allBlogs, blog) => {
      const tryToFind = allBlogs.find(
        (element) => element.author === blog.author
      );

      if (tryToFind) {
        const i = allBlogs.indexOf(tryToFind);
        allBlogs.splice(i, 1, {
          author: blog.author,
          likes: (tryToFind.likes += blog.likes),
        });
      } else {
        const obj = { author: blog.author, likes: blog.likes };
        allBlogs.push(obj);
      }

      return allBlogs;
    }, []),
    function (o) {
      return o.likes;
    }
  );

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
