interface ImageModalProps {
  modalTriggered: boolean;
  onClose: () => void;
  title: string;
  image: string;
  footer?: string;
}

const ImageModal = ({
  onClose,
  modalTriggered,
  title,
  image,
  footer,
}: ImageModalProps) => {
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
                <h1 className="modal-title">{title}</h1>
                <button
                  onClick={onClose}
                  className="btn-close btn-close-white"
                ></button>
              </div>
              <div className="modal-body">
                {image && (
                  <img
                    src={image}
                    alt="Icon"
                    className="img-fluid img-thumbnail"
                  />
                )}
              </div>
              <div className="modal-footer">
                {footer && <h2 className="modal-title">{footer}</h2>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageModal;
