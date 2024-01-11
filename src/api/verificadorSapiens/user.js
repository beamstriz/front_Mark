 import { axios_visao } from "../visao/Api_axios_visao";

 export async function VerificarUserSapiens(data){
     try{   
      
        const retorno = await axios_visao.post("/login", data);
        if (retorno.status === 200) {
            localStorage.setItem("Token visão", retorno.data.token);
        }
        
        const resp = (retorno.data).trim() == "Acesso negado, verifique se o e a senha estão corretos!"
      
        return resp ? Promise.reject(new Error()) : Promise.resolve(resp);

     }catch( err ){
         console.error("Erro na requisição: ", err)
         return Promise.reject(err);
     }
 }