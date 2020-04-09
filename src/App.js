import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: ["mat", "bajs"],
      inputValue: "hej",
      error: "",
    }
  }

  updateInputValue = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  addATodo = () => {
    if (this.state.inputValue !== "") {
      const newState = {
        todos: this.state.todos.concat(this.state.inputValue),
        error: "",
        inputValue: "",
      }
      this.setState(newState);
    } else {
      this.setState({ error: "Cannot to add nothing" });
    }
  }

  render = () => {
    const changeEachNumberToALi = (item) => <li>{item}<button>done</button></li>;
    const listItems = this.state.todos.map(changeEachNumberToALi);
    return (
      <div>
        <ol>
          {listItems}
        </ol>
        <button onClick={this.addATodo}>clickbutton</button>
        <form>
          <input value={this.state.inputValue} onChange={this.updateInputValue}></input>
          {this.state.error}
        </form>
      </div>
    );
  }
}


export default App;
