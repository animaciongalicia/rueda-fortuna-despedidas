
import React, { useState, useEffect, useRef } from 'react';
import { Prize } from '../types';
import { PRIZES } from '../constants';

interface WheelProps {
  onSpinEnd: (prize: Prize) => void;
}

const Wheel: React.FC<WheelProps> = ({ onSpinEnd }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<SVGSVGElement>(null);

  const spin = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    setHasSpun(true); // Bloqueo definitivo para este ciclo
    
    const randomExtra = Math.floor(Math.random() * 360);
    const newRotation = rotation + 2880 + randomExtra; // Mínimo 8 vueltas para más tensión
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const finalAngle = newRotation % 360;
      const segmentSize = 360 / PRIZES.length;
      const normalizedAngle = (360 - (finalAngle % 360)) % 360;
      const prizeIndex = Math.floor(normalizedAngle / segmentSize);
      
      onSpinEnd(PRIZES[prizeIndex]);
    }, 5000);
  };

  const renderSegments = () => {
    const segmentSize = 360 / PRIZES.length;
    return PRIZES.map((prize, i) => {
      const angleStart = i * segmentSize;
      const angleEnd = (i + 1) * segmentSize;
      
      const x1 = 50 + 50 * Math.cos((Math.PI * angleStart) / 180);
      const y1 = 50 + 50 * Math.sin((Math.PI * angleStart) / 180);
      const x2 = 50 + 50 * Math.cos((Math.PI * angleEnd) / 180);
      const y2 = 50 + 50 * Math.sin((Math.PI * angleEnd) / 180);

      const largeArcFlag = segmentSize > 180 ? 1 : 0;
      const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      return (
        <g key={prize.id} transform={`rotate(-90 50 50)`}>
          <path d={pathData} fill={prize.color} stroke="#fff" strokeWidth="0.3" />
          <text
            x="75"
            y="51.5"
            fill="white"
            fontSize="2.5"
            fontWeight="bold"
            transform={`rotate(${angleStart + segmentSize / 2} 50 50)`}
            className="pointer-events-none select-none uppercase"
            style={{ textAnchor: 'middle' }}
          >
            {prize.name.length > 18 ? prize.name.substring(0, 15) + '...' : prize.name}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 md:p-4 w-full">
      <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px]">
        {/* Aguja */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 z-20">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white border-4 border-yellow-400 rotate-45 rounded-sm shadow-2xl flex items-center justify-center">
             <div className="w-1 h-1 bg-red-500 rounded-full"></div>
          </div>
        </div>
        
        {/* Ruleta */}
        <svg
          ref={wheelRef}
          viewBox="0 0 100 100"
          className="w-full h-full rounded-full shadow-[0_0_50px_rgba(250,204,21,0.2)] border-8 border-slate-900 transition-transform duration-[5000ms] cubic-bezier(0.15, 0, 0.15, 1)"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <circle cx="50" cy="50" r="50" fill="#111" />
          {renderSegments()}
          <circle cx="50" cy="50" r="10" fill="#000" stroke="#fff" strokeWidth="1" />
          <circle cx="50" cy="50" r="6" fill="#facc15" />
        </svg>
      </div>

      {!hasSpun ? (
        <button
          onClick={spin}
          disabled={isSpinning}
          className="mt-12 w-full max-w-sm px-10 py-6 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bungee text-2xl md:text-3xl rounded-full shadow-[0_10px_0_0_#ca8a04] transform transition-all active:scale-95 active:translate-y-2 active:shadow-none"
        >
          ¡PROBAR SUERTE!
        </button>
      ) : (
        <div className="mt-12 px-10 py-6 bg-slate-800 text-slate-400 font-bungee text-xl rounded-full border-2 border-slate-700 animate-pulse">
          {isSpinning ? '¡GIRANDO EL DESTINO!' : 'PREPARANDO INFORME...'}
        </div>
      )}
      
      <p className="mt-6 text-slate-500 text-sm italic font-medium">
        "El azar es el consultor más barato que existe."
      </p>
    </div>
  );
};

export default Wheel;
