import { api_mark } from "@/api/visao/Api_axios_visao"

export async function getPageMark(data){

    try{
        const response = await api_mark.post("/page", data)
        if(response.status == 200){
            return Promise.resolve();
        }else{
            return Promise.reject();
        }
    }catch(e){
        return Promise.reject();
    }
}