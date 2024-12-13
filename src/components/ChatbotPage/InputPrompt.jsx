import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BubbleChat from "./BubbleChat";
import api from "../../services/api"; 

const InputPrompt = () => {
    const { register, handleSubmit } = useForm();
    const [chatHistory, setChatHistory] = useState([]);

    const sendChatMessage = async (message) => {
        try {
            const endpoint = api.defaults.baseURL + "/chatbots";
            console.log("Sending message to:", endpoint);
    
            const response = await api.post("/chatbots", { message });
            console.log("API response:", response.data); // Cetak respons data API
            return response.data;
        } catch (error) {
            console.error("Error response:", error.response?.data); // Periksa detail error
            console.error("Error message:", error.message);
            throw error;
        }
    };
    
    

    const onSubmit = async (data) => {
        if (!data.message.trim()) {
            console.error("Pesan tidak boleh kosong.");
            return;
        }
    
        // Menambahkan pesan user ke dalam chatHistory
        const userBubble = { role: "user", message: data.message };
        setChatHistory((prev) => [...prev, userBubble]);
    
        try {
            // Mengirimkan pesan ke API dan mendapatkan respons
            const response = await sendChatMessage(data.message); 
    
            // Mengambil message dari API dan menambahkan bubble chat untuk assistant
            const botBubble = {
                role: "assistant",
                message: response?.data?.message || "Tanggapan tidak tersedia."
            };
            
            // Menambahkan bubble chat bot ke dalam chatHistory
            setChatHistory((prev) => [...prev, botBubble]);
        } catch (error) {
            // Menambahkan bubble chat untuk error handling
            const errorBubble = { role: "assistant", message: "Terdapat kesalahan." };
            setChatHistory((prev) => [...prev, errorBubble]);
        }
    };
    

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-[968px] px-4">
            {/* Tampilkan chat history */}
            <div className="mb-4">
                {chatHistory.map((msg, index) => (
                    <BubbleChat
                        key={index}
                        message={msg.role === "user" ? msg.message : ""}
                        response={msg.role === "assistant" ? msg.message : ""}
                    />
                ))}
            </div>

            <form className="relative" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Kirim pesan ke AI Chat"
                    className="input input-bordered input-md w-full font-normal bg-[#f9f9eb] max-[500px]:text-sm text-xl shadow-lg rounded-lg px-10 py-5 text-[#1F2937]"
                    {...register("message")} 
                />
                <div className="absolute inset-y-4 start-0 flex items-center ps-4 cursor-pointer">
                    <img src="../src/assets/svg/link.svg" alt="icon-start" />
                </div>
                <button type="submit">
                    <div className="absolute inset-y-6 right-3 transform -translate-y-1/2 flex items-center cursor-pointer">
                        <img src="../src/assets/svg/send.svg" alt="icon-end" />
                    </div>
                </button>
            </form>
        </div>
    );
};

export default InputPrompt;
