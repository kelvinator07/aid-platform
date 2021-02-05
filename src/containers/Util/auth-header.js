export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('token'));
  
    if (token) {
      return { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
}