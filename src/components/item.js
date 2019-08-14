import React from "react";

function Item({ id, title, type, url, by }) {
  return (
    <div key={id}>
      <a href={url}>{title}</a>
      <span>{type} </span>
      <span>by {by}</span>
      <br />
      <br />
    </div>
  );
}

export default Item;
