import axios_controle_usuario from "./visao/Api_axios_visao" 

export async function cadastrarUsuario(body) {
    try {
        const res = await axios_controle_usuario.post(`/login`, body)
        if (!res.status) {
            return Promise.reject(new Error("Cadastro sem sucesso"));
        } else {
            return Promise.resolve();
        }
        
    } catch (err) {
        console.log(err);
    }
}