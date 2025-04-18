import { SparklesIcon, HeartIcon, GiftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

const iconMap = {
  bouquets: SparklesIcon,  
  weddings: HeartIcon,
  gifts: GiftIcon,
  special: SparklesIcon,
};

export default async function CardWrapper() {
  return (
    <>
      <Card title="Wedding Bouquets" value="45 items" type="weddings" />
      <Card title="Birthday Flowers" value="32 items" type="gifts" />
      <Card title="Anniversary" value="28 items" type="bouquets" />
      <Card title="Special Occasions" value="19 items" type="special" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: string;
  type: 'bouquets' | 'weddings' | 'gifts' | 'special';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-white p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center p-2">
        {Icon ? <Icon className="h-8 w-8 text-pink-600" /> : null}
        <h3 className="ml-3 text-lg font-medium text-pink-800">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          rounded-xl bg-pink-50 px-4 py-6 text-center text-xl text-pink-700`}
      >
        {value}
      </p>
    </div>
  );
};