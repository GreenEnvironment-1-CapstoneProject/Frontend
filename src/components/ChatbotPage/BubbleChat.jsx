import React from "react";
import Avatar from "../../assets/svg/avatar.svg";
import EcoAvatar from "../../assets/svg/eco-avatar.svg";
import Checklist from "../../assets/svg/checklist.svg";
const BubbleChat = ({ message, response }) => {
    return (
        <>
            {/* Bubble chat untuk User */}
            <div className="chat chat-end pb-8">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="User Avatar" src={Avatar} />
                    </div>
                </div>
                <div className="chat-bubble bg-[#2E7D32] text-white font-bold text-base font-nunito">
                    {message}
                </div>
                <div className="chat-footer pt-3 flex flex-row w-full justify-end items-center gap-1">
                    <div>
                        <img src={Checklist} alt="checklist" />
                    </div>
                    <p>Sent</p>
                </div>
            </div>

            {/* Bubble chat untuk Assistant (Bot) */}
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Eco Avatar" src={EcoAvatar} />
                    </div>
                </div>
                <div className="chat-bubble bg-white text-[#1F2937] max-w-[462px]">
                    {response}
                </div>
                <div className="chat-footer pt-3 flex flex-row w-full items-center gap-1">
                    <div>
                        <img src={Checklist} alt="checklist" />
                    </div>
                    <p>Sent</p>
                </div>
            </div>
        </>
    );
};


export default BubbleChat;
