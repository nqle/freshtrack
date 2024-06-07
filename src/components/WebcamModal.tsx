import Webcam from "react-webcam";
import { useRef, useCallback } from "react";

interface WebcamModalProps {
  modalTriggered: boolean;
  onClose: () => void;
  onImageCapture: (image: string | null) => void;
}

const WebcamModal = ({
  onClose,
  modalTriggered,
  onImageCapture,
}: WebcamModalProps) => {
  const videoConstraints = {
    width: 512,
    height: 512,
    facingMode: "environment",
  };
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      onImageCapture(
        webcamRef.current.getScreenshot({ width: 1024, height: 1024 })
      );
      onClose();
    }
  }, [webcamRef, onImageCapture]);

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
                <h1 className="modal-title">Camera</h1>
                <button
                  onClick={onClose}
                  className="btn-close btn-close-white"
                ></button>
              </div>
              <div className="modal-body">
                <div className="w-100 text-center">
                  {modalTriggered && (
                    <Webcam
                      videoConstraints={videoConstraints}
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                    />
                  )}
                </div>
              </div>
              <div className="modal-footer justify-content-center">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebcamModal;
