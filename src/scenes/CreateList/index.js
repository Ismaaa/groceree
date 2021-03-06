// libs
import React, { useState } from "react";

// services
import * as FirestoreService from "../../services/firestore";

// styles
import "./index.css";

// error handlers
import ErrorMessage from "../../components/ErrorMessage";

import Header from "../../components/Header";

const CreateList = (props) => {
  const { onCreate, userId } = props;

  const [error, setError] = useState();

  const createGroceryList = (e) => {
    e.preventDefault();
    setError(null);

    const userName = document.createListForm.userName.value;
    if (!userName) {
      setError("user-name-required");
      return;
    }

    FirestoreService.createGroceryList(userName, userId)
      .then((docRef) => {
        onCreate(docRef.id, userName);
      })
      .catch((reason) => setError("create-list-error"));
  }

  return (
    <div>
      <Header />
      <div className="create-container">
        <div>
          <form name="createListForm">
            <p>
              <label>What is your name?</label>
            </p>
            <p>
              <input type="text" name="userName" />
            </p>
            <ErrorMessage errorCode={error}></ErrorMessage>
            <p>
              <button onClick={createGroceryList}>
                Create a new grocery list
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateList;
