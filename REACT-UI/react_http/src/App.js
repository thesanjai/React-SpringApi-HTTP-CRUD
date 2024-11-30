import './App.css';
import React, { useState, useEffect } from 'react';
import { Button, EditableText, InputGroup} from '@blueprintjs/core';
function App() {

    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newWebsite, setNewWebsite] = useState("");


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((Response) => Response.json())
        .then((json) => setUsers(json))
    }, [])

    function addUser() {
        const name = newName.trim();
        const email = newEmail.trim();
        const website = newWebsite.trim();

        if (name && email && website) {
            fetch('https://jsonplaceholder.typicode.com/users',
            {
                method: 'POST',
                body: JSON.stringify({
                    name, //key and value are in the same name so, don't need to write the key name 
                    email,
                    website
                })
            })
        }
    } 

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
                          <td><EditableText value={user.email}/></td>
                          <td><EditableText value={user.website}/></td>
                          <td><Button intent='primary'>Update</Button>
                              <Button intent='danger'>Delete</Button>  </td>
                      </tr>
                  )}
              </tbody>
              <tfoot>
                  <tr>
                      <td></td>
                      <td> 
                          <InputGroup
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              placeholder='Enter Name...'
                          />
                      </td>
                      <td> 
                          <InputGroup
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                              placeholder='Enter Email...'
                          />
                      </td>
                      <td> 
                          <InputGroup
                              value={newWebsite}
                              onChange={(e) => setNewWebsite(e.target.value)}
                              placeholder='Enter Website...'
                          />
                      </td>
                      <td>
                          <Button intent='sucess' onClick={addUser}>
                              Add User
                          </Button>
                      </td>
                  </tr>
              </tfoot>
        </table>
    </div>
  );
}

export default App;
