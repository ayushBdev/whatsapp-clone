import axios from "axios";

const API = axios.create({baseURL: "https://whatsapp-clone-servers.herokuapp.com/"});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});

export const signIn = (formData) => API.patch("/auth/signin", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);
export const logout = (id) => API.patch(`/auth/logout/${id}`);
export const getUsers = () => API.get("/auth");
export const getStatus= (id) => API.get(`/auth/status/${id}`);

export const getRoom = () => API.get("/room");
export const createRoom = (data) => API.post("/room", data);
export const deleteRoom = (id) => API.delete(`/room/delete/${id}`);

export const createMessage = (id,Data) => API.patch(`/message/create/${id}`, Data);

export default API;