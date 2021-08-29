import axios from "axios";

export const userToken = "memipedia_user_token";
export const secureToken = "memipedia_secure_token";

export default axios.create({
    baseURL: "https://brikozub.devcamp.space/memipedia/"
})