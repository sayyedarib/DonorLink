export const storePreviousUrl = (url) => {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('previousUrl', url);
  }
  return null;
  };
  
  export const getPreviousUrl = () => {
    if (typeof sessionStorage !== 'undefined') {
      const previousUrl = sessionStorage.getItem('previousUrl');
      sessionStorage.removeItem('previousUrl');
      return previousUrl;
    }
    return null;
  };
  
  