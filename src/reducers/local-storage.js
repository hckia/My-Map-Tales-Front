//var loggedIn = false;

// export var userLoggedIn = () => {
// 	return loggedIn;
// }

export const loadAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
    try {
        localStorage.setItem('authToken', authToken);
        //loggedIn = true;
    } catch (e) {}
};

export const clearAuthToken = () => {
    try {
        localStorage.removeItem('authToken');
        //loggedIn = false;
    } catch (e) {}
};