// import Message from "./components/Message";
import { useEffect, useState } from "react";
import ListGroup from "./components/ListGroup";
import Button from "./components/Button";
import Alert from "./components/Alert";

function App() {
  const listGroupHeading = "Food";

  const [foodItems, setFoodItems] = useState([
    "banana",
    "apple",
    "spaghetti",
    "pho",
  ]);

  const [alertVisible, setAlertVisible] = useState(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
    useEffect(() => {
      alert(item);
    });
  };

  return (
    <div>
      <Button
        children="Add Banana"
        onClick={() => setFoodItems([...foodItems, "banana"])}
      ></Button>
      <Button
        children="Clear Food"
        onClick={() => {
          setFoodItems([]);
        }}
      ></Button>
      <Button
        children="Toggle Alert"
        onClick={() => {
          setAlertVisible(!alertVisible);
        }}
      ></Button>
      {alertVisible && (
        <Alert
          onClose={() => {
            setAlertVisible(false);
          }}
        >
          test
        </Alert>
      )}
      <ListGroup
        items={foodItems}
        heading={listGroupHeading}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
