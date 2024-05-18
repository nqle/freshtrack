// import Message from "./components/Message";
import { useEffect } from "react";
import ListGroup from "./components/ListGroup";

function App() {
  const listGroupItems = ["banana", "apple", "spaghetti", "pho"];
  const listGroupHeading = "Food";

  const handleSelectItem = (item: string) => {
    console.log(item);
    useEffect(() => {
      alert(item);
    });
  };

  return (
    <div>
      <ListGroup
        items={listGroupItems}
        heading={listGroupHeading}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
