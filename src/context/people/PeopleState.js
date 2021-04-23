import React, { useReducer } from 'react';
import axios from 'axios';
import PeopleContext from './peopleContext';
import PeopleReducer from './peopleReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CHANGE_USER,
  REMOVE_USER,
  GET_USER,
} from '../types';
import { server_address } from '../../env.js';

const PeopleState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(PeopleReducer, initialState);

  // Search Users
  const searchUsers = async (text) => {
    setLoading();
    const url = `${server_address}/users/${text ? text : ''}`;
    const res = await axios(url);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data,
    });
  };

  // Get User
  const getUser = async (key) => {
    setLoading();
    const res = await axios(`${server_address}/user/${key}`).catch((error) => {
      console.log(error);
    });

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Change User
  const changeUser = () => dispatch({ type: CHANGE_USER });

  // Reemove User
  const removeUser = () => dispatch({ type: REMOVE_USER });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <PeopleContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        changeUser,
        removeUser,
        getUser,
      }}
    >
      {props.children}
    </PeopleContext.Provider>
  );
};

export default PeopleState;
