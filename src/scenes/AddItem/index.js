// libs
import React, { useState } from "react";

// services
import * as FirestoreService from "../../services/firestore";

// styles
import "./index.css";

// error handlers
import ErrorMessage from "../../components/ErrorMessage";

function AddItem(props) {
  const { groceryListId, userId } = props;

  const [error, setError] = useState("");

  function addItem(e) {
    e.preventDefault();
    setError(null);

    const itemDesc = document.addItemForm.itemDesc.value;
    if (!itemDesc) {
      setError("grocery-item-desc-req");
      return;
    }

    FirestoreService.addGroceryListItem(itemDesc, groceryListId, userId)
      .then(() => document.addItemForm.reset())
      .catch((reason) => {
        if (reason.message === "duplicate-item-error") {
          setError(reason.message);
        } else {
          setError("add-list-item-error");
        }
      });
  }

  return (
    <form name="addItemForm">
      <h3>I want...</h3>
      <input type="text" name="itemDesc" />
      <button type="submit" onClick={addItem}>
        Add
      </button>
      <ErrorMessage errorCode={error}></ErrorMessage>
    </form>
  );
}

export default AddItem;
