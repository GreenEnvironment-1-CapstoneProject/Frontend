import React, { useState } from "react";
import { sendChatMessage } from "../../services/api"; 
import { useForm } from "react-hook-form"; 
import BubbleChat from "./BubbleChat";

const InputPrompt = () => {
    const { register, handleSubmit } = useForm(); 
    const [chatHistory, setChatHistory] = useState([]); 

    const onSubmit = async (data) => {
        if (!data.message.trim()) {
            console.error("Pesan tidak boleh kosong.");
            return;
        }
    
        const userBubble = { role: "user", message: data.message };
        setChatHistory((prev) => [...prev, userBubble]);
    
        try {
            const response = await sendChatMessage(data.message);
            console.log("Respons API:", response);
            const botBubble = { 
                role: "assistant", 
                message: response?.reply?.trim() || "Tanggapan tidak tersedia."
            };
            setChatHistory((prev) => [...prev, botBubble]);
        } catch (error) {
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
