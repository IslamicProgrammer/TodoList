import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  Input,
  InputGroup,
  Row,
  Col,
  InputGroupAddon,
  ButtonGroup,
  Button,
  ListGroup,
  ListGroupItem,
  UncontrolledAlert,
  Progress,
  Jumbotron,
} from "reactstrap";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      todo: "",
      todos: [],
      progressStatus: 0,
      time: "",
    };
  }

  setInput = (e) => {
    this.setState({
      todo: e.target.value,
    });
  };

  addTodo = () => {
    let todo = {
      id: this.state.id,
      todo: this.state.todo,
      isComplete: false,
    };

    this.setState({
      todos: [...this.state.todos, todo],
      todo: "",
      id: this.state.id + 1,
    });
    this.progress();
  };

  enterClick = (e) => {
    if (e.code === "Enter") {
      this.addTodo();
    }
    this.progress();
  };

  deleteTodo = (index) => {
    console.log(this.state.todos);
    this.setState({
      todos: this.state.todos.filter((item) => {
        if (item.id !== index) {
          return item;
        }
        item.isComplete = !item.isComplete;
      }),
    });
    this.progress();
  };

  completed = (indeks) => {
    console.log(indeks);
    let filteredTodos = this.state.todos.filter((todo) => {
      if (indeks === todo.id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    this.setState({
      todos: filteredTodos,
    });
  };

  progress = () => {
    let completedTodos = this.state.todos.filter((todo) => {
      if (todo.isComplete) {
        return todo;
      }
    });
    let markedElements = completedTodos.length;
    let allElements = this.state.todos.length;
    let progressLength = (markedElements * 100) / allElements;
    this.setState({
      progressStatus: progressLength,
    });
  };

  render() {
    return (
      <>
        <Jumbotron>
          <Container>
            <h1 className="display-3">Hello dear😄</h1>
            <p className="lead">
              Welcome to Murodjon`s Todo app. You will not forget anything here
              😎
            </p>
            <hr className="my-2" />
            <p className="lead">
              <a
                color="primary"
                className="btn btn-success"
                href="https://oversite.netlify.app"
                target="_blank"
              >
                Visit website
              </a>
            </p>
          </Container>
        </Jumbotron>
        <Container>
          <Row className="mt-4">
            <Col mt={5} md="12" className="mx-auto">
              <InputGroup>
                <Input
                  placeholder="Type your focus here"
                  onChange={this.setInput}
                  onKeyPress={this.enterClick}
                  value={this.state.todo}
                />
                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.addTodo}>
                    Add
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col mt={5} md="12" className="mx-auto">
              <ListGroup>
                {this.state.todos.map((todo, index) => {
                  if (todo.todo !== "") {
                    return (
                      <ListGroupItem className="ListGroupItem" key={todo.id}>
                        <span
                          style={
                            todo.isComplete
                              ? { opacity: 0.7, textDecoration: "line-through" }
                              : { opacity: 1, textDecoration: "none" }
                          }
                        >
                          {index + 1}
                        </span>
                        <h4
                          style={
                            todo.isComplete
                              ? { opacity: 0.7, textDecoration: "line-through" }
                              : { opacity: 1, textDecoration: "none" }
                          }
                        >
                          {todo.todo}
                        </h4>
                        <ButtonGroup onClick={this.progress}>
                          <Button
                            className="warningbtn"
                            size="md"
                            color="warning"
                            onClick={() => this.completed(todo.id)}
                          >
                            Complete
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => this.deleteTodo(todo.id)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </ListGroupItem>
                    );
                  } else {
                    return (
                      <UncontrolledAlert color="danger" className="alert my-2">
                        Please type something
                      </UncontrolledAlert>
                    );
                  }
                })}
              </ListGroup>
              <Progress
                max="100"
                value={this.state.progressStatus}
                className="my-3 progress"
                size="lg"
              >
                {Math.round(this.state.progressStatus)} %
              </Progress>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
