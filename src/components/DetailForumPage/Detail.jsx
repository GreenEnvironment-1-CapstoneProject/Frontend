import React, { useState, useEffect } from "react";
import BestTopic from "../ForumPage/bestTopic";
import api from "../../services/api";
import { useParams } from "react-router";
import CommentIcon from "../../assets/png/coment.png";
import Send from '../../assets/png/send.png';
const Detail = () => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState({});
    const [loadMore, setLoadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        getPost();
    }, []);
    const getPost = async () => {
        try {
            const response = await api.get(`/forums/${id}`);
            
            setPost(response.data.data);
            setAuthor(response.data.data.author);
            
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
    <div className={`container max-w-[1280px] mx-auto p-4 flex gap-6 pt-[131px]] pt-40 bg-secondary`}>
        <div className="flex-1 w-full sm:w-[778px] flex flex-col gap-6">
            <div  className="bg-white rounded-[16px] mb-[24px] pt-[51px] pb-[49px] px-[46px]">
                <div className="flex items-start gap-4">
                    <img className="w-[50px] h-[50px] rounded-full" src={author.avatar_url} alt={`Profile ${author.name}`} />
                    <div className="flex flex-col sm:flex-row">
                    <p className="text-[14px] font-bold text-[#2E7D32]">
                        {author.name}
                        <span className="text-black sm:inline hidden">,{" "} </span> 
                    </p>                  
                    <p className="text-[14px] font-medium text-[#262626]">{post.updated_at}</p>
                    </div>
                </div>

                {/* Konten Post */}
                <div className="pl-0 sm:pl-[64px] mt-0 sm:mt-[-22px]">
                    <h3 className="text-lg font-bold text-[#262626]">{post.title}</h3>
                    <p className="mt-4 text-sm font-medium text-[#262626]">{post.description}</p>
                    {post.topic_image && (
                    <img className="mt-4 object-cover w-[632px] h-[282px] rounded-lg shadow-lg" src={post.topic_image} alt="Post" />
                    )}
                </div>

                {/* Tombol Komentar */}
                <div className="flex justify-end mt-[48px]">
                    <a
                    className="flex items-center w-[140px] h-[52px] py-[12] px-[12px]      rounded-lg gap-2 text-sm font-medium text-neutral-800"
                    >
                    <img src={CommentIcon} alt="Comment" />
                    Komentar
                    </a>
                </div>
                <div className="mt-6">
                    <div className="flex items-start gap-3">
                        <img className="w-[50px] h-[50px] rounded-full" src="" alt="Profile" />
                        <div className="relative flex-1">
                            <input
                            type="text"
                            className="py-3 px-4 block w-full border border-[#A1A1AA] rounded-xl text-sm"
                            placeholder="Tambahkan komentar"
                            />
                            <button className="absolute top-1/2 transform -translate-y-1/2 right-4">
                            <img src={Send} alt="Send" className="w-6 h-6" />
                            </button>
                        </div>
                        </div>

                        {/* List Komentar */}
                        <div className="mt-4">
                        {/* {post.comments.slice(0, loadMore ? post.comments.length : 3).map((comment, idx) => (
                            <div key={idx} className="flex items-start gap-4 mb-4">
                            <img className="w-[50px] h-[50px] rounded-full" src={comment.user.profileImage} alt={`Profile ${comment.user.name}`} />
                            <div>
                                <div className="text-base font-bold">{comment.user.name}</div>
                                <div className="text-sm text-[#8A8A8A]">{comment.user.date}</div>
                                <div className="text-sm text-[#262626]">{comment.comment}</div>
                            </div>
                            </div>
                        ))}

                        {post.comments.length > 3 && !loadMore && (
                            <button onClick={handleLoadMoreComments} className="text-blue-500 text-sm font-medium">
                            Lihat komentar lainnya
                            </button>
                        )} */}
                        </div>
                </div>
            </div>
        </div>
            <BestTopic />
    </div>);
};

export default Detail;