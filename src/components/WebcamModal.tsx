import Webcam from "react-webcam";
import { useRef, useCallback, useState, useEffect } from "react";

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
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 512,
    height: 512,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  const videoConstraints = {
    width: windowSize.width,
    height: windowSize.height * 0.75,
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
          <div className="modal-dialog modal-dialog-centered modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title">Camera</h1>
                <button
                  onClick={onClose}
                  className="btn-close btn-close-white"
                ></button>
              </div>
              <div className="modal-body m-0 p-0 w-100 text-center align-items-center">
                {modalTriggered && (
                  <Webcam
                    videoConstraints={videoConstraints}
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                  />
                )}
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
