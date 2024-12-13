import React,{useState, useEffect} from 'react';
import api from "../../../services/api";
import { Toast } from "../../../utils/function/toast";
import useAuthStore from "../../../stores/useAuthStore";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
 const PrivasiContent = () => {
    const { clearToken } = useAuthStore();
    const navigate = useNavigate();
    const handleDelete = async () => {
        Swal.fire({
            title: 'Apakah anda yakin ingin menghapus akun?',
            text: 'Anda tidak dapat mengembalikan akun ini!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, saya yakin',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Kirim permintaan penghapusan akun
                    await api.delete('/users');
                    
                    // Hapus token autentikasi
                    clearToken();
                    
                    // Tampilkan notifikasi sukses
                    Toast.fire({
                        icon: 'success',
                        title: 'Akun berhasil dihapus'
                    });
    
                    // Navigasikan ke halaman login
                    navigate('/login');
                } catch (error) {
                    // Tampilkan notifikasi error
                    Toast.fire({
                        icon: 'error',
                        title: 'Gagal menghapus akun. Silakan coba lagi.'
                    });
                    console.error('Error deleting account:', error);
                }
            }
        });
    }
  return (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Pengaturan Privasi</h2>
        <hr />
        <div className='flex flex-row justify-between'>
        <h2 className='p-5'>
            Minta Penghapusan Akun
        </h2>
        <button className='bg-primary py-3 m-3 block w-[103px] rounded-lg text-white' onClick={handleDelete}>
            Menghapus
        </button>
        </div>
        <hr />
    </div>
  );
 };

export default PrivasiContent;