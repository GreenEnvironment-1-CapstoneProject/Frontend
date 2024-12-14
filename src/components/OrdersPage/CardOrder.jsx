import { CircleHelp, Truck } from "lucide-react";
import productS from "../../assets/jpg/user.jpg";
import { formatToIDR } from "../../utils/function/formatToIdr";
import { p } from "motion/react-client";

const CardOrder = ({ orders }) => {
    return (
        <>
            {orders && orders.length > 0 ? (
                orders.map((transaction) => (
                    <div className="border border-[#BEBEBE] rounded-xl my-4" key={transaction.id}>
                        <div className="py-3 px-6 flex flex-row items-center justify-end border-b gap-1 border-[#BEBEBE]">
                            <Truck width={24} color="#2E7D32" />
                            <p className="text-[#2E7D32] font-normal text-sm max-w">{transaction.status === "pending" ? "Bayar dulu baru ku kirim barang ni" : "Pesanan Dalam Pengiriman"}</p>
                            <CircleHelp width={24} color="#000000" />
                            <p className="text-[#2E7D32] font-semibold text-sm border-l border-[#959090] pl-2">Belum Dinilai</p>
                        </div>
                        <div className="py-3 px-6 border-b border-[#BEBEBE]">
                            {transaction?.details.map((product, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-row gap-4 items-center w-full 
                ${index === 0 ? "" : "pt-4"} 
                ${index === transaction.details.length - 1 ? "" : "border-b border-[#BEBEBE]"} 
                pb-4`}
                                >
                                    <div className="w-[100px] h-[100px]">
                                        <img src={product.product_image} alt="product-image" className="w-full h-full object-top object-cover rounded-xl" />
                                    </div>
                                    <div className="md:flex md:flex-row md:w-full md:justify-between">
                                        <div className="md:flex md:flex-col md:gap-3">
                                            <p className="text-xl text-black font-normal">{product.product_name}</p>
                                            <p className="text-lg text-black font-normal">X {product.product_quantity}</p>
                                        </div>
                                        <p className="text-xl text-black mt-3">{formatToIDR(product.price)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="py-3 px-6 flex flex-col items-end">
                            <div className="flex flex-row gap-2">
                                <h1 className="text-lg text-black">Total Pesanan :</h1>
                                <h2 className="font-bold text-[#2E7D32] text-xl">{formatToIDR(transaction?.total)}</h2>
                            </div>
                            <div className="flex flex-row gap-2 my-3 justify-end">
                                <button className="btn btn-success !bg-[#2E7D32] !border-[#2E7D32] !text-white">{transaction?.status === "pending" ? "Bayar" : "Beli Lagi"}</button>
                                <button className="btn btn-outline hover:!bg-[#2E7D32] hover:!text-white !border-[#2E7D32] !text-[#2E7D32]" disabled={transaction?.status === "pending"}>
                                    Nilai Produk
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center">Data Pesanan Kosong...</p>
            )}
        </>
    );
};

export default CardOrder;
