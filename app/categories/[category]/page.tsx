import { products } from "@/app/lib/products";
import Image from "next/image";

// Simple type definition that matches Next.js expectations
type PageParams = {
  category: string;
};

const categoryHeadings: Record<string, string> = {
  wedding: "Wedding Bouquets",
  birthday: "Birthday Bouquets",
  anniversary: "Anniversary Bouquets",
  special: "Special Events Bouquets",
};

export default function Page({ params }: { params: PageParams }) {
  const category = params.category;
  const filteredProducts = products.filter(p => p.category === category);
  const heading = categoryHeadings[category] || "Bouquets";

  if (filteredProducts.length === 0) {
    return <div>No products found in this category</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">{heading}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <Image 
              src={product.image} 
              alt={product.name} 
              width={400} 
              height={250}
              className="w-full h-60 object-cover"
              priority={false} // Add this to avoid Image optimization warnings
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-pink-600 font-bold mt-2">Rp {product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams(): Promise<Array<{ category: string }>> {
  return ["wedding", "birthday", "anniversary", "special"].map(category => ({
    category,
  }));
}