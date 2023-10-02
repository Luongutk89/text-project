import axios from '../utils/axiosConfig';

const postLogin = (email, password) => {
    return axios.post(`api/v1/users/login`, { email, password });
}

const getUserById = () => {
    return axios.get(`api/v1/users/userId`);
}

const postRegister = async (username, email, password, avatar) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    return await axios.post(`api/v1/users/register`, formData);
}


// Note

const postNote = async (title, description, status) => {
    return await axios.post(`api/v1/notes`, { title, description, status });
}


const getNotes = async () => {
    return await axios.get(`api/v1/notes`);
}


const getNoteById = async (noteId) => {
    return await axios.get(`api/v1/notes/${noteId}`);
}

const updateNoteApi = async (id, updatedNoteData) => {
    return await axios.put(`api/v1/notes/${id}`, updatedNoteData);
};


const deleteNoteApi = async (noteId) => {
    return await axios.delete(`api/v1/notes/${noteId}`);
}


export { postLogin, getUserById, postRegister, postNote, getNotes, deleteNoteApi, getNoteById, updateNoteApi };