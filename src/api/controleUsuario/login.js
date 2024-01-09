import { axios_controle_usuario } from "@/api/visao/Api_axios_visao";
 export async function login(body) {
     try {
         const res = await axios_controle_usuario.post(`/create/users`, body);
         if (res.status === 200) {
             localStorage.setItem("authToken", res.data.token);
             localStorage.setItem("authRefreshToken", res.data.refreshToken);
             return Promise.resolve(res.data);
         } else {
             return Promise.reject(new Error("usuário incorreto"))
         }
     } catch (err) {
         return Promise.reject(err);
     }
 }