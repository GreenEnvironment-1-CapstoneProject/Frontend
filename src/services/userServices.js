import api from "./api";

const userServices = async () => {
    try {
        const response = await api.get("/admin/users");
        return response.data;
    } catch (error) {
        console.error("Error Fetch User Profile", error);
        throw error;
    }
};

export default userServices;
