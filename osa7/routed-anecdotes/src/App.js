import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useField } from "./hooks";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Menu = ({ anecdotes, addNew, anecdoteById, msg }) => {
  return (
    <Router>
      <Nav justify variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link as={Link} to="/" href="/">
            Anecdotes
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/create" eventKey="link-1">
            Create anecdote
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/about" eventKey="link-2">
            About
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Routes>
        <Route
          path="/"
          element={<AnecdoteList anecdotes={anecdotes} msg={msg} />}
        />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/anecdotes/:id"
          element={
            <SingleAnecdote anecdotes={anecdotes} anecdoteById={anecdoteById} />
          }
        />
      </Routes>
    </Router>
  );
};

const AnecdoteList = ({ anecdotes, msg }) => {
  return (
    <div>
      {msg ? <Notification msg={msg} /> : null}
      <h2>Anecdotes</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Index</th>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {anecdotes.map((anecdote) => (
            <tr key={anecdote.id}>
              <td>{anecdotes.indexOf(anecdote) + 1}</td>
              <td>
                <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
              </td>
              <td>{anecdote.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const Notification = ({ msg }) => {
  return <Alert variant="success">{msg}</Alert>;
};

const About = () => (
  <Card>
    <h2>About anecdote app</h2>
    <Card.Body>
      <Card.Title>According to Wikipedia:</Card.Title>
      <Card.Text>
        An anecdote is a brief, revealing account of an individual person or an
        incident. Occasionally humorous, anecdotes differ from jokes because
        their primary purpose is not simply to provoke laughter but to reveal a
        truth more general than the brief tale itself, such as to characterize a
        person by delineating a specific quirk or trait, to communicate an
        abstract idea about a person, place, or thing through the concrete
        details of a short narrative. An anecdote is "a story with a point."
      </Card.Text>
      <Card.Text>
        Software engineering is full of excellent anecdotes, at this app you can
        find the best and add more.
      </Card.Text>
    </Card.Body>
  </Card>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const { clearValue: clearContent, ...content } = useField("text");
  const { clearValue: clearAuthor, ...author } = useField("text");
  const { clearValue: clearInfo, ...info } = useField("text");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  const clearInputFields = () => {
    clearContent();
    clearAuthor();
    clearInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            {...content}
            placeholder="To be efficient, is not to be deficient"
            name="submit"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author </Form.Label>
          <Form.Control
            {...author}
            placeholder="Jack Danielsson"
            name="submit"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>url for more info</Form.Label>
          <Form.Control
            {...info}
            placeholder="Jackson.net"
            name="submit"
          ></Form.Control>
        </Form.Group>
        <Button variant="success" onClick={handleSubmit}>
          Create
        </Button>
        <Button variant="secondary" onClick={clearInputFields}>
          Clear
        </Button>
      </Form>
    </div>
  );
};

const SingleAnecdote = ({ anecdotes, anecdoteById }) => {
  const anecId = parseInt(useParams().id);

  const anecdote = anecdoteById(anecId);

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more see info <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [msg, setMsg] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    handleNotification(anecdote.content);
  };

  const handleNotification = (anecdote) => {
    setMsg(`a new anecdote ${anecdote} created!`);
    setTimeout(() => {
      setMsg("");
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div className="container">
      <h1>Software anecdotes</h1>
      <Menu
        anecdotes={anecdotes}
        addNew={addNew}
        anecdoteById={anecdoteById}
        msg={msg}
      />
      <Footer />
    </div>
  );
};

export default App;
