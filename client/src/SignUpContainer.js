import "./SignUpContainer.css";
import SUTitleContainer from "./SignUpComponents/SUTitleContainer";
import SUGitHubContainer from "./SignUpComponents/SUGitHubContainer";
import SUFooterContainer from "./SignUpComponents/SUFooterContainer";
import SULinkContainer from "./SignUpComponents/SULinkContainer";

function SignUpContainer() {
    return (
      <div className="SignUpBlock">
        <SUTitleContainer />
        <SULinkContainer />
        <SUGitHubContainer />
        <SUFooterContainer />
      </div>
    );
  }
  
  export default SignUpContainer;