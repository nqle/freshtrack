import { useState } from "react";
import ImageModal from "./ImageModal";
import Food from "../data/Food";

export interface Props {
  food: Food;
}

function FoodItem({ food }: Props) {
  const [modalTriggered, setModalTriggered] = useState(false);

  return (
    <li className="list-group-item">
      <div className="row align-items-center">
        <ImageModal
          modalTriggered={modalTriggered}
          onClose={() => setModalTriggered(false)}
          foodData={food}
        />
        <div className="col-2">
          <button
            className="btn btn-default p-0"
            onClick={() => setModalTriggered(true)}
            aria-expanded={!modalTriggered ? true : false}
          >
            <img
              src={food.image}
              alt="Icon"
              className="img-fluid img-thumbnail p-0"
              width={128}
            />
          </button>
        </div>
        <div className="col">{food.title}</div>
        <div className="col">{food.expiry?.toLocaleDateString()}</div>
      </div>
    </li>
  );
}

export default FoodItem;
