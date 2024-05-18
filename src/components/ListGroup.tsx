import { ReactNode } from "react";

interface Props {
  items: ReactNode;
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading }: Props) {
  return (
    <>
      <h1>{heading}</h1>
      <ul className="list-group">{items}</ul>
    </>
  );
}

export default ListGroup;
