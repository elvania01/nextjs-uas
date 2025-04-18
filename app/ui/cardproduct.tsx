// ui/CardProduct.tsx
import Image from "next/image";

interface ProductProps {
  id: number;
  name: string;
  price: string;
  image: string;
  sale?: boolean;
}

export default function CardProduct({ id, name, price, image, sale }: ProductProps) {
  return (
    <div key={id} className="bg-white text-black rounded-xl shadow-md p-4 relative">
      {sale && (
        <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
          SALE
        </span>
      )}
      <Image src={image} alt={name} width={200} height={200} className="rounded-xl w-full h-48 object-cover" />
      <h3 className="text-lg font-bold mt-2">{name}</h3>
      <p className="text-xl font-semibold">{price}</p>
      <button className="mt-3 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">
        Add to Cart
      </button>
    </div>
  );
}
