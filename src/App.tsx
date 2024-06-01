import { useState, useRef, useCallback } from "react";
import ListGroup from "./components/ListGroup";
import Button from "./components/Button";
import Alert from "./components/Alert";
import Food from "./data/Food";
import FoodItem from "./components/FoodItem";
import Webcam from "react-webcam";

function App() {
  const listGroupHeading = "My Food";

  const [foodItems, setFoodItems] = useState<Food[]>([]);

  const [alertVisible, setAlertVisible] = useState(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const videoConstraints = {
    width: 128,
    height: 128,
    facingMode: "environment",
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

  const [takingPhoto, setTakingPhoto] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [foodName, setFoodName] = useState<string | null>(null);
  const [perishDate, setPerishDate] = useState<Date | null>(new Date());

  const isValidDate = (date: Date) => {
    return !isNaN(date.getTime());
  };

  const WebcamCapture = () => {
    const webcamRef = useRef<Webcam>(null);

    const capture = useCallback(() => {
      if (webcamRef.current) {
        setImgSrc(
          webcamRef.current.getScreenshot({ width: 1024, height: 1024 })
        );
        setTakingPhoto(false);
      }
    }, [webcamRef, setImgSrc]);

    return (
      takingPhoto && (
        <>
          <Webcam
            videoConstraints={videoConstraints}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <button
            onClick={capture}
            className="btn btn-secondary rounded-pill m-4"
          >
            <img
              src="camera-icon-512x512.png"
              alt="Take Photo"
              style={{ width: "50px", height: "50px" }}
            />
          </button>
        </>
      )
    );
  };

  const foodNameRef = useRef<HTMLInputElement>(null);
  const perishDateRef = useRef<HTMLInputElement>(null);

  return (
    <div className="pb-5">
      <div className="input-group mb-3">
        <button
          onClick={() => {
            setTakingPhoto(!takingPhoto);
          }}
          className={"btn btn-primary"}
        >
          {!imgSrc && !takingPhoto && "Take Photo"}
          {imgSrc && !takingPhoto && "Retake Photo"}
          {takingPhoto && "Cancel"}
        </button>
        {takingPhoto && <WebcamCapture />}
        {!takingPhoto && imgSrc && <img src={imgSrc} width={128} />}
        <input
          id="foodDescription"
          type="text"
          className="form-control"
          placeholder="List your food here"
          aria-label="Food"
          aria-describedby="basic-addon1"
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
        onClick={() => {
          const itemToAdd: Food = {
            title: foodName!, // the button is disabled if there is no foodName
            image: imgSrc || undefined,
            expiry: perishDate!, // the button is disabled if there is no perishDate
          };
          setFoodName(null);
          setPerishDate(new Date());
          setImgSrc(null);
          setTakingPhoto(false);
          if (foodNameRef.current) {
            foodNameRef.current.value = "";
          }
          if (perishDateRef.current) {
            perishDateRef.current.value = new Date()
              .toISOString()
              .split("T")[0];
          }
          setFoodItems([...foodItems, itemToAdd]);
        }}
        className={"btn btn-primary "}
        disabled={!foodName || !perishDate || !isValidDate(perishDate)}
      ></button>
      <Button
        children="Clear Food"
        onClick={() => {
          setFoodItems([]);
        }}
      ></Button>
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
