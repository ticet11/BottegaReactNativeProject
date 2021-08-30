import axios from "axios";

// API tokens
export const userToken = "memipedia_user_token";
export const secureToken = "memipedia_secure_token";

// API endpoints
export const urlPosts = "memipedia_posts";
export const urlUsers = "memipedia_users";
export const urlLoggedIn = "logged_in";

export default axios.create({
    baseURL: "https://brikozub.devcamp.space/memipedia/"
})