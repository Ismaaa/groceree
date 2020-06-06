// libs
import React, { useState, useEffect } from "react";

// services
import * as FirestoreService from "../../services/firestore";

// styles
import "./index.css";

// components
import CreateList from "../../scenes/CreateList";
import EditList from "../../scenes/EditList";
import JoinList from "../../scenes/JoinList";
import ErrorMessage from "../ErrorMessage";

// hooks
import useQueryString from "../../hooks/useQueryString";

const Groceree = () => {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [groceryList, setGroceryList] = useState();
  const [error, setError] = useState();

  // Use a custom hook to subscribe to the grocery list ID provided as a URL query parameter
  const [groceryListId, setGroceryListId] = useQueryString("listId");

  // Use an effect to authenticate and load the grocery list from the database
  useEffect(() => {
    FirestoreService.authenticateAnonymously()
      .then((userCredential) => {
        setUserId(userCredential.user.uid);
        if (groceryListId) {
          FirestoreService.getGroceryList(groceryListId)
            .then((groceryList) => {
              if (groceryList.exists) {
                setError(null);
                setGroceryList(groceryList.data());
              } else {
                setError("grocery-list-not-found");
                setGroceryListId();
              }
            })
            .catch((error) => {
              console.warn(error);
              setError("grocery-list-get-fail");
            });
        }
      })
      .catch((error) => {
        console.warn(error);
        setError("anonymous-auth-failed");
      });
  }, [groceryListId, setGroceryListId]);

  const onGroceryListCreate = (groceryListId, userName) => {
    setGroceryListId(groceryListId);
    setUser(userName);
  }

  const onCloseGroceryList = () => {
    setGroceryListId();
    setGroceryList();
    setUser();
  }

  const onSelectUser = (userName) => {
    setUser(userName);
    FirestoreService.getGroceryList(groceryListId)
      .then((updatedGroceryList) => setGroceryList(updatedGroceryList.data()))
      .catch(() => setError("grocery-list-get-fail"));
  }

  // render a scene based on the current state
  if (groceryList && user) {
    return (
      <EditList
        {...{ groceryListId, user, onCloseGroceryList, userId }}
      ></EditList>
    );
  } else if (groceryList) {
    return (
      <div>
        <ErrorMessage errorCode={error}></ErrorMessage>
        <JoinList
          users={groceryList.users}
          {...{ groceryListId, onSelectUser, onCloseGroceryList, userId }}
        ></JoinList>
      </div>
    );
  }
  return (
    <div>
      <ErrorMessage errorCode={error}></ErrorMessage>
      <CreateList onCreate={onGroceryListCreate} userId={userId}></CreateList>
    </div>
  );
};

export default Groceree;
