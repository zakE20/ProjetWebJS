export function getUser () {
    return localStorage.getItem('currentUser');  
  }
  export function requireLogin (redirect = '../login.html') {
    if (!getUser()) window.location.replace(redirect);
  }
  