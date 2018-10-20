

export const setPageTitle = (pageTitle) => {
  const pageTitleDiv = document.getElementById("pageTitle");
  if (pageTitleDiv) {
    pageTitleDiv.innerHTML = pageTitle;
  }
  else {
    console.log("pageTitleDiv not found");
  }
};


export default setPageTitle;