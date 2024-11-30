import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((Response) => Response.json())
        .then((json) => setUsers(json))
    }, [])

  return (
    <div className="App">
      <table className="bp4-html-table modifier"> 
          <thead>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Website</th>
              <th>Action</th>
          </thead>
              <tbody>
                  {users.map(user =>
                      <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.website}</td>
                          <td>Edit Delete</td>
                      </tr>
                  )}
              </tbody>
        </table>
    </div>
  );
}

export default App;
