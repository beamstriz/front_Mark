import { axios_visao } from "../visao/Api_axios_visao";

export async function VerificarUserSapiens(data){
    try{   
      
       const retorno = await axios_visao.post("/loginSapiens", data);
       console.log("Retorno da API: ", retorno.data)
       
       const resp = (retorno.data).trim() == "Acesso negado, verifique se o CPF e a senha estão corretos!"
       console.log("Resp:", resp)
      
       return resp ? Promise.reject(new Error()) : Promise.resolve(resp);

    }catch( err ){
        console.error("Erro na requisição: ", err)
        return Promise.reject(err);
    }

}