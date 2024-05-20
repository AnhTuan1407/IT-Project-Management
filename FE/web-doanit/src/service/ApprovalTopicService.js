import axios from "axios"
export const getAllTopicNotApproval = async (page) => {
    try {
        const result = await axios.get('/get-topic-not-approval?page=' + page + '&size=3');
        return result.data;
    } catch (error) {
        console.error("Error while fetching data:", error);
        // throw error; // Re-throw the error to allow the caller to handle it
    }
};
export const approvalTopic = async (item) => {
    try {
        await axios.post('http://localhost:8080/approval', item);
    }
    catch (e) {
        console.log(e);
    }
}
export const cancelTopic = async (item) => {
    try {
        await axios.post('http://localhost:8080/api/public/topic-manager/cancel-topic', item);
    }
    catch (e) {
        console.log(e);
    }
}
export const createProcess = async (item) => {
    try {
        await axios.post('http://localhost:8080/api/public/topic-manager/create-process', item);
        return null;
    }
    catch (e) {
        return e.response.data;
    }
}
export const findByIdTopic = async (id) => {
    try {
        const result = await axios.get('http://localhost:8080/findByIdInfoTopic/' + id);
        return result.data;
    } catch (e) {
        throw e;
    }
}
