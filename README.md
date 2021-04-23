# People Management App - React Application

```bash
npm install
npm start
```

[http://locahost:3000](http://locahost:3000)

## Code structure

- Component
  - Components in this folder is composed of individual screens like list, create, delete, edit, search panel, alert. Generally, Input window + button.
  - CreatePerson: /create path triggers to here. Three inputs (name, age, gender) and one button exist.
  - DeletePerson: /delete path triggers. Showing user’s information plainly and button for confirming the removal of the user.
  - EditPerson: as per /edit user request. Name, age, gender can be modified.
  - ListPerson: Result list of people search.
  - Alert: display error message coming from the screen-based components triggered by problematic user actions.
- Context

  - This project utilized Context API state management for state handling. Context API is a lightweight version of Redux and the mechanism inside is almost same as Redux.
  - State management is required for systematic data sharing and delivery of data among components.
  - The logic of Context API modules consists of API calls and dispatch data to the Context store. It is the same as Redux.
  - E.g., the result of list could be accessed by the search panel to display the result count via the state management.
  - Two types of Context are defined. People and Alert.
  - People: consists of REST API calls of read/write/delete data and the part of dispatching result data to the Context store.
    - SEARCH_USERS
    - GET_USER
    - CHANGE_USER
    - REMOVE_USER
    - SET_LOADING
  - Alert: Enable screen-based components to directly change the alert message and remove it automatically 5 seconds later.

    - SET_ALERT
    - REMOVE_ALERT

- App
  - Overall one page screen structure
  - Router settings for edit, create, delete

## Limitation

- In user Context API, CHANGE_USER and REMOVE_USER are defined but not implemented because edit/delete screens are separated components (not one-screen components), so direct API calls from them was safe and easy.
