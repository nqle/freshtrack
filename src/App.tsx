import { useState, useRef } from "react";
import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Food from "./data/Food";
import FoodItem from "./components/FoodItem";
import ImageModal from "./components/ImageModal";
import WebcamModal from "./components/WebcamModal";

function App() {
  const listGroupHeading = "My Food";

  const [foodItems, setFoodItems] = useState<Food[]>([]);

  const [alertVisible, setAlertVisible] = useState(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
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

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [foodName, setFoodName] = useState<string | null>(null);
  const [perishDate, setPerishDate] = useState<Date | null>(new Date());
  const [imageModalTriggered, setImageModalTriggered] =
    useState<boolean>(false);
  const [webcamModalTriggered, setWebcamModalTriggered] =
    useState<boolean>(false);

  const isValidDate = (date: Date) => {
    return !isNaN(date.getTime());
  };

  const foodNameRef = useRef<HTMLInputElement>(null);
  const perishDateRef = useRef<HTMLInputElement>(null);

  const handleFoodAdd = () => {
    const itemToAdd: Food = {
      title: foodName!, // the button is disabled if there is no foodName
      image: imgSrc || undefined,
      expiry: perishDate!, // the button is disabled if there is no perishDate
    };
    setFoodName(null);
    setPerishDate(new Date());
    setImgSrc(null);
    if (foodNameRef.current) {
      foodNameRef.current.value = "";
      foodNameRef.current.focus();
    }
    if (perishDateRef.current) {
      perishDateRef.current.value = new Date().toISOString().split("T")[0];
    }
    setFoodItems([...foodItems, itemToAdd]);
  };

  return (
    <div className="pb-5">
      <div className="input-group mb-3">
        <WebcamModal
          modalTriggered={webcamModalTriggered}
          onClose={() => setWebcamModalTriggered(false)}
          onImageCapture={setImgSrc}
        />
        <button
          onClick={() => {
            setWebcamModalTriggered(true);
          }}
          className={"btn btn-primary col-2"}
        >
          {!imgSrc && "Take Photo"}
          {imgSrc && "Retake Photo"}
        </button>
        {imgSrc && (
          <>
            <ImageModal
              modalTriggered={imageModalTriggered}
              onClose={() => setImageModalTriggered(false)}
              title="Camera"
              image={imgSrc}
            />
            <button
              className="btn btn-default p-0"
              onClick={() => {
                setImageModalTriggered(true);
              }}
            >
              <img
                src={imgSrc}
                width={128}
                className="img-fluid img-thumbnail p-0"
              />
            </button>
          </>
        )}
        <input
          id="foodDescription"
          type="text"
          className="form-control"
          placeholder="List your food here"
          aria-label="Food"
          aria-describedby="basic-addon1"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleFoodAdd();
            }
          }}
          onChange={(e) => {
            const foodNameInput = e.target.value;
            setFoodName(foodNameInput.length !== 0 ? foodNameInput : null);
          }}
          ref={foodNameRef}
        ></input>
        <input
          id="perishDate"
          className="form-control"
          type="date"
          defaultValue={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setPerishDate(new Date(e.target.value));
          }}
          ref={perishDateRef}
        />
      </div>

      <button
        children="Add food to your list"
        onClick={handleFoodAdd}
        className={"btn btn-primary "}
        disabled={!foodName || !perishDate || !isValidDate(perishDate)}
      ></button>
      <button
        children="Clear Food"
        onClick={() => {
          setFoodItems([]);
        }}
        className={"btn btn-primary "}
        disabled={foodItems.length === 0}
      ></button>
      <button
        children="Toggle Alert"
        onClick={() => {
          setAlertVisible(!alertVisible);
        }}
        className="d-none"
      ></button>
      {alertVisible && (
        <Alert
          onClose={() => {
            setAlertVisible(false);
          }}
        >
          test
        </Alert>
      )}
      <button onClick={subscribe} className="d-none">
        Enable Notifications
      </button>
      {foodItems.length === 0 ? (
        <h1>Start tracking your food!</h1>
      ) : (
        <ListGroup
          items={foodItems.map((item, idx) => {
            item.image ??= "generic-fooditem-1024x1024.png";
            return <FoodItem key={"food-item-" + idx} food={item}></FoodItem>;
          })}
          heading={listGroupHeading}
          onSelectItem={handleSelectItem}
        />
      )}
    </div>
  );
}

export default App;
