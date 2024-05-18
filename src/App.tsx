// import Message from "./components/Message";
import { useEffect, useState } from "react";
import ListGroup from "./components/ListGroup";
import Button from "./components/Button";
import Alert from "./components/Alert";
import Food from "./data/Food";
import FoodItem from "./components/FoodItem";
import Webcam from "react-webcam";

function App() {
  const listGroupHeading = "My Food";

  const apple: Food = { title: "Apple", expiry: new Date() };
  const banana: Food = { title: "Banana" };
  const spaghetti: Food = { title: "Spaghetti" };
  const pho: Food = { title: "Pho" };

  const [foodItems, setFoodItems] = useState([banana, apple, spaghetti, pho]);

  const [alertVisible, setAlertVisible] = useState(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
    useEffect(() => {
      alert(item);
    });
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: { exact: "environment" },
  };

  return (
    <div>
      <Webcam
        audio={false}
        height={720}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Banana"
          aria-label="Food"
          aria-describedby="basic-addon1"
        ></input>
        <input id="startDate" className="form-control" type="date" />
      </div>

      <Button
        children="Add Banana"
        onClick={() => setFoodItems([...foodItems, banana])}
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
      {foodItems.length === 0 ? (
        <h1>Start adding items!</h1>
      ) : (
        <ListGroup
          items={foodItems.map((item, idx) => {
            return (
              <FoodItem
                key={"food-item-" + idx}
                title={item.title}
                date={item.expiry}
                iconSrc="https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg"
              ></FoodItem>
            );
          })}
          heading={listGroupHeading}
          onSelectItem={handleSelectItem}
        />
      )}
    </div>
  );
}

export default App;
