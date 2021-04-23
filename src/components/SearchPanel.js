import React, { useState, useContext } from 'react';

import PeopleContext from '../context/people/peopleContext';
import AlertContext from '../context/alert/alertContext';

const SearchPanel = ({ setPeople, people }) => {
  const [isGreaterThan, SetIsGreaterThan] = useState(true);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('all');

  const peopleContext = useContext(PeopleContext);
  const alertContext = useContext(AlertContext);

  const ageChange = (e) => {
    if (isNaN(e.target.value)) {
      alertContext.setAlert(
        'Only numeric value is permitted for age',
        'primary'
      );
    }
    setAge(e.target.value);
  };

  const genderChange = (e) => {
    setGender(e.target.value);
  };

  const isGreaterThanChange = (e) => {
    e.target.value === 'true'
      ? SetIsGreaterThan(true)
      : SetIsGreaterThan(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isNaN(age)) {
      alertContext.setAlert(
        'Only numeric value is permitted for age',
        'primary'
      );
      return;
    }

    const genderFilter = gender ? (gender !== 'all' ? gender : '') : '';
    peopleContext.searchUsers(
      `?gender=${genderFilter}&age=${age}` +
        `&isGreaterThan=${isGreaterThan ? isGreaterThan : ''}`
    );
  };

  return (
    <div
      style={{
        padding: '0.5rem 3rem',
        backgroundColor: '#EBEBEB',
      }}
    >
      <form onSubmit={onSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridGap: '3rem',
          }}
        >
          <div className='form-group'>
            <label>Age: </label>
            <div className='form-group'>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='greaterThanOptions'
                  id='greaterThanFalse'
                  value={false}
                  checked={!isGreaterThan}
                  onChange={isGreaterThanChange}
                />
                <label className='form-check-label'>Less Than</label>
              </div>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='greaterThanOptions'
                  id='greaterThanTrue'
                  value={true}
                  checked={isGreaterThan}
                  onChange={isGreaterThanChange}
                />
                <label className='form-check-label'>
                  Greater Than or Equal to
                </label>
              </div>
            </div>
          </div>
          <div
            className='form-group'
            style={{
              display: 'flex',
              marginTop: '1.5rem',
            }}
          >
            <input
              type='text'
              className='form-control'
              value={age}
              onChange={ageChange}
            />
          </div>
        </div>

        <div className='form-group'>
          <label>Gender: </label>
          <div className='form-group'>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='genderOptions'
                id='genderMale'
                value='all'
                checked={gender === 'all'}
                onChange={genderChange}
              />
              <label className='form-check-label'>All</label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='genderOptions'
                id='genderMale'
                value='male'
                checked={gender === 'male'}
                onChange={genderChange}
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
                onChange={genderChange}
              />
              <label className='form-check-label'>Female</label>
            </div>
          </div>
        </div>

        <div
          className='form-group'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <input type='submit' value='Search' className='btn btn-primary' />
          <label>Result count : {peopleContext.users.length}</label>
        </div>
      </form>
    </div>
  );
};

export default SearchPanel;
