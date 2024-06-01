import Food from "../data/Food";

interface ImageModalProps {
  modalTriggered: boolean;
  onClose: () => void;
  foodData: Food;
}

const ImageModal = ({ onClose, modalTriggered, foodData }: ImageModalProps) => {
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
                {foodData.image && (
                  <img
                    src={foodData.image}
                    alt="Icon"
                    className="img-fluid img-thumbnail"
                  />
                )}
              </div>
              <div className="modal-footer">
                {foodData.expiry && (
                  <h2 className="modal-title">
                    {foodData.expiry.toDateString()}
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

export default ImageModal;
