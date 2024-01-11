import { axios_controle_usuario } from "@/api/visao/Api_axios_visao";

export async function cadastrarUsuario(body) {
    try {
        console.log("Conteúdo de body recebido no servidor:", body);

        const res = await axios_controle_usuario.post(`/create/user`, body);

        if (res.status >= 200 && res.status < 300) {
            return Promise.resolve(res.data.access_token);
        } else {
            return Promise.reject(new Error("Cadastro sem sucesso"));
        }
    } catch (err) {
        console.log("Erro na solicitação: ", err);
        return Promise.reject(err);
    }
}