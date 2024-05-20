import axios from "axios";

export const detailInfo = async () => {
    try {
        // debugger;
        const response = await axios.get("/api/auth/user-info");
        if (response.status === 200) {
            console.log(response.data)
            return response.data;
        }
    } catch (e) {
        throw e;
    }
};

export const changePassword = async (password) => {
    try {
        const response = await axios.post("/api/auth/change-password", password);
        if (response.status === 200) {
            return response.data;
        }
    } catch (e) {
        throw e;
    }
};
