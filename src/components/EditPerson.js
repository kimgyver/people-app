import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import { server_address } from '../env.js';
import PeopleContext from '../context/people/peopleContext';
import AlertContext from '../context/alert/alertContext';

const EditPerson = (props) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('male');

  const peopleContext = useContext(PeopleContext);
  const alertContext = useContext(AlertContext);
  const history = useHistory();
  const key = props.match.params.id;

  useEffect(() => {
    peopleContext.getUser(key);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setName(peopleContext.user.name);
    setAge(peopleContext.user.age);
    setGender(peopleContext.user.gender);
  }, [peopleContext.user]);

  const nameChanged = (e) => {
    setName(e.target.value);
  };

  const ageChanged = (e) => {
    if (!checkAge(e.target.value)) return;
    setAge(e.target.value);
  };

  const genderChanged = (e) => {
    setGender(e.target.value);
  };

  const checkName = (value) => {
    if (!value || value.match(/^ *$/)) {
      alertContext.setAlert('Name is empty.', 'dark');
      return false;
    }
    return true;
  };

  const checkAge = (value) => {
    if (!value || isNaN(value)) {
      alertContext.setAlert('Age should have a numeric value.', 'dark');
      return false;
    }

    if (parseInt(value) <= 0) {
      alertContext.setAlert('Age should be more than 0.', 'dark');
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!checkName(name)) return;
    if (!checkAge(age)) return;

    const person = {
      name,
      age: parseInt(age),
      gender,
    };

    axios.put(server_address + '/user/' + key, person).then((res) => {
      console.log(res.data);
      history.push('/');
    });
  };

  return (
    <div>
      <div style={{ marginTop: 10 }}>
        <h3>Edit Person</h3>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label>Name: </label>
            <input
              type='text'
              className='form-control'
              value={name}
              onChange={nameChanged}
            />
          </div>
          <div className='form-group'>
            <label>Age: </label>
            <input
              type='text'
              className='form-control'
              value={age}
              onChange={ageChanged}
            />
          </div>
          <div className='form-group'>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='genderOptions'
                id='genderMale'
                value='male'
                checked={gender === 'male'}
                onChange={genderChanged}
              />
              <label className='form-check-label'>Male</label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='genderOptions'
                id='genderFemale'
                value='female'
                checked={gender === 'female'}
                onChange={genderChanged}
              />
              <label className='form-check-label'>Female</label>
            </div>
          </div>

          <div className='form-group'>
            <input
              type='submit'
              value='Update Person'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPerson;
