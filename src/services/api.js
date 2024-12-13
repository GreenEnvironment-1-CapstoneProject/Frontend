import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: apiUrl,
    headers: { "Content-Type": "application/json" }, 
});

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        console.debug("Request Config:", config); 
        return config;
    },
    (error) => {
        console.error("Request Interceptor Error:", error); 
        return Promise.reject(error);
    }
);

// mengirim pesan ke API chatbot
export const sendChatMessage = async (message) => {
    console.debug("Mengirim pesan ke API:", { message }); 
    try {
        const response = await api.post("/chatbots", { message });
        console.debug("Respon chat API:", response.data); 
        console.debug("Respon chat API (detail):", JSON.stringify(response, null, 2)); 

        return response.data; 
    } catch (error) {
        console.error(
            "Error mengirim pesan chat:", 
            error.response?.data || error.message
        );
        throw new Error(
            error.response?.data?.message || "Gagal mengirim pesan"
        );
    }
};

export default api;
