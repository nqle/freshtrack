import { useState } from "react";
import ImageModal from "./ImageModal";
import Food from "../data/Food";

export interface Props {
  food: Food;
}

function FoodItem({ food }: Props) {
  const [modalTriggered, setModalTriggered] = useState<boolean>(false);

  return (
    <li className="list-group-item">
      <div className="row align-items-center">
        {food.image && (
          <ImageModal
            modalTriggered={modalTriggered}
            onClose={() => setModalTriggered(false)}
            title={food.title}
            image={food.image}
            footer={food.expiry?.toDateString()}
          />
        )}
        <div className="col-2">
          <button
            className="btn btn-default p-0"
            onClick={() => {
              if (food.image) {
                setModalTriggered(true);
              }
            }}
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
