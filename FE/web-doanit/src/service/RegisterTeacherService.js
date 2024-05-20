import axios from "axios";

export const findAll = async (pageNumber) => {
    try {
        const result = await axios.get('/api/registerTeacher/list'+ "/?page=" + pageNumber)
        return result.data;
    } catch (e) {
        throw e;
    }
}

export const findByIdTeacher = async (id) => {
    try {
        const result = await axios.get('/api/registerTeacher/findByIdTeacher/' + id);
        return result.data;
    } catch (e) {
        throw e;
    }
}
export const registerTeacher = async (teacherId) => {
    try {
        // debugger;
        await axios.post('/api/registerTeacher/register/' + teacherId);
    } catch (e) {
        throw e;
    }
}
