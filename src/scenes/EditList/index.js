// libs
import React from "react";

// styles
import "./index.css";

// components
import AddItem from "../AddItem";
import ItemList from "../ItemList";
import Footer from "../../components/Footer";

function EditList(props) {
  const { groceryListId, user, onCloseGroceryList, userId } = props;

  function handleCreate(e) {
    e.preventDefault();
    onCloseGroceryList();
  }

  return (
    <div>
      <header className="app-header">
        <h1>Live Grocery List</h1>
        <p>
          <strong>Hi {user}!</strong>
        </p>
        <p>
          Add items to the list. When someone else adds an item it will
          instantly appear on the list.
        </p>
      </header>
      <div className="edit-container">
        <div className="add-item-column">
          <AddItem {...{ groceryListId, userId }}></AddItem>
        </div>
        <div className="list-column">
          <ItemList {...{ groceryListId }}></ItemList>
        </div>
      </div>
      <Footer
        groceryListId={groceryListId}
        handleCreate={handleCreate}
      />
    </div>
  );
}

export default EditList;
