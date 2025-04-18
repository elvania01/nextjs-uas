// import Image from "next/image";

// interface FloristCardProps {
//   name: string;
//   image: string;
//   description: string;
// }

// const FloristCard = ({ name, image, description }: FloristCardProps) => {
//   return (
//     <div className="bg-pink-200 rounded-2xl p-6 shadow-md w-full md:w-[300px]">
//       <div className="w-full h-48 relative mb-4 rounded-xl overflow-hidden">
//         <Image
//           src={image}
//           alt={name}
//           fill
//           objectFit="cover"
//           className="rounded-xl"
//         />
//       </div>
//       <h2 className="text-xl font-bold text-center text-pink-800">{name}</h2>
//       <p className="text-sm text-gray-700 mt-2 text-justify">{description}</p>
//     </div>
//   );
// };

// export default FloristCard;

import Image from "next/image";

interface FloristCardProps {
  name: string;
  image: string;
  description: string;
}

const FloristCard = ({ name, image, description }: FloristCardProps) => {
  return (
    <div className="bg-pink-200 rounded-2xl p-6 shadow-md w-full md:w-[300px]">
      <div className="w-full h-48 relative mb-4 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <h2 className="text-xl font-bold text-center text-pink-800">{name}</h2>
      <p className="text-sm text-gray-700 mt-2 text-justify">{description}</p>

      {/* 🔒 FITUR DINONAKTIFKAN SEMENTARA */}
      {/* <div className="flex justify-end mt-4 space-x-3">
        <button className="text-blue-600 hover:text-blue-800">
          <FaPen />
        </button>
        <button className="text-red-600 hover:text-red-800">
          <FaTrash />
        </button>
      </div> */}
    </div>
  );
};

export default FloristCard;
