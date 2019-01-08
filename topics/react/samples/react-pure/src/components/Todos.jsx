import React from 'react';

import TodoItem from './TodoItem';

export default class Todos extends React.Component {
  state = {
    todos: [
      { title: 'take out the trash', done: false, notes: ['boring'] },
      { title: 'walk dog', done: true, notes: ['exercise'] },
      { title: 'read about React', done: false, notes: ['fun!'] },
    ],
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(oldState => {
        return { todos: [...oldState.todos] };
      });
    }, 1000);
  }

  handleClick = () => {
    this.setState({
      todos: this.state.todos.map(todo => {
        return {
          ...todo,
          done: !todo.done,
        };
      }),
    });
  };

  render() {
    console.log('Todos render called');
    return (
      <div>
        {this.state.todos.map((todo, i) => {
          return (
            <TodoItem
              key={i}
              title={todo.title}
              done={todo.done}
              notes={todo.notes}
            />
          );
        })}
        <button onClick={this.handleClick}>Toggle All</button>
      </div>
    );
  }
}
