import './App.css';
import React, { useState, useEffect } from 'react';
import { Button, EditableText, InputGroup, Toaster } from '@blueprintjs/core';

const AppToaster = Toaster.create({
    position: "top"
})

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
                    }),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }
            ).then((response) => response.json())
                .then(data => {
                    setUsers([...users, data]);
                    AppToaster.show({
                        message: "User Added Successfully",
                        intent: "success",
                        timeout: 3000
                    })
                    setNewName("");
                    setNewEmail("");
                    setNewWebsite("");
            })
        }
    } 


    function onChangeHandler(id, key, value) {
        setUsers((users) => {
            return users.map((user) => {
                return user.id === id ? {...user, [key]: value } : user;
            })
        })
    }

    function updateUser(id) {
        const user = users.find(user => user.id === id);
        id = id % 10;
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(user ),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }
        ).then((response) => response.json())
            .then(data => {
                AppToaster.show({
                    message: "User Updated Successfully",
                    intent: "success",
                    timeout: 3000
                })
        })
    }

    function deleteUser(id) {
        const user = users.find(user => user.id === id);
        id = id % 10;
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
            {
                method: 'DELETE',
            }
        ).then((response) => response.json())
            .then(data => {

                setUsers((users) => {
                    return users.filter(user => user.id !== id);
                })

                AppToaster.show({
                    message: "User Deleted Successfully",
                    intent: "success",
                    timeout: 3000
                })
        })
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
                          <td><EditableText  onChange={value =>onChangeHandler(user.id, "email", value)}  value={user.email}/></td>
                          <td><EditableText  onChange={value =>onChangeHandler(user.id, "website", value)}  value={user.website}/></td>
                          <td><Button intent='primary' onClick={() => updateUser(user.id)}>Update</Button>
                              &nbsp;
                              <Button intent='danger'  onClick={()=> deleteUser(user.id)}>Delete</Button>  </td>
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
                          <Button intent='success' onClick={addUser}>
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
