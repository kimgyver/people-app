import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import SearchPanel from './SearchPanel';
import PeopleContext from '../context/people/peopleContext';

const ListPeople = () => {
  const peopleContext = useContext(PeopleContext);

  useEffect(() => {
    peopleContext.searchUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h3>People List</h3>

      <SearchPanel />

      <table className='table table-striped' style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {peopleContext.users.map((person, i) => (
            <tr key={i}>
              <td>{person.name}</td>
              <td>{person.age}</td>
              <td>{person.gender}</td>
              <td>
                <Link to={'/edit/' + person._id}>Edit</Link>
                &nbsp;&nbsp;
                <Link to={'/delete/' + person._id}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPeople;
