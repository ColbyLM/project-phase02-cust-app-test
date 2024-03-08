import React, { useState, useEffect } from 'react';
import './App.css';
import { getAll, post, put, deleteById } from './memdb.js';

function log(message) {
  console.log(message);
}

export function App(params) {
  let blankCustomer = { id: -1, name: '', email: '', password: '' };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = formObject.id >= 0 ? 'Update' : 'Add';
  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = function () {
    log('in getCustomers()');
    setCustomers(getAll());
  };

  const handleListClick = function (item) {
    log('in handleListClick()');
    if (item.id === formObject.id) {
      setFormObject(blankCustomer);
    } else {
      setFormObject(item);
    }
  };

  const handleDelete = function (id, name) {
    log('in handleDelete()');
    const isConfirmed = window.confirm(`Are you sure you want to delete ${name}?`);
    if (isConfirmed) {
      deleteById(id);
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  const handleInputChange = function (event) {
    log('in handleInputChange()');
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = { ...formObject };
    newFormObject[name] = value;
    setFormObject(newFormObject);
  };

  let onCancelClick = function () {
    log('in onCancelClick()');
    setFormObject(blankCustomer);
  };

  let onDeleteClick = function () {
    if (formObject.id >= 0) {
      handleDelete(formObject.id, formObject.name);
    }
    setFormObject(blankCustomer);
  };

  let onSaveClick = function () {
    if (mode === 'Add') {
      post(formObject);
      setCustomers(getAll());
    }
    if (mode === 'Update') {
      put(formObject.id, formObject);
      setCustomers(getAll());
    }
    setFormObject(blankCustomer);
  };

  return (
    <div>
      <div className="boxed">
        <h4>Customer List</h4>
        <table id="customer-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item, index) => {
              return (
                <tr
                  key={item.id}
                  className={item.id === formObject.id ? 'selected' : ''}
                  onClick={() => handleListClick(item)}
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>*******</td> {/* Placeholder for password */}
                  <td>
                    <button onClick={() => handleDelete(item.id, item.name)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="boxed">
        <div>
          <h4>{mode}</h4>
        </div>
        <form>
          <table id="customer-add-update">
            <tbody>
              <tr>
                <td className={'label'}>Name:</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => handleInputChange(e)}
                    value={formObject.name}
                    placeholder="Customer Name"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className={'label'}>Email:</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => handleInputChange(e)}
                    value={formObject.email}
                    placeholder="name@company.com"
                  />
                </td>
              </tr>
              <tr>
                <td className={'label'}>Password:</td>
                <td>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => handleInputChange(e)}
                    value={formObject.password}
                    placeholder="Password"
                    required
                  />
                </td>
              </tr>
              <tr className="button-bar">
                <td colSpan="2">
                  <input type="button" value="Save" onClick={onSaveClick} />
                  <input type="button" value="Cancel" onClick={onCancelClick} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default App;
