import axios from "axios";

export const memeToken = "memipedia_secure_token";

export default axios.create({
    baseURL: "https://brikozub.devcamp.space/memipedia/"
})