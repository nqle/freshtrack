// import Message from "./components/Message";
import { useState } from "react";
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
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: { exact: "environment" },
  };

  async function subscribe() {
    const VAPID_PUBLIC_KEY =
      "BGS6aY-ekmvaK3mrPdRuwdk5CgQRLWcRUTn39LyQb1SuVkhTAZdH-3VshouQYxr8FgmdQYhkzMIDX8tiJZ64DgY";

    let swRegistration = await navigator.serviceWorker.getRegistration();
    if (!swRegistration) {
      alert("reg failed");
      return;
    }

    let pushManager = swRegistration?.pushManager;
    if (!pushManager) {
      alert("No success");
      return;
    }
    let subscriptionOptions = {
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY,
    };
    try {
      let subscription = await pushManager.subscribe(subscriptionOptions);
      var message =
        "<b>Active subscription:</b><br><br>" +
        JSON.stringify(subscription.toJSON());
      console.log(message);
    } catch (error) {
      alert("Push subscription error: " + error);
    }
  }

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
      <Button onClick={subscribe}>Enable Notifications</Button>
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
