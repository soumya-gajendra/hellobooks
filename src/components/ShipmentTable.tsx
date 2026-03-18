import { Shipment } from "@/types/shipment";

interface Props {
  shipments: Shipment[];
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string) => void;
}

export default function ShipmentTable({ shipments, onDelete, onUpdateStatus }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
          <tr>
            <th className="p-6">Tracking ID</th>
            <th className="p-6">Details</th>
            <th className="p-6">Status</th>
            <th className="p-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {shipments.map((ship) => (
            <tr key={ship.id} className="hover:bg-slate-50 transition-all">
              <td className="p-6 font-mono font-bold text-blue-600">{ship.id}</td>
              <td className="p-6">
                <div className="font-bold text-slate-800">{ship.recipient}</div>
                <div className="text-xs text-slate-400 italic">"{ship.bookTitle}"</div>
              </td>
              <td className="p-6">
                <button 
                  onClick={() => onUpdateStatus(ship.id)}
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    ship.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    ship.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {ship.status} 🔄
                </button>
              </td>
              <td className="p-6 text-right">
                <button onClick={() => onDelete(ship.id)} className="text-red-400 hover:text-red-600 text-[10px] font-bold uppercase">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}