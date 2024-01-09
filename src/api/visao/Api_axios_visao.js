 import axios from "axios";
 import { apiSapiens, controleUsuarioApi  } from "../../global";

 export const axios_visao = axios.create({
     baseURL: apiSapiens,
 })

 export const axios_controle_usuario = axios.create({
    baseURL: controleUsuarioApi,
})