import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { server_address } from '../env.js';
import PeopleContext from '../context/people/peopleContext';

const DeletePerson = (props) => {
  const peopleContext = useContext(PeopleContext);

  const history = useHistory();
  const key = props.match.params.id;

  useEffect(() => {
    peopleContext.getUser(key);
    // eslint-disable-next-line
  }, [key]);

  const { name, age, gender } = peopleContext.user;

  const onSubmit = (e) => {
    e.preventDefault();

    axios.delete(server_address + '/user/' + key).then((res) => {
      console.log(res.data);
      history.push('/');
    });
  };

  return (
    <div>
      <h3 align='center'>Delete Person</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Name: &nbsp;</label>
          <label>{name}</label>
        </div>
        <div className='form-group'>
          <label>Age: &nbsp;</label>
          <label>{age}</label>
        </div>
        <div className='form-group'>
          <label>Gender: &nbsp;</label>
          <label>{gender}</label>
        </div>

        <br />

        <div className='form-group'>
          <input
            type='submit'
            value='Delete Person'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default DeletePerson;
