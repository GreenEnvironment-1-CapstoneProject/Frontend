const PasswordContent = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Password</h2>
        <p className="text-base">Silahkan masukkan password Anda saat ini untuk mengubah password.</p>
        <div className="space-y-4">
            {/* Input untuk Password Saat Ini */}
            <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-2">Password Saat Ini</label>
                <input
                    type="password"
                    id="current-password"
                    name="current-password"
                    className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                    placeholder="Masukkan password saat ini"
                />
            </div>

            {/* Input untuk Password Baru */}
            <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                <input
                    type="password"
                    id="new-password"
                    name="new-password"
                    className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                    placeholder="Masukkan password baru"
                />
            </div>

            {/* Input untuk Konfirmasi Password Baru */}
            <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password Baru</label>
                <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                    placeholder="Masukkan ulang password baru"
                />
            </div>
            <button className='bg-primary py-3 px-4 block w-[103px] rounded-lg text-white'>
                Simpan
            </button>
        </div>
    </div>
);

export default PasswordContent;
