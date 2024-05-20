import  axios from "axios"
const URL="http://localhost:8080/api/Group";
const GROUP_LIST_API = "/list-group";
const ACCEPT_GROUP_API="/accept-group";
const token = "$2a$12$DpcU.O9Viz2nj2UkNd5IquL2ulQgoZ.REv2y9QAwsTMW2J42ser5u";
const DELETE_GROUP_API="/delete-group";
const CREATE_DEADLINE_API="/create-deadline";
const axiosInstance = axios.create({
    baseURL: URL,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
});
export const save= async (groupAccount)=>{
    try{
        await axios.post(URL+"/createGroup",groupAccount)
        return null;
    }catch (e){
        return e.response.data;
    }
}
export const findAll = async (pageNumber,searchKey) => {

    try{
        const result=await  axiosInstance.get(`${GROUP_LIST_API}/?page=${pageNumber}&find=${searchKey}`)
        console.log(result.data);
        return result.data;
    } catch (e){
        console.log(e)
    }
};
export const acceptGroup=async (id)=>{
    try {
        const result=await axiosInstance.patch(`${ACCEPT_GROUP_API}/${id}`)
        console.log(result.data);
        return result.data
    } catch (e) {
        console.log(e)
    }
}
export const deleteGroup=async (id,listStudentId)=>{
    try {
        const result=await axiosInstance.patch(`${DELETE_GROUP_API}/${id}`, listStudentId)
        console.log(result.data);
        return result.data
    } catch (e) {
        console.log(e)
    }


}
export const createDeadLine=async (id,deadline)=>{
    try {
        const result=await axiosInstance.patch(`${CREATE_DEADLINE_API}/${id}/${deadline}`)
        console.log(result.data);
        return result.data
    } catch (e) {
        console.log(e)
    }

}