export default function TrackingOrderPage() {
    return (
      <div className="min-h-screen bg-pink-50 text-gray-800 p-6">
        <h1 className="font-pacifico text-3xl font-bold mb-4 text-pink-600">Tracking Order</h1>
        <p className="mb-6">Masukkan nomor pesanan Anda untuk melacak status pengiriman.</p>
        <div className="max-w-md space-y-4">
          <input
            type="text"
            placeholder="Nomor Pesanan"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all">
            Lacak Sekarang
          </button>
        </div>
      </div>
    );
  }
  