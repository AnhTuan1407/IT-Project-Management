import axios from "axios";

export const findAllFaculty = async () =>{
    try{
        const result = await axios.get("api/get-all-faculty")
        return result.data
    } catch (e){
        console.log(e)
    }
}
