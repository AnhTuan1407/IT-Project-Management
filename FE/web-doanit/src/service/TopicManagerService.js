import axios from "axios";

const URL_API = "/api/public/topic-manager";

export const getAllTopics = async (page, size) => {
    try {
        const response = await axios.get(`${URL_API}/topic?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        throw new Error("Error getting topics: " + error.message);
    }
};

export const searchTopics = async (name, page, size) => {
    try {
        const response = await axios.get(`${URL_API}/topic-search?name=${name}&page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        throw new Error("Error searching topics: " + error.message);
    }
};

export const getTopicById = async (id) => {
    try {
        const response = await axios.get(`${URL_API}/findById/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Error getting topic by ID: " + error.message);
    }
};

export const deleteTopic = async (infoTopicRegisterDTO) => {
    try {
        await axios.post(`${URL_API}/cancel-topic`, infoTopicRegisterDTO);
        return null;
    } catch (error) {
        return error.response.data;
    }
};

export const createProcess = async (infoTopicRegisterDTO) => {
    try {
        const response = await axios.post(`${URL_API}/create-process`, infoTopicRegisterDTO);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
