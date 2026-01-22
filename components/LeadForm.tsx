
import React, { useState } from 'react';
import { Lead } from '../types';

interface LeadFormProps {
  // Use Partial<Lead> because this step only collects some fields
  onSubmit: (lead: Partial<Lead>) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit }) => {
  // Use Partial<Lead> to allow initial state without all Lead properties
  const [formData, setFormData] = useState<Partial<Lead>>({ 
    name: '', 
    phone: '', 
    province: 'A Coruña',
    sector: 'Fiesta y Discotecas',
    budget_band: '500€-1M€' // Humorously using the consultant's turnover bands
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl p-6 md:p-10 shadow-2xl border-t-8 border-slate-900 mx-4">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bungee text-slate-900 mb-2 leading-tight">
          AUDITORÍA <span className="text-yellow-500">ESTRATÉGICA</span>
        </h2>
        <p className="text-sm md:text-base text-slate-500 font-medium">
          Analizamos la viabilidad de la "despedida" antes de que se convierta en un CAOS.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-1 block">Responsable del Proyecto</label>
            <input
              required
              type="text"
              placeholder="Ej: Manuel"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-slate-900 outline-none transition-all text-slate-900 font-bold text-sm"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-1 block">Canal de Comunicación</label>
            <input
              required
              type="tel"
              placeholder="600 000 000"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-slate-900 outline-none transition-all text-slate-900 font-bold text-sm"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-1 block">Ubicación del Evento (Sede)</label>
          <select 
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-slate-900 outline-none transition-all text-slate-900 font-bold appearance-none text-sm"
            value={formData.province || 'A Coruña'}
            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
          >
            <option>A Coruña</option>
            <option>Sanxenxo</option>
            <option>Vigo</option>
            <option>Ourense</option>
            <option>Otro (Expatriados)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-1 block">Sector de Actividad</label>
            <select 
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-slate-900 outline-none transition-all text-slate-900 font-bold text-sm"
              value={formData.sector || 'Fiesta y Discotecas'}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
            >
              <option>Aventura y Riesgo</option>
              <option>Playa / Mar / Comida</option>
              <option>Fiesta y Discotecas</option>
              <option>Relax y Spa</option>
              <option>Desconocido / Caos</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-1 block">Presupuesto (Turnover)</label>
            <select 
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-slate-900 outline-none transition-all text-slate-900 font-bold text-sm"
              value={formData.budget_band || '500€-1M€'}
              onChange={(e) => setFormData({ ...formData, budget_band: e.target.value })}
            >
              <option value="<100€">Low Cost (&lt;100€)</option>
              <option value="100€-150€">Estándar (100-150€)</option>
              <option value="150€-200€">Premium (150-200€)</option>
              <option value="250€-300€">VIP (250-300€)</option>
              <option value=">300€">Desfase Total (&gt;300€)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 md:py-5 bg-slate-900 hover:bg-slate-800 text-white font-bungee text-lg md:text-xl rounded-2xl shadow-xl transform transition-all active:scale-95"
        >
          INICIAR DIAGNÓSTICO
        </button>
      </form>
      
      <p className="mt-6 text-[8px] md:text-[10px] text-slate-400 text-center uppercase font-bold tracking-widest px-2">
        Información confidencial sujeta a secreto profesional y risas grupales.
      </p>
    </div>
  );
};

export default LeadForm;
