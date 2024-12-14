import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BubbleChat from "./BubbleChat";
import api from "../../services/api";

const InputPrompt = ({ onSubmit, chatID }) => {
    const { register, handleSubmit, reset } = useForm();
    const [userMessage, setUserMessage] = useState("");
    const [botMessage, setBotMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getChatHistory = async () => {
        try {
            const response = await api.get(`/chatbots/${chatID}`);
            setChatHistory(response.data);
        } catch (error) {
            console.error("Error fetching chat history:", error.message);
        }
    };

    const sendChatMessage = async (message) => {
        try {
            const response = await api.post("/chatbots", { message });
            return response.data;
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    useEffect(() => {
        if (chatID) {
            getChatHistory();
        }
    }, [chatID]);

    const onSubmitHandler = async (data) => {
        if (!data.message.trim()) return;
        setIsLoading(true);
        setUserMessage(data.message);
        setBotMessage("");
        reset();
        onSubmit(data);
        try {
            const response = await sendChatMessage(data.message);
            setBotMessage(response?.data?.message || "Tanggapan tidak tersedia.");
        } catch (error) {
            setBotMessage("Terdapat kesalahan.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-[968px] px-4">
            <div className="mb-4">
                {chatHistory.map((chat, index) => (
                    <BubbleChat
                        key={index}
                        message={chat.userMessage}
                        response={chat.botMessage}
                    />
                ))}
                {userMessage && <BubbleChat message={userMessage} />}
                {botMessage && <BubbleChat response={botMessage} />}
            </div>

            <form className="relative" onSubmit={handleSubmit(onSubmitHandler)}>
                <input
                    type="text"
                    placeholder="Kirim pesan ke AI Chat"
                    className="input input-bordered input-md w-full font-normal bg-[#f9f9eb] max-[500px]:text-sm text-xl shadow-lg rounded-lg px-10 py-5 text-[#1F2937]"
                    {...register("message")}
                    disabled={isLoading}
                />
                <div className="absolute inset-y-4 start-0 flex items-center ps-4 cursor-pointer">
                    <img src="../src/assets/svg/link.svg" alt="icon-start" />
                </div>
                <button type="submit" disabled={isLoading}>
                    <div className="absolute inset-y-6 right-3 transform -translate-y-1/2 flex items-center cursor-pointer">
                        <img
                            src="../src/assets/svg/send.svg"
                            alt="icon-end"
                            className={`${isLoading ? "opacity-50" : ""}`}
                        />
                    </div>
                </button>
            </form>
        </div>
    );
};

export default InputPrompt;
