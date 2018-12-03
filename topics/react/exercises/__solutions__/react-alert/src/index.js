import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// import users from './users';
// const template = (
//   <div className="container">
//     <table className="table">
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Phone</th>
// +
//           <th>City</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map(user => (
//           <tr key={user.id}>
//             <td>{user.name}</td>
//             <td>{user.email}</td>
//             <td>{user.phone}</td>
//             <td>{user.address && user.address.city}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );
// ReactDOM.render(template, document.getElementById('root'));

import Alert from './components/Alert';

class App extends Component {
  state = {
    showAlert: true,
  };
  alertClosed = () => {
    this.setState(() => ({
      showAlert: false,
    }));
  };
  render() {
    const { showAlert } = this.state;
    return (
      <div>
        <Alert>This is information message</Alert>
        <Alert type="danger">We have a problem</Alert>
        {showAlert && (
          <Alert type="warning" onClose={this.alertClosed}>
            <strong>Warning!</strong> Better check yourself, you are not looking
            too good.
          </Alert>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
