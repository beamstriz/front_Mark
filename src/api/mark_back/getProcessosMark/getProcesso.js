import { api_mark } from "@/api/visao/Api_axios_visao"

export async function getProcesso(data){
    console.log("dasdadasd " + JSON.stringify(data))
    try{
        const response = await api_mark.post("/processos", data)
        if(response.status == 200){
            return Promise.resolve();
        }else{
            return Promise.reject();
        }
    }catch(e){
        return Promise.reject();
    }
}