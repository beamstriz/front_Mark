import { api_mark } from "@/api/visao/Api_axios_visao";

export async function loginSapiens(body){
    try {
        const res = await api_mark.post(`/login`, body);
        if (res.status === 200) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error("usuário incorreto"))
        }
    } catch (err) {
        return Promise.reject(err);
    }
}