
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { AppStep, Lead, Prize, Diagnosis } from './types';
import LeadForm from './components/LeadForm';
import PartyDetailsForm from './components/PartyDetailsForm';
import Wheel from './components/Wheel';
import ResultView from './components/ResultView';

const LOADING_MESSAGES = [
  "Calculando ratio alcohol en sangre...",
  "Consultando antecedentes penales ...",
  "Reservando plaza calabozo municipal...",
  "Analizando nivel de vergüenza...",
  "Contratando abogados de oficio...",
  "Buscando el contacto 'Tele-Almax'...",
  "Verificando si novio/a sigue en pie...",
  "Estimando pérdida de puntos carnet..."
];

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('welcome');
  const [lead, setLead] = useState<Lead | null>(null);
  const [winPrize, setWinPrize] = useState<Prize | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [confetti, setConfetti] = useState<boolean>(false);

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleStart = () => {
    setStep('form_lead');
  };

  const handleLeadSubmit = (data: Partial<Lead>) => {
    setLead(data as Lead);
    setStep('form_details');
  };

  const handleDetailsSubmit = (fullLead: Lead) => {
    setLead(fullLead);
    setStep('wheel');
  };

  const generateDiagnosis = async (currentLead: Lead, currentPrize: Prize) => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Eres un "Consultor Senior de Desmadres y Resacas" gallego con mucha retranca.
        Analiza este proyecto de despedida de soltero y redacta un informe MIERDER brutal y coherente.

        EXPEDIENTE DEL CASO:
        - Responsable: ${currentLead.name}
        - Sede: ${currentLead.province}
        - Estilo de Fiesta: ${currentLead.sector}
        - Escuadrón: ${currentLead.squad_size}
        - Peligrosidad del Novio/a: ${currentLead.target_danger}/10
        - Riesgo llamada al EX: ${currentLead.risk_of_ex_call}
        - El pringado del grupo: ${currentLead.mvp_drunk}
        - Presupuesto: ${currentLead.budget_band}
        - RETO GANADO: "${currentPrize.name}"

        INSTRUCCIONES:
        1. Resumen (summary): Critica ácidamente el plan. Menciona obligatoriamente al pringado "${currentLead.mvp_drunk}" y el peligro de llamar al ex. Vincula el reto "${currentPrize.name}" como la guinda del pastel de este desastre.
        2. Scores (0-100): liver_score, chaos_score, shame_score.
        3. DAFO: 3 por categoría con nombres graciosos y algo de explicacion con retranca gallega(Superpoderes, Fugas de Dignidad, Zonas de Peligro, Enemigos).
        4. Viral Quote: Frase lapidaria para WhatsApp.
        5. Next Step: 2 Consejos irónicos.

        Responde en JSON puro. Sé salvajemente divertido.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              global_score: { type: Type.NUMBER },
              liver_score: { type: Type.NUMBER },
              chaos_score: { type: Type.NUMBER },
              shame_score: { type: Type.NUMBER },
              summary: { type: Type.STRING },
              swot: {
                type: Type.OBJECT,
                properties: {
                  strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                  weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                  opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
                  threats: { type: Type.ARRAY, items: { type: Type.STRING } },
                }
              },
              viral_quote: { type: Type.STRING },
              recommended_next_step: { type: Type.STRING },
            }
          }
        }
      });

      if (response.text) {
        const result = JSON.parse(response.text.trim());
        setDiagnosis(result);
        setStep('result');
      }
    } catch (error) {
      console.error("Diagnosis Error:", error);
      setDiagnosis({
        global_score: 13,
        liver_score: 25,
        chaos_score: 95,
        shame_score: 100,
        summary: "Informe Mierder: Tu plan tiene menos futuro que una cerveza sin alcohol. El riesgo de llamada al ex es crítico y el pringado del grupo ya está pidiendo un taxi antes de empezar.",
        swot: {
          strengths: ["Valentía de borracho", "Ganas de jaleo"],
          weaknesses: ["Dignidad en mínimos", "Presupuesto de estudiante"],
          opportunities: ["Hacer el ridículo", "Acabar en Portugal"],
          threats: ["La policía", "El ex"],
        },
        viral_quote: "Si no hay denuncia, no fue una despedida.",
        recommended_next_step: "Borrar las fotos antes de llegar a casa."
      });
      setStep('result');
    } finally {
      setLoading(false);
    }
  };

  const handleSpinEnd = (prize: Prize) => {
    setWinPrize(prize);
    setConfetti(true);
    if (lead) {
      generateDiagnosis(lead, prize);
    }
    setTimeout(() => setConfetti(false), 5000);
  };

  const resetGame = () => {
    setStep('welcome');
    setLead(null);
    setWinPrize(null);
    setDiagnosis(null);
    setConfetti(false);
  };

  const renderConfetti = () => {
    if (!confetti) return null;
    return Array.from({ length: 50 }).map((_, i) => (
      <div
        key={i}
        className="confetti"
        style={{
          left: `${Math.random() * 100}%`,
          top: `-20px`,
          backgroundColor: ['#f43f5e', '#fbbf24', '#38bdf8', '#a855f7', '#4ade80'][Math.floor(Math.random() * 5)],
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden selection:bg-yellow-400 selection:text-slate-900 font-sans">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-rose-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-yellow-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
      </div>

      {renderConfetti()}

      <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center min-h-screen relative z-10">
        
        {step === 'welcome' && (
          <div className="w-full max-w-4xl text-center space-y-8 md:space-y-12 animate-fade-in">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-rose-600 text-white px-5 py-1.5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl">
                AUDITORÍA DE DESMADRES S.L.
              </div>
              <h1 className="text-6xl md:text-[8rem] font-bungee leading-none tracking-tighter text-white drop-shadow-2xl">
                RUEDA <br className="hidden md:block"/> <span className="text-yellow-400 italic">RETRANCA</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-300 font-medium max-w-2xl mx-auto italic px-4">
                ¿Acabaréis en el calabozo o con una resaca brutal? Gira para auditar vuestro destino.
              </p>
            </div>
            
            <button
              onClick={handleStart}
              className="group relative px-12 md:px-20 py-8 bg-yellow-400 text-slate-950 font-bungee text-3xl md:text-5xl rounded-full shadow-[0_12px_0_0_#ca8a04] transition-all hover:translate-y-[-4px] active:translate-y-[4px] active:shadow-none"
            >
              ¡GIRAR YA!
            </button>
          </div>
        )}

        {step === 'form_lead' && (
          <div className="w-full flex justify-center animate-fade-in">
            <LeadForm onSubmit={handleLeadSubmit} />
          </div>
        )}

        {step === 'form_details' && lead && (
          <div className="w-full flex justify-center animate-fade-in">
            <PartyDetailsForm lead={lead} onSubmit={handleDetailsSubmit} />
          </div>
        )}

        {step === 'wheel' && lead && !loading && (
          <div className="w-full text-center space-y-6 md:space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-2 border-2 border-yellow-500/30 rounded-2xl bg-slate-900/50 backdrop-blur-md">
              <p className="text-yellow-500 font-black tracking-widest uppercase text-xs">
                Auditoría para: <span className="text-white">{lead.name.toUpperCase()}</span>
              </p>
            </div>
            <Wheel onSpinEnd={handleSpinEnd} />
          </div>
        )}

        {loading && (
          <div className="w-full max-w-lg text-center space-y-10 animate-fade-in flex flex-col items-center">
            <div className="relative w-32 h-32 md:w-48 md:h-48">
              <div className="absolute inset-0 border-[12px] border-slate-800 rounded-full"></div>
              <div className="absolute inset-0 border-[12px] border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl md:text-6xl animate-bounce">🤵</span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl md:text-5xl font-bungee text-yellow-500 uppercase leading-none">
                REDACTANDO TU <br/> INFORME MIERDER
              </h3>
              <p className="text-xl md:text-2xl text-slate-300 font-medium italic animate-pulse">
                "{LOADING_MESSAGES[loadingMsgIdx]}"
              </p>
            </div>
          </div>
        )}

        {step === 'result' && winPrize && diagnosis && !loading && (
          <div className="w-full flex flex-col items-center justify-center animate-fade-in py-6 md:py-10">
            <ResultView prize={winPrize} diagnosis={diagnosis} onReset={resetGame} />
          </div>
        )}
      </div>

      <footer className="absolute bottom-4 w-full text-center px-4 pointer-events-none opacity-20">
        <div className="text-white text-[10px] font-black tracking-[0.4em] uppercase">
          PROPIEDAD DE AGENCIA DE DESMADRES PROFESIONALES
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
