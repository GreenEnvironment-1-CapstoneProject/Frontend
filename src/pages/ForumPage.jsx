import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroForum from "../components/ForumPage/HeroForum";
import ForumPost from "../components/ForumPage/ForumPost";
import useAuthStore from "../stores/useAuthStore";
import StickyCtaButton from "../components/StickyCtaButton";
import { useNavigate } from "react-router";
import { Toast } from "../utils/function/toast";
import api from "../services/api";
import { set } from "lodash";
const ForumPage = () => {
  const { token } = useAuthStore();
  
  const navigate = useNavigate();
  const [forums, setForums] = useState([]);
  const [posted, setPosted] = useState(true);
  const [metaData, setMetaData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const handleOnPosted = (onPosted) => {
    setPosted(onPosted);
  }
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
    
  }
  useEffect(() => {
    getForum();
  }, [currentPage]); // Dipanggil saat currentPage berubah

  const getForum = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/forums?page=${currentPage}`);
      const responseUser = await api.get(`/users/profile`);
      setUser(responseUser.data.data);
      setForums(response.data.data);
      setMetaData(response.data.metadata);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
    useEffect(() => {
      if(posted){
        getForum();
        setPosted(false);
      }
      
    }, [posted]);
  useEffect(() => {
    if (!token) {
      Toast.fire({
        icon: "warning",
        title: "Anda harus login terlebih dahulu",
      })
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <div className="bg-secondary">
      <Navbar active="forum" />
      <div className="min-h-screen">
        <HeroForum onPosted={handleOnPosted}/>
        <ForumPost forums={forums} metaData={metaData} curPage={handleCurrentPage} isLoading={isLoading} user={user}/>        
      </div>
      <Footer />
      <StickyCtaButton />
    </div>
  );
};

export default ForumPage;
