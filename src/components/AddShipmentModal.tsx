"use client";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { recipient: string; bookTitle: string; location: string }) => void;
}

export default function AddShipmentModal({ isOpen, onClose, onAdd }: Props) {
  const [formData, setFormData] = useState({ recipient: "", bookTitle: "", location: "" });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    onAdd(formData);   
    setFormData({ recipient: "", bookTitle: "", location: "" });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-black mb-6 text-blue-900">New Distribution Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            required 
            placeholder="Recipient Name" 
            className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.recipient}
            onChange={(e) => setFormData({...formData, recipient: e.target.value})} 
          />
          <input 
            required 
            placeholder="Book Title" 
            className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.bookTitle}
            onChange={(e) => setFormData({...formData, bookTitle: e.target.value})} 
          />
          <input 
            required 
            placeholder="Location" 
            className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})} 
          />
          <div className="flex gap-4 mt-8">
            <button type="button" onClick={onClose} className="flex-1 font-bold text-slate-400">Cancel</button>
            <button type="submit" className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}