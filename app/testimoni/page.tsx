const testimonies = [
    {
      name: "Sarah M.",
      content:
        "I'm blown away by the quality and beauty of the flowers I received from Noona Florist. From charming bouquets to elegant arrangements, every piece I’ve ordered has exceeded my expectations.",
    },
    {
      name: "Alex K.",
      content:
        "Finding the perfect flowers for any occasion used to be a challenge until I discovered Noona Florist. Their stunning selection caters to a variety of styles and moments, making every arrangement truly special.",
    },
    {
      name: "James L.",
      content:
        "As someone who always looks for unique and stunning floral arrangements, I’m thrilled to have discovered Noona Florist. Their selection of flowers is not only diverse but also beautifully crafted for every occasion.",
    },
  ];
  
  export default function TestimoniPage() {
    return (
      <div className="min-h-screen bg-pink-300 text-gray-900 px-6 py-10">
        <h1 className="font-pacifico text-3xl font-bold text-center mb-10">Testimoni</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonies.map((item, idx) => (
            <div
              key={idx}
              className="bg-white text-gray-800 rounded-lg p-6 shadow-md"
            >
              <div className="text-yellow-400 text-lg mb-2">★★★★★</div>
              <p className="text-sm mb-4">"{item.content}"</p>
              <p className="font-semibold">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  