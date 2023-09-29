import "./SignUpContainer.css";
import SUTitleContainer from "./SignUpComponents/SUTitleContainer";
import SUGitHubContainer from "./SignUpComponents/SUGitHubContainer";
import SUFooterContainer from "./SignUpComponents/SUFooterContainer";

function SignUpContainer() {
    return (
      <div className="SignUpBlock">
        <SUTitleContainer />
        <SUGitHubContainer />
        <SUFooterContainer />
      </div>
    );
  }
  
  export default SignUpContainer;