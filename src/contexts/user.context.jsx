import { createContext, useState, useEffect, useReducer } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const USER_ACTIONS_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const INITIAL_STATE = {
  currentUser: null,
}

export const UserReducer = (state, action) =>{
  console.log('dispatched');
  console.log(action);
  const {type, payload} = action;

  switch(type){
    case USER_ACTIONS_TYPES.SET_CURRENT_USER:
      return {...state, currentUser: payload};
    default:
      throw new Error(`underfined type ${type} this action is not supported`);
  }
}

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [{currentUser}, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  
  console.log(currentUser);

  const setCurrentUser = (user) =>{
    dispatch({type:USER_ACTIONS_TYPES.SET_CURRENT_USER, currentUser: user});
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log("inside useEffect : ");
      console.log(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
