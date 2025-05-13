'use client';

const transaksiDummy = [
  { id: 'TX001', namaPembeli: 'Rina', total: 150000, tanggal: '2025-05-10' },
  { id: 'TX002', namaPembeli: 'Dewi', total: 200000, tanggal: '2025-05-11' },
  { id: 'TX003', namaPembeli: 'Sari', total: 400000, tanggal: '2025-05-12' },
];

export default function TransaksiTable() {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-pink-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-pink-800 uppercase">ID Transaksi</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-pink-800 uppercase">Nama Pembeli</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-pink-800 uppercase">Total</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-pink-800 uppercase">Tanggal</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {transaksiDummy.map((trx) => (
            <tr key={trx.id}>
              <td className="px-6 py-4 whitespace-nowrap">{trx.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trx.namaPembeli}</td>
              <td className="px-6 py-4 whitespace-nowrap">Rp {trx.total.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trx.tanggal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
