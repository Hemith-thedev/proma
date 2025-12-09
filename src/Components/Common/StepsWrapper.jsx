// Components
import UseWrapper from "./UseWrapper";

// Dependencies
import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

function StepsWrapper({ stepsArray }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  useEffect(() => {
    let intervalId;
    if (isAutoPlay) {
      intervalId = setInterval(() => {
        setActiveStepIndex((prevIndex) => (prevIndex + 1) % stepsArray.length);
      }, 5000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlay, stepsArray.length]);
  function Step({ data }) {
    return UseWrapper(
      <>
        <div className="step-number">
          <p>Step {data.stepNumber}</p>
        </div>
        <div className="step-label">
          <p>{data.stepLabel}</p>
        </div>
      </>
    );
  }
  return (
    <div className="steps">
      {UseWrapper(
        <>
          <div className="all-steps">
            {stepsArray.map((step, index) => (
              <div
                key={index}
                className={`step ${index === activeStepIndex ? "active" : ""}`}
                onMouseEnter={() => setActiveStepIndex(index)}
              >
                <Step data={step} />
              </div>
            ))}
          </div>
          <div className="image-wrapper">
            <img
              src={stepsArray[activeStepIndex].image.src}
              alt={stepsArray[activeStepIndex].image.alt}
            />
            <div className="overlay">
              <p>
                {activeStepIndex + 1} / {stepsArray.length}
              </p>
              <button className={(isAutoPlay) ? "play" : ""} onClick={(e) => setIsAutoPlay((prevState) => !prevState)}>
                <div className="play">
                  <Play />
                </div>
                <div className="pause">
                  <Pause />
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StepsWrapper;
