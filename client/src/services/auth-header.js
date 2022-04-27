/**
 * Module that allows for auth headers to be
 * generated and sent. Takes the access token
 * from local storage, creates a bearer token
 * then passes to the authorization header for
 * the api to consume.
 * 
 * @author Jordan Short, W18039155
 */

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return { 'Authorization': 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}  