import UseWrapper from "./UseWrapper";

function ScrollIndicator() {
  return (
    <div className="scroll-indicator">
      {UseWrapper(<div className="indicator"></div>)}
    </div>
  );
}

export default ScrollIndicator;
