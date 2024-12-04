import React from "react";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay } from "swiper/modules";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import api from "../../services/api";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Toast } from "../../utils/function/toast";
import { formatToIDR } from "../../utils/function/formatToIdr";

import shoppingBasket from "../../assets/svg/shopping-basket.svg";
import star from "../../assets/svg/star.svg";
import squares from "../../assets/svg/squares.svg";
import shoppingCart from "../../assets/svg/shopping-cart.svg";
import Union from "../../assets/svg/Union.svg";
import Leaf from "../../assets/svg/leaf.svg";

const ProductDetail = () => {
    const reviews = [
        {
            name: "Jamal",
            rating: 4,
            review: "Tote bag ini sangat praktis dan ramah lingkungan. Saya sangat puas dengan kualitas bahan dan desainnya. Sangat cocok untuk kebutuhan sehari-hari.",
            date: "06 September 2024",
        },
        {
            name: "Budi",
            rating: 5,
            review: "Kualitas barang nya bagus, harganya murah dan untuk proses pengirimannya juga sangat cepat",
            date: "06 September 2024",
        },
        {
            name: "Jamal",
            rating: 4,
            review: "Tote bag ini sangat praktis dan ramah lingkungan. Saya sangat puas dengan kualitas bahan dan desainnya. Sangat cocok untuk kebutuhan sehari-hari.",
            date: "06 September 2024",
        },
        {
            name: "Budi",
            rating: 5,
            review: "Kualitas barang nya bagus, harganya murah dan untuk proses pengirimannya juga sangat cepat",
            date: "06 September 2024",
        },
        {
            name: "Jamal",
            rating: 4,
            review: "Tote bag ini sangat praktis dan ramah lingkungan. Saya sangat puas dengan kualitas bahan dan desainnya. Sangat cocok untuk kebutuhan sehari-hari.",
            date: "06 September 2024",
        },
        {
            name: "Budi",
            rating: 5,
            review: "Kualitas barang nya bagus, harganya murah dan untuk proses pengirimannya juga sangat cepat",
            date: "06 September 2024",
        },
        {
            name: "Jamal",
            rating: 4,
            review: "lumayan lah bisa buat bawa barang sehari hari",
            date: "06 September 2024",
        },
        {
            name: "Budi",
            rating: 2,
            review: "barangnya kurang bagus",
            date: "06 September 2024",
        },
    ];
    const [products, setProducts] = useState([]);
    const [impact, setImpact] = useState([]);
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [amount, setAmount] = useState(1);

    const { id } = useParams();
    useEffect(() => {
        try {
            setIsLoading(true);
            api.get(`/products/${id}`).then((res) => {
                setProducts(res.data.data);
                setImage(res.data.data.images[0]?.image_url);
                setImpact(res.data.data.category_impact);
            });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, []);
    const handleAddToCart = async () => {
        const data = {
            product_id: products.product_id,
            quantity: amount,
        };

        try {
            const response = await api.post("/cart", data);
            if (response.status == 201) {
                Toast.fire({
                    icon: "success",
                    title: `${products.name} berhasil ditambahkan ke Keranjang`,
                });
            } else {
                console.warn(response);
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: { error },
            });
        }
    };

    useEffect(() => {}, [handleAddToCart]);

    return (
        <div>
            <div className="flex md:flex-row flex-col  mx-auto w-full justify-center items-center gap-2 text-neutral-800">
                <div className="md:w-[726px] md:h-[470px] w-[382px] h-[296px] bg-white rounded-lg border border-gray-200">
                    <img src={image} alt={products.name} className="md:w-[662px] md:h-[406px] w-[318px] h-[232px] mt-8 object-cover rounded-lg mx-auto" />
                </div>
                <div className="md:w-[520px] md:h-[470px] w-[382px] h-[372px] bg-white rounded-lg border border-gray-200">
                    <h1 className="md:text-3xl text-xl font-bold mt-8 ml-8">{products.name}</h1>
                    <h1 className="md:text-4xl text-xl font-bold mt-2 md:mt-8 ml-8">{formatToIDR(products.price)}</h1>
                    <div className="flex flex-row py-5 ml-8 text-primary">
                        <div className="px-6 py-2 bg-[#CCFBF1] flex rounded-lg">
                            <img src={shoppingBasket} alt="shopping-bag" className="w-4 h-4 mr-2" />
                            <p className="md:text-sm text-xs font-bold ">Terjual 16</p>
                        </div>
                        <div className="px-6 py-2 mx-2 bg-[#CCFBF1] flex rounded-lg">
                            <img src={star} alt="shopping-bag" className="w-4 h-4 mr-2" />
                            <p className="md:text-sm text-xs font-bold">Rating (4 Ulasan)</p>
                        </div>
                        <div className="px-6 py-2 mx-2 bg-[#CCFBF1] flex rounded-lg">
                            <img src={squares} alt="shopping-bag" className="w-4 h-4 mr-2" />
                            <p className="md:text-sm text-xs font-bold">Tas</p>
                        </div>
                    </div>
                    <div className="flex flex-row ml-8 mt-5">
                        <button
                            onClick={() => setAmount(amount - 1)}
                            disabled={amount <= 1}
                            className={`text-2xl font-bold w-[38px]  border rounded-lg transition-all duration-300 ${
                                amount <= 1 ? "bg-gray-300  text-white cursor-not-allowed" : "border-primary hover:bg-primary hover:text-white transition-all"
                            }`}
                        >
                            -
                        </button>
                        <input
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                setAmount(isNaN(value) || value < 1 ? 1 : value); // Mencegah angka negatif
                            }}
                            type="number"
                            value={amount}
                            className="text-2xl text-center font-bold py-1 px-4 mx-2 border-none w-20  md:h-[38px] border-primary border rounded-lg bg-white"
                        />
                        <button
                            onClick={() => setAmount(Number(amount) + 1)} // Pastikan selalu berupa angka
                            className="text-2xl font-bold w-[38px] border-primary border rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                        >
                            +
                        </button>
                        <h1 className="md:text-xl text-base font-semibold ml-4 ">Subtotal {formatToIDR(products.price * amount)}</h1>
                    </div>
                    <div className="flex flex-col w-full px-4 md:px-10">
                        <button className="bg-primary text-white text-base font-bold py-2 text-center  mt-4 rounded-lg w-full border border-primary hover:text-primary hover:bg-white transition-all duration-300">
                            Beli sekarang
                        </button>
                        <button
                            onClick={() => handleAddToCart()}
                            className="border-primary border text-primary text-base font-bold py-2 text-center mt-3 rounded-lg hover:border-white hover:text-white hover:bg-primary transition-all duration-300 flex items-center justify-center"
                        >
                            <img src={shoppingCart} alt="shopping-bag" className="w-4 h-4 mr-2" />
                            <p>Tambah ke Keranjang</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex md:flex-row max-[773px]:items-center flex-col mx-auto w-full justify-center items-start gap-2 text-neutral-800">
                <div>
                    <h1 className="text-3xl font-bold  py-10">Dampak yang diberikan</h1>
                    <div className="md:w-[726px] h-full w-[382px] bg-white rounded-lg border border-gray-200 p-8">
                        {impact.map((impact, index) => (
                            <div key={index} className="flex md:flex-row flex-col bg-green-50 md:w-[662px] md:h-[105px] rounded-lg p-3 border border-[#99F6E4] mb-4 items-start">
                                <div className="bg-[#DCFCE7] p-4 text-center rounded-xl ml-2">
                                    <img src={index === 1 && impact.length > 1 ? Leaf : Union} alt="impact" className="w-[45px] h-[45px]" />
                                </div>
                                <div className="w-full p-3">
                                    <h1 className="text-lg font-bold">{impact.impact_category.name}</h1>
                                    <p className="text-base font-semibold">{impact.impact_category.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold  py-10">Deskripsi </h1>
                    <div className="md:w-[520px] w-[382px] h-full bg-white rounded-lg border border-gray-200 p-8 md:p-10 ">
                        <div className="bg-green-50 md:w-[437px] h-full rounded-lg border border-[#99F6E4]">
                            <p className="md:text-base text-sm font-normal text-justify p-6">{products.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full mx-auto gap-6 text-neutral-800 items-center justify-center">
                <div>
                    <h1 className="text-3xl font-bold py-10">Review</h1>
                    <div className="relative  w-[375px] md:w-[1300px]  ">
                        <Swiper
                            modules={[Mousewheel, Autoplay]}
                            spaceBetween={20}
                            autoplay={{ delay: 3000 }}
                            slidesPerView={1}
                            mousewheel
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 3.5,
                                    spaceBetween: 30,
                                },
                            }}
                            grabCursor
                            loop={true}
                            className="pb-12 md:h-[300px] h-[350px]"
                        >
                            {reviews.map((review, index) => (
                                <SwiperSlide key={index} className="px-4">
                                    <div className="flex flex-col  w-[331px] h-[225px] bg-white shadow-md rounded-lg p-4 border border-[#99F6E4]">
                                        <div>
                                            {/* Render stars using a loop or array creation */}
                                            {Array.from({ length: Math.floor(review.rating) }, () => (
                                                <span key={Math.random()} className="text-yellow-500">
                                                    ★
                                                </span>
                                            ))}
                                            {review.rating % 1 === 0.5 && (
                                                <span key={Math.random()} className="text-yellow-500">
                                                    ☆
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-lg font-bold py-2">{review.name}</h2>
                                        <p className="text-base font-medium h-44">"{review.review}"</p>
                                        <p className="text-sm font-semibold ">{review.date}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
