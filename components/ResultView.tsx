
import React from 'react';
import { Prize, Diagnosis } from '../types';

interface ResultViewProps {
  prize: Prize;
  diagnosis: Diagnosis | null;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ prize, diagnosis, onReset }) => {
  const handleShare = () => {
    if (!diagnosis) return;
    
    const shareText = `💩 ¡HE AUDITADO NUESTRA DESPEDIDA! 💩\n\n🎯 Resultado: ${diagnosis.global_score}% de viabilidad.\n🔥 Veredicto: "${diagnosis.viral_quote}"\n🤡 Mi Reto: ${prize.name}\n\nAudita la nuestra antes de que acabemos en el calabozo: ${window.location.origin}`;
    
    // Forzamos la apertura de WhatsApp para que sea directo al grupo
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDownload = (type: 'cagadas' | 'top') => {
    // Enlaces de ejemplo de Google Drive tal como se solicita
    const links = {
      cagadas: "https://drive.google.com/file/d/1bE_1rYT3FOZ87Q1xTQf8tgC7plM2kzbd/view?usp=share_link",
      top: "https://drive.google.com/file/d/1mdN1yLzH2vitNZtNMX18YCoCfPN4phCa/view?usp=share_link"
    };
    
    window.open(links[type], '_blank');
  };

  const handleContact = () => {
    const contactText = "Hola! He hecho vuestro test de la Rueda Despedider y necesito ayuda profesional para salvar esta despedida. Mi informe ha salido regular... ¿Me ayudáis?";
    const whatsappUrl = `https://wa.me/34678288284?text=${encodeURIComponent(contactText)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full max-w-2xl space-y-6 md:space-y-10 animate-[scaleIn_0.5s_ease-out] px-2 md:px-0">
      
      {/* CABECERA */}
      <div className="text-center space-y-2">
        <h2 className="text-5xl md:text-7xl font-bungee text-white leading-none">
          INFORME <span className="text-yellow-400 italic">FINAL</span>
        </h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Veredicto del Consultor de Resacas</p>
      </div>

      {/* CARD DE RETO (RESULTADO RULETA) */}
      <div className="bg-white rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border-4 border-slate-900 group">
        <div className="h-4 w-full" style={{ backgroundColor: prize.color }}></div>
        <div className="p-8 md:p-12 text-center">
          <div className="mb-4">
            <span className="bg-rose-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
              Reto Obligatorio Adjudicado
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bungee text-slate-950 leading-[0.9] mb-6 uppercase">
            {prize.name}
          </h2>
          <div className="w-28 h-28 md:w-36 md:h-36 mx-auto flex items-center justify-center rounded-[2rem] bg-slate-50 text-6xl md:text-8xl shadow-inner border-2 border-slate-100 rotate-6 transition-transform group-hover:rotate-0 mb-8">
            🎭
          </div>
          <p className="text-slate-700 text-lg md:text-2xl font-bold italic leading-tight mb-4">
            "{prize.longDescription}"
          </p>
          <p className="text-rose-600 font-black text-xs uppercase">Si no lo haces, pagas la siguiente ronda.</p>
        </div>
      </div>

      {/* DIAGNÓSTICO IA */}
      {diagnosis && (
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl text-white border-2 border-slate-800 relative overflow-hidden">
          <div className="absolute top-8 right-8 rotate-12 opacity-10 pointer-events-none">
            <div className="border-8 border-yellow-500 p-4 text-yellow-500 font-bungee text-4xl">TOP SECRET</div>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h4 className="text-2xl font-bungee text-yellow-500 mb-4 uppercase tracking-tighter">Auditoría de Desmadre</h4>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <span className="text-7xl md:text-[8rem] font-bungee leading-none text-white">{diagnosis.global_score}%</span>
              <div className="text-slate-500 font-black uppercase text-xs md:text-sm tracking-tighter text-center md:text-left">
                Índice de Dignidad <br/> Post-Evento
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <ScoreCard label="Aguante Hígado" score={diagnosis.liver_score} color="emerald" />
            <ScoreCard label="Logística Caos" score={diagnosis.chaos_score} color="rose" />
            <ScoreCard label="Vergüenza Ajena" score={diagnosis.shame_score} color="yellow" />
          </div>

          <div className="space-y-8">
            <div className="bg-slate-800/50 p-6 md:p-8 rounded-[2rem] border border-white/5 relative">
               <div className="absolute -top-3 left-8 bg-yellow-500 text-slate-950 text-[10px] px-3 py-1 rounded-full font-black uppercase">Veredicto Mierder</div>
              <p className="text-slate-300 leading-relaxed text-lg md:text-2xl italic font-medium">"{diagnosis.summary}"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SWOTList title="Superpoderes" items={diagnosis.swot.strengths} icon="✅" color="text-emerald-400" />
              <SWOTList title="Fugas Dignidad" items={diagnosis.swot.weaknesses} icon="❌" color="text-rose-400" />
            </div>

            {/* FRASE VIRAL */}
            <div className="mt-12 pt-12 border-t border-white/10 text-center space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Frase para el grupo de WhatsApp</span>
                <div className="text-3xl md:text-5xl font-bungee text-white leading-none bg-gradient-to-r from-yellow-400 to-rose-400 bg-clip-text text-transparent py-2 px-4">
                  "{diagnosis.viral_quote.toUpperCase()}"
                </div>
              </div>
            </div>

            {/* SECCIÓN DE 4 BOTONES HOMOGENEIZADOS */}
            <div className="flex flex-col gap-4 pt-10 border-t border-white/10">
              
              <button
                onClick={handleShare}
                className="group w-full py-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bungee text-xl md:text-2xl rounded-[2rem] shadow-xl transform transition-all active:scale-95 flex items-center justify-center gap-3 border-b-8 border-emerald-700 active:border-b-0"
              >
                <span>💬</span> COMPARTIR CON EL GRUPO
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleDownload('cagadas')}
                  className="group py-6 bg-slate-800 hover:bg-slate-700 text-white font-bungee text-sm md:text-base rounded-[2rem] border-2 border-slate-700 flex items-center justify-center gap-2 transform transition-all active:scale-95 border-b-4 border-slate-950 active:border-b-0"
                >
                  <span>📉</span> GUÍA 10 CAGADAS
                </button>
                <button
                  onClick={() => handleDownload('top')}
                  className="group py-6 bg-slate-800 hover:bg-slate-700 text-white font-bungee text-sm md:text-base rounded-[2rem] border-2 border-slate-700 flex items-center justify-center gap-2 transform transition-all active:scale-95 border-b-4 border-slate-950 active:border-b-0"
                >
                  <span>🚀</span> GUÍA DESPEDIDA TOP
                </button>
              </div>
              
              <button
                onClick={handleContact}
                className="group w-full py-6 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bungee text-xl md:text-2xl rounded-[2rem] shadow-xl transform transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 border-b-8 border-yellow-600 active:border-b-0"
              >
                <span>👑</span> AYUDA AGENCIA
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6 text-center pt-8">
        <button
          onClick={onReset}
          className="mx-auto px-12 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full transition-all text-[10px] font-black border border-slate-800 uppercase tracking-[0.2em]"
        >
          Nuevo Test (Para el siguiente pringado)
        </button>
      </div>
    </div>
  );
};

const ScoreCard = ({ label, score, color }: { label: string, score: number, color: string }) => {
  const colorMap: Record<string, string> = { emerald: 'text-emerald-400', rose: 'text-rose-400', yellow: 'text-yellow-400' };
  const barColorMap: Record<string, string> = { emerald: 'bg-emerald-400', rose: 'bg-rose-400', yellow: 'bg-yellow-400' };

  return (
    <div className="bg-slate-800/40 p-5 rounded-3xl border border-white/5">
      <div className="text-[9px] font-black text-slate-500 mb-2 uppercase tracking-tighter">{label}</div>
      <div className={`text-3xl font-bungee ${colorMap[color]}`}>{score}%</div>
      <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
        <div className={`h-full ${barColorMap[color]} transition-all duration-1000`} style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );
};

const SWOTList = ({ title, items, icon, color }: { title: string, items: string[], icon: string, color: string }) => (
  <div>
    <h5 className={`${color} font-black text-[10px] uppercase mb-4 tracking-widest`}>{title}</h5>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-sm md:text-base text-slate-400 flex gap-3 font-medium">
          <span className="opacity-50">{icon}</span> {item}
        </li>
      ))}
    </ul>
  </div>
);

export default ResultView;
