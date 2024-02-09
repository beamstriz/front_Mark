 import axios from "axios";
 import { apiSapiens, controleUsuarioApi, baseApiUrl  } from "../../global";

 export const axios_visao = axios.create({
     baseURL: apiSapiens,
 })

 export const axios_controle_usuario = axios.create({
    baseURL: controleUsuarioApi,
})

export const api_mark = axios.create({
    baseURL: baseApiUrl,
})