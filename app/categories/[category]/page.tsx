import { products } from "@/app/lib/products";
import Image from "next/image"; 

interface CategoryPageProps {
  params: {
    category: string;
  };
  categoryProducts: typeof products;
}

const categoryHeadings: Record<string, string> = {
  wedding: "Wedding Bouquets",
  birthday: "Birthday Bouquets",
  anniversary: "Anniversary Bouquets",
  special: "Special Events Bouquets",
};

export default function Page({ params, categoryProducts }: CategoryPageProps) {
  const category = params.category;
  const filtered = products.filter(p => p.category === category);
  const heading = categoryHeadings[category] || "Bouquets";

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">{heading}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categoryProducts.map(products => (
          <div key={products.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <Image src={products.image} alt={products.name} width={400} height={250} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{products.name}</h2>
              <p className="text-sm text-gray-500">{products.description}</p>
              <p className="text-pink-600 font-bold mt-2">Rp {products.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = ["wedding", "birthday", "anniversary", "special"]; // Daftar kategori yang ada
  return categories.map(category => ({
    category,
  }));
};