// libs
import React from "react";

// styles
import "./index.css";

const Footer = (props) => {
  const { groceryListId, handleCreate } = props;
  return (
    <footer className="app-footer">
      <p>
        Share your list with others using{" "}
        <a
          href={`/?listId=${groceryListId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          this link
        </a>{" "}
        or{" "}
        <a href="/" onClick={handleCreate}>
          create a new grocery list
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
