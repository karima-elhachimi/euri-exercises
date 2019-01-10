import React, { useState, useEffect } from 'react';
import axios from 'axios';

export class Users extends React.Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    const res = await axios.get('users.json');
    this.setState({
      users: res.data,
    });
  }

  render() {
    return (
      <ul>
        {this.state.users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    );
  }
}

// add document.title
// https://reactjs.org/docs/hooks-effect.html

export const UsersWithHooks = () => {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const res = await axios.get('users.json');
    setUsers(res.data);
  });

  return (
    <ul>
      {users.map((user) => {
        return <li key={user.id}>{user.name}</li>;
      })}
    </ul>
  );
};
