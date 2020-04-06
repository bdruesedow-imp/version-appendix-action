const core = require('@actions/core');
const github = require('@actions/github');

try {

  const ref = core.getInput('github-ref');

  const buildNr = core.getInput('github-run-number');
  console.log("Ref: ", ref);

  const useRunNumber = core.getInput('use-run-number');
  console.log("Use run number: ", useRunNumber);

  const branchName = ref.split("/").slice(-1).toString();
  console.log("Branch: ", branchName);

  var apppendix;

  switch(true) {
    // master branch only
    case (ref.endsWith("master")):
      appendix = "RELEASE";
      break;
    // only when release branch without additional branch name
    case (ref.endsWith("release")):
      appendix = "RC";
      break;
    // release with additional branch name e.g. "/release/2020-03"
    case (ref.includes("/release/")):
      appendix = "RC-" + branchName;
      break;
    case (ref.endsWith("develop")):
      appendix = "SNAPSHOT";
      break;
    default:
      appendix = "SNAPSHOT-" + branchName;
      break;
  }

  if (useRunNumber == true) {
      appendix = appendix + "." + buildNr;
  }

  console.log(appendix);
  core.setOutput("appendix", appendix);

} catch (error) {
  core.setFailed(error.message);

}
