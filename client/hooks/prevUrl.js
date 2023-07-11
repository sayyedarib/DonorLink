export const storePreviousUrl = (url) => {
    sessionStorage.setItem('previousUrl', url);
  };
  
  export const getPreviousUrl = () => {
    const previousUrl = sessionStorage.getItem('previousUrl');
    return previousUrl;
  };
  