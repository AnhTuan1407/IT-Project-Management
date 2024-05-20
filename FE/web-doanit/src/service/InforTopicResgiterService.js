import  axios from "axios"
const URL="http://localhost:8080/api/topic";
export const save= async (value)=>{
    try{
        await axios.post(URL+"/create_topic",value)
        return null;
    }catch (e){
        console.log(e)
        return e.response.data;
    }
}