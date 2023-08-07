export const storePreviousUrl = (url) => {
  if (typeof localStorage !== 'undefined' && !localStorage.getItem('previousUrl')) {
    localStorage.setItem('previousUrl', url);
  }
};

export const getPreviousUrl = () => {
  if (typeof localStorage !== 'undefined') {
    const previousUrl = localStorage.getItem('previousUrl');
    if (previousUrl) {
      localStorage.removeItem('previousUrl');
      return previousUrl;
    }
  }
  return null;
};
