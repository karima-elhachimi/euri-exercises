import React, { Component } from 'react';

// import { useScrollPosition } from './hooks/useScrollPosition';
import { Users } from './components/Users';
import ScrollPosition from './components/ScrollPosition';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>My App</h1>
        <h2>Position</h2>
        <ScrollPosition>
          {(position) => (
            <div>
              <p>You are at {position}</p>
            </div>
          )}
        </ScrollPosition>
        <hr />
        <h2>Users</h2>
        <Users />
      </div>
    );
  }
}

// ------------------------------------------------------------

// const App2 = () => {
//   let [position, setPosition] = useState(0);
//   useEffect(() => {
//     function handleScroll() {
//       setPosition(window.pageYOffset);
//     }
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   });
//   return (
//     <div className="container">
//       <h1>My App</h1>
//       <h2>Position</h2>
//       <div>
//         <p>You are at {position}</p>
//       </div>
//       <hr />
//       <h2>Users</h2>
//       <Users />
//     </div>
//   );
// };

// ------------------------------------------------------------

// const App3 = () => {
//   let position = useScrollPosition();
//   return (
//     <div className="container">
//       <h1>My App</h1>
//       <h2>Position</h2>
//       <div>
//         <p>You are at {position}</p>
//       </div>
//       <hr />
//       <h2>Users</h2>
//       <Users />
//     </div>
//   );
// };

export default App;
