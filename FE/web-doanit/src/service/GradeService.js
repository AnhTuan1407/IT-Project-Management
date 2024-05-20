import axios from "axios";
const URL_API = "http://localhost:8080/api/get-all-grade"
export const findAllGrade = async () =>{
    try{
        const result = await axios.get(URL_API)
        return result.data
    } catch (e){
        console.log(e)
    }
}
