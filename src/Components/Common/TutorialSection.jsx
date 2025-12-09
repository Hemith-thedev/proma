import UseWrapper from "./UseWrapper";
import StepsWrapper from "./StepsWrapper";

function TutorialSection({ data }) {
  return UseWrapper(
    <>
        <div className="title">
          <p>{data.title}</p>
        </div>
        <div className="subtitle">
          <p>{data.subtitle}</p>
        </div>
        <StepsWrapper stepsArray={data.steps} />
        <div className="conclusion">
          <p>Conclusion: {data.conclusion}</p>
        </div>
    </>
  );
}

export default TutorialSection;
