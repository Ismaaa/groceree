// libs
import React, { useEffect, useState } from "react";

// services
import * as FirestoreService from "../../services/firestore";

// error handlers
import ErrorMessage from "../../components/ErrorMessage";

const ItemList = (props) => {
  const { groceryListId } = props;

  const [groceryItems, setGroceryItems] = useState([]);
  const [error, setError] = useState();

  // Use an effect hook to subscribe to the grocery list item stream and
  // automatically unsubscribe when the component unmounts.
  useEffect(() => {
    const unsubscribe = FirestoreService.streamGroceryListItems(groceryListId, {
      next: (querySnapshot) => {
        const updatedGroceryItems = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        );
        setGroceryItems(updatedGroceryItems);
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
    return unsubscribe;
  }, [groceryListId, setGroceryItems]);

  const groceryItemElements = groceryItems.map((groceryItem, i) => (
    <div key={i}>{groceryItem.name}</div>
  ));

  return (
    <div>
      <ErrorMessage errorCode={error}></ErrorMessage>
      <div>{groceryItemElements}</div>
    </div>
  );
}

export default ItemList;
