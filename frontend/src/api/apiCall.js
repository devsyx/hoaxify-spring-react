import axios from "axios";

export const signup = body => {
    return axios.post('/api/1.0/users', body);
}
export const login = creds => {
    return axios.post('/api/1.0/auth', creds);
}
export const logout = () => {
    return axios.post("/api/1.0/logout");
}
export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}
export const getUsers = (page = 0) => {
    return axios.get(`/api/1.0/users?page=${page}`);
}
export const setAuthHeader = ({ token, isLoggedIn }) => {
    if (isLoggedIn) {
        const authHeadValue = `Bearer ${token} `;
        axios.defaults.headers['Authorization'] = authHeadValue;
    }
    else {
        delete axios.defaults.headers['Authorization'];
    }
}
export const getUser = (username) => {
    return axios.get(`/api/1.0/users/${username}`);
}
export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/users/${username}`, body);
}
export const postHoax = (hoax) => {
    return axios.post('/api/1.0/hoaxes', hoax);
}
export const getHoaxes = (page = 0, username) => {
    const path = (username ? `/api/1.0/users/${username}/hoaxes?page=${page}` : `/api/1.0/hoaxes?page=${page}`);
    return axios.get(path);
}
export const getOldHoaxes = (id, username, size = 2) => {
    const path = (username ? `/api/1.0/users/${username}/hoaxes/${id}?size=${size}` : `/api/1.0/hoaxes/${id}?size=${size}`)
    return axios.get(path);
}
export const getNewHoaxCount = (id, username) => {
    const path = (username ? `/api/1.0/users/${username}/hoaxes/${id}?count=true` : `/api/1.0/hoaxes/${id}?count=true`)
    return axios.get(path);
}
export const getNewHoaxes = (id, username) => {
    const path = (username ? `/api/1.0/users/${username}/hoaxes/${id}?direction=after` : `/api/1.0/hoaxes/${id}?direction=after`)
    return axios.get(path);
}
export const postHoaxAttachment = attachment => {
    return axios.post("/api/1.0/hoax-attachment", attachment);
}
export const deleteHoax = (id) => {
    return axios.delete("/api/1.0/hoaxes/" + id);
}
export const deleteUser = (username) => {
    return axios.delete("/api/1.0/users/" + username);
}