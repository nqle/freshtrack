import { TouchList } from "react";

function ListGroup() {
  const items = ["banana", "apple", "spaghetti", "pho"];

  if (items.length === 0) {
    return (
      <>
        <h1>Start adding items!</h1>
      </>
    );
  }

  const getMessage = () => {
    return items.length === 0 && <p>No item found</p>;
  };

  return (
    <>
      <h1>Items</h1>
      {getMessage()}
      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
