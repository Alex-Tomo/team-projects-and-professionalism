<<<<<<< HEAD
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { 'Authorization': 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
=======
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { 'Authorization': 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
>>>>>>> 765f8d850a3d348bf537100e686482219fb18127
  }  