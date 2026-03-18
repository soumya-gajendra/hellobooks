
"use client";

import { useState, useEffect } from "react";
import ShipmentTable from "@/components/ShipmentTable";
import AddShipmentModal from "@/components/AddShipmentModal";
import { Shipment, ShipmentStatus } from "@/types/shipment";

export default function Home() {
  const [allShipments, setAllShipments] = useState<Shipment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

 
  useEffect(() => {
    const saved = localStorage.getItem("meru_data_v4");
    if (saved) setAllShipments(JSON.parse(saved));
  }, []);


  useEffect(() => {
    localStorage.setItem("meru_data_v4", JSON.stringify(allShipments));
  }, [allShipments]);

const handleAdd = (data: { recipient: string; bookTitle: string; location: string }) => {
    const newShip: Shipment = {
      id: `HB-${Math.floor(1000 + Math.random() * 9000)}`,
      recipient: data.recipient,
      bookTitle: data.bookTitle,
      location: data.location,
      status: "Pending",
      estimatedArrival: "TBD",
      dateAdded: new Date().toLocaleDateString()
    };
    setAllShipments([newShip, ...allShipments]);
    setIsModalOpen(false);
  };
  const deleteShip = (id: string) => {
    if (confirm("Are you sure you want to remove this record?")) {
      setAllShipments(allShipments.filter(s => s.id !== id));
    }
  };

  const updateStatus = (id: string) => {
    const cycle: ShipmentStatus[] = ["Pending", "In Transit", "Delivered"];
    setAllShipments(allShipments.map(s => s.id === id ? 
      { ...s, status: cycle[(cycle.indexOf(s.status) + 1) % cycle.length] } : s
    ));
  };

  const filtered = allShipments.filter(s => 
    s.recipient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-900">
      <div className="max-w-6xl mx-auto">
        
      
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl font-black text-blue-900 tracking-tight">Hellobooks Dashboard</h1>
          <div className="flex gap-3 w-full md:w-auto">
            <input 
              placeholder="Search records..." 
              className="px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 bg-white" 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all whitespace-nowrap"
            >
              + New Order
            </button>
          </div>
        </header>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-blue-600">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Orders</h3>
            <p className="text-3xl font-black mt-1">{allShipments.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-orange-500">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">In Transit</h3>
            <p className="text-3xl font-black mt-1">{allShipments.filter(s => s.status === 'In Transit').length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-green-600">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Completed</h3>
            <p className="text-3xl font-black mt-1">{allShipments.filter(s => s.status === 'Delivered').length}</p>
          </div>
        </div>

       
        <ShipmentTable shipments={filtered} onDelete={deleteShip} onUpdateStatus={updateStatus} />
        
    
        <AddShipmentModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAdd={handleAdd} 
        />
      </div>
    </main>
  );
}