import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import CreatePerson from './components/CreatePerson';
import EditPerson from './components/EditPerson';
import ListPeople from './components/ListPeople';
import DeletePerson from './components/DeletePerson';

import Alert from './components/Alert';
import AlertState from './context/alert/AlertState';
import PeopleState from './context/people/PeopleState';

import logo from './logo.png';

class App extends Component {
  render() {
    return (
      <AlertState>
        <PeopleState>
          <Router>
            <div className='container'>
              <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div style={{ paddingRight: '30rem' }}>
                  <img src={logo} width='60' height='30' alt='' />
                  <Link to='/' className='navbar-brand'>
                    People Management
                  </Link>
                </div>

                <div className='collpase navbar-collapse'>
                  <ul className='navbar-nav mr-auto'>
                    <li className='navbar-item'>
                      <Link to='/' className='nav-link'>
                        People List
                      </Link>
                    </li>
                    <li className='navbar-item'>
                      <Link to='/create' className='nav-link'>
                        Create Person
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
              <br />
              <Alert alert={alert} />
              <Route path='/' exact component={ListPeople} />
              <Route path='/edit/:id' component={EditPerson} />
              <Route path='/create' component={CreatePerson} />
              <Route path='/delete/:id' component={DeletePerson} />
            </div>
          </Router>
        </PeopleState>
      </AlertState>
    );
  }
}

export default App;
