import React, { useState, useEffect } from "react";
import commentIcon from "../../assets/png/coment.png";
import BestTopic from "./bestTopic";
import { Ellipsis } from "lucide-react";
import Pagination from "../Pagination";
import api from "../../services/api";
import { Toast } from "../../utils/function/toast";
const ForumPost = ({forums, metaData, curPage, isLoading, user}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const toggleDropdown = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
    };
    
    const handleEdit = () => {
    setIsDropdownOpen(false);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/forums/${id}`);
            Toast.fire({
                icon: "success",
                title: "Forum Berhasil dihapus"
            })
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Forum gagal dihapus"
            })
        }
    };
    // data sample
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        curPage(pageNumber);
    };
    return (
        <div className={`container max-w-[1280px] mx-auto p-4 flex gap-6 pt-[131px]]`}>
            <div className="flex-1 w-full sm:w-[778px] flex flex-col gap-6">
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-[#2E7D32]"></div>
                    </div>
                ):
                (
                    <div>
                    {forums.map((forum, index) => (
                            <div key={index} className="bg-white rounded-[16px] mb-[24px] pt-[51px] pb-[49px] px-[46px]">
                            <div className="flex items-start gap-4">
                            <img className="w-[50px] h-[50px] rounded-full" src={forum.author.avatar_url} alt={`Profile ${forum.author.name}`} />
                            <div className="flex flex-col sm:flex-row w-full justify-between">
                                <div className="flex flex-row">
                                <p className="text-[14px] font-bold text-[#2E7D32] mr-2">
                                    {forum.author.name},
                                </p>
                                <p className="text-[14px] font-medium text-[#262626]">{forum.updated_at}</p>
                                </div>
                                <div className="relative">
                                {user.id === forum.author.id && (
                                    <button onClick={() => toggleDropdown(forum.id)} className="focus:outline-none">
                                        <Ellipsis />
                                    </button>   
                                )}
                                
                                {dropdownIndex === forum.id && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg">
                                    <button
                                        onClick={() => handleEdit(forum.id)}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(forum.id)}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Delete
                                    </button>
                                    </div>
                                )}
                                </div>
                            </div>
                            </div>
                    
                            {/* Konten Post */}
                            <div className="pl-0 sm:pl-[64px] mt-0 sm:mt-[-22px]">
                            <h3 className="text-lg font-bold text-[#262626]">{forum.title}</h3>
                            <p className="mt-4 text-sm font-medium text-[#262626]">{forum.description}</p>
                            {forum.topic_image && <img className="mt-4 object-cover w-full rounded-lg" src={forum.topic_image} alt="Post" />}
                            </div>
                    
                            {/* Tombol Komentar */}
                            <div className="flex justify-end mt-[48px]">
                            <a
                                href={`/detail-forum/${forum.id}`}
                                className="flex items-center w-[140px] justify-between h-[52px] py-[12] px-[12px] border border-[#a1a1aa] rounded-lg gap-2 text-sm font-medium text-neutral-800"
                            >
                                <img src={commentIcon} alt="Comment" />
                                Komentar
                            </a>
                            </div>
                        </div>
                    ))}
                    </div>
                )}
                
                {/* Pagination */}
                 <Pagination currentPage={currentPage} totalPages={metaData.total_page} onPageChange={handlePageChange} />
            </div>

            {/* Topik Terbaik */}
            <BestTopic />
        </div>
    );
};

export default ForumPost;
