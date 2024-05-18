import { ReactNode, useState } from "react";
import Food from "../data/Food";
import FoodItem from "./FoodItem";

interface Props {
  items: ReactNode;
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedItemIdx, setSelectedItemIdx] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      <ul className="list-group">{items}</ul>
    </>
  );
}

export default ListGroup;
