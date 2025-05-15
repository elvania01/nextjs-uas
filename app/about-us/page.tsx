import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-pink-200 text-black">
      {/* Konten Utama */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kiri */}
          <div className="bg-pink-300 p-6 rounded-xl shadow-lg text-center">
            <img src="/noona-logo.png" alt="Logo" className="w-32 mx-auto mb-4" />
            <p className="font-pacifico italic text-sm mb-6">
              Beauty in Every Petal, Joy in Every Moment!
            </p>
            <nav className="space-y-4">
              {[].map(
                (item) => (
                  <p key={item} className="text-lg hover:underline cursor-pointer">
                    {item}
                  </p>
                )
              )}
            </nav>
          </div>

          {/* Tengah */}
          <div className="bg-pink-400 p-6 rounded-xl shadow-lg text-center">
            <h2 className="font-pacifico text-2x font-bold mb-4 italic">BEST PRODUCT</h2>
            {[["/flower-gift-wrap-mockup.jpg", "Buy"], ["/our-product.jpg", "Buy"]].map(
              ([img, btn], idx) => (
                <div key={idx} className="mb-6">
                  <img
                    src={img}
                    alt={`Product ${idx}`}
                    className="rounded-2xl mx-auto mb-2 shadow-md w-60 h-60 object-cover"
                  />
                  <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-60">
                    {btn}
                  </button>
                </div>
              )
            )}
          </div>

          {/* Kanan */}
          <div className="bg-pink-300 p-6 rounded-xl shadow-lg text-center">
            <img src="/noona-logo.png" alt="Logo" className="w-24 mx-auto mb-4" />
            <h2 className="font-pacifico font-bold text-xl">Noona Florist</h2>
            <div className="mt-4 text-left space-y-2">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>Adisucipto</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>noonaflorist@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>+62 812-3456-7890</span>
              </div>
              <div className="mt-4 pt-4 border-t border-pink-400">
                <h4 className="flex items font-semibold">Tim Pengelola:</h4>
                <div className="flex flex-col gap-1">                
                <span>Elvania +62 812-3456-7890</span> 
                <span>Vinsensius +62 812-3456-7890</span>
                <span>Aditya +62 812-3456-7890</span>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
