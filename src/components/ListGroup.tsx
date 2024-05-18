import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedItemIdx, setSelectedItemIdx] = useState(-1);

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
      <h1>{heading}</h1>
      {getMessage()}
      <ul className="list-group">
        {items.map((item, idx) => (
          <li
            className={
              selectedItemIdx === idx
                ? "list-group-item active"
                : "list-group-item"
            }
            key={"list-item-" + idx}
            onClick={() => {
              setSelectedItemIdx(idx);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
