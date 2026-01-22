
import React, { useState } from 'react';
import { Lead } from '../types';

interface PartyDetailsFormProps {
  lead: Lead;
  onSubmit: (updatedLead: Lead) => void;
}

const PartyDetailsForm: React.FC<PartyDetailsFormProps> = ({ lead, onSubmit }) => {
  const [details, setDetails] = useState({
    squad_size: '6-10 personas',
    target_danger: 5,
    risk_of_ex_call: 'Bajo (ha borrado el número)',
    party_vibe: 'Máximo descontrol',
    mvp_drunk: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...lead, ...details });
  };

  return (
    <div className="w-full max-w-lg bg-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-2 border-yellow-500/20 mx-4 animate-fade-in">
      <div className="mb-8 text-center">
        <div className="inline-block px-3 py-1 bg-yellow-500 text-slate-950 text-[10px] font-black rounded-full uppercase tracking-widest mb-4">
          PASO 2: PROTOCOLO DE DESFASE
        </div>
        <h2 className="text-3xl font-bungee text-white mb-2 leading-tight">
          TEST DE <span className="text-yellow-500">ESTRÉS</span> FIESTERO
        </h2>
        <p className="text-xs text-slate-400 font-medium">Necesitamos datos técnicos para analizar vuestra caída.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">¿Cuántos/as caídos habrá? (Tamaño escuadrón)</label>
          <select 
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border-2 border-slate-700 focus:border-yellow-500 outline-none transition-all text-white font-bold text-sm appearance-none"
            value={details.squad_size}
            onChange={(e) => setDetails({ ...details, squad_size: e.target.value })}
          >
            <option>Elite (1-5 personas)</option>
            <option>Convención (6-12 personas)</option>
            <option>Ejército Romano (+12 personas)</option>
            <option>Manifestación ilegal</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Peligrosidad del Novio/a (de 1 a 10)</label>
          <input 
            type="range" min="1" max="10" 
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            value={details.target_danger}
            onChange={(e) => setDetails({ ...details, target_danger: parseInt(e.target.value) })}
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1">
            <span>UN ANGELITO</span>
            <span>SATÁN</span>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Riesgo de llamar al EX a las 4 AM</label>
          <select 
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border-2 border-slate-700 focus:border-yellow-500 outline-none transition-all text-white font-bold text-sm"
            value={details.risk_of_ex_call}
            onChange={(e) => setDetails({ ...details, risk_of_ex_call: e.target.value })}
          >
            <option>Bajo (ha borrado el número)</option>
            <option>Medio (tiene el Insta abierto)</option>
            <option>Crítico (lo tiene en favoritos)</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">¿Quién es el "desastre" del grupo?</label>
          <input
            required
            type="text"
            placeholder="Nombre del aludido"
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border-2 border-slate-700 focus:border-yellow-500 outline-none transition-all text-white font-bold text-sm"
            value={details.mvp_drunk}
            onChange={(e) => setDetails({ ...details, mvp_drunk: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full py-5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bungee text-xl rounded-2xl shadow-xl transform transition-all active:scale-95 border-b-4 border-yellow-700 active:border-b-0"
        >
          ANALIZAR DATOS →
        </button>
      </form>
    </div>
  );
};

export default PartyDetailsForm;
