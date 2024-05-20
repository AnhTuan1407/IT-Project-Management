import axios from "axios";


export const findAllDegree = async () => {
    try {
        const result = await axios.get("/api/teachers/getAllDegree");
        return result.data;
    } catch (e) {
        console.log(e)
    }
}
