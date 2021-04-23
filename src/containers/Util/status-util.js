import { setTokenToLocalStorage } from '../Util/auth';

 const statusUtil = {
    checkStatus: function(response) {
        // debugger;
        if (response.ok) {
            for (let [key, value] of response.headers) {
                alert(`${key} = ${value}`)
            }
            const auth = response.headers.get('authorization')
            console.log("auth ", auth)
            if (auth) setTokenToLocalStorage(auth.split(' ')[1]);
            // saveUserToLocalStorage(data.data.user);
            return response.json();
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}

export default statusUtil;