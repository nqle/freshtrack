import { useState } from "react";

interface Props {
  iconSrc: string;
  title: string;
  date?: Date;
}

interface ModalProps {
  modalTriggered: boolean;
  onClose: () => void;
  foodData: Props;
}

const Modal = ({ onClose, modalTriggered, foodData }: ModalProps) => {
  return (
    <>
      <div>
        <div
          className="modal"
          tabIndex={-1}
          style={{ display: modalTriggered ? "block" : "none" }}
          aria-hidden={true}
        >
          <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title">{foodData.title}</h1>
                <button
                  onClick={onClose}
                  className="btn-close btn-close-white"
                ></button>
              </div>
              <div className="modal-body">
                {foodData.iconSrc && (
                  <img
                    src={foodData.iconSrc}
                    alt="Icon"
                    className="img-fluid img-thumbnail"
                  />
                )}
              </div>
              <div className="modal-footer">
                {foodData.date && (
                  <h2 className="modal-title">
                    {foodData.date.toDateString()}
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function FoodItem({ iconSrc, title, date }: Props) {
  const [modalTriggered, setModalTriggered] = useState(false);

  return (
    <li className="list-group-item">
      <div className="row align-items-center">
        <Modal
          modalTriggered={modalTriggered}
          onClose={() => setModalTriggered(false)}
          foodData={{ iconSrc, title, date }}
        />
        <div className="col-2">
          <button
            className="btn btn-default p-0"
            onClick={() => setModalTriggered(true)}
            aria-expanded={!modalTriggered ? true : false}
          >
            <img
              src={iconSrc}
              alt="Icon"
              className="img-fluid img-thumbnail p-0"
              width={128}
            />
          </button>
        </div>
        <div className="col">{title}</div>
        <div className="col">{date?.toLocaleDateString()}</div>
      </div>
    </li>
  );
}

export default FoodItem;
