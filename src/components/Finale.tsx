import React from 'react';
import { FINAL_IMAGE } from '../constants';

interface FinaleProps {
    isVisible: boolean;
    onReset: () => void;
}

const Finale: React.FC<FinaleProps> = ({ isVisible, onReset }) => {
    const [phase, setPhase] = React.useState<'tribute' | 'monda' | 'restart'>('tribute');

    React.useEffect(() => {
        if (isVisible) {
            setPhase('tribute');

            // Phase 1 -> Phase 2 (after 10 seconds)
            const timer1 = setTimeout(() => {
                setPhase('monda');
            }, 10000);

            // Phase 2 -> Phase 3 (after another 3 seconds)
            const timer2 = setTimeout(() => {
                setPhase('restart');
            }, 13000);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        } else {
            setPhase('tribute');
        }
    }, [isVisible]);

    return (
        <div
            className={`fixed inset-0 h-[100dvh] z-50 transition-all duration-[3000ms] ease-in-out bg-black ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <img
                src={FINAL_IMAGE}
                alt="Final Memory"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[15000ms] ease-out ${isVisible ? 'scale-100' : 'scale-125'}`}
            />
            {/* Gradiente sutil que se desvanece en la fase final para mostrar la foto limpia */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-[2000ms] ${phase === 'restart' ? 'opacity-0' : 'opacity-100'}`} />

            {/* Phase 1: Emotional Tribute (10s) */}
            <div className={`absolute bottom-0 left-0 w-full p-6 md:p-10 text-center transition-all duration-[1000ms] ease-out ${isVisible && phase === 'tribute' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
                <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-2 md:mb-4 shadow-black drop-shadow-2xl">
                    ¡Feliz Día de la Mujer!
                </h2>
                <h3 className="text-xl md:text-2xl font-bold text-pink-400 mb-4">Para Ivon y Alexa</h3>
                <p className="text-white/90 font-mono text-sm max-w-md mx-auto drop-shadow-lg italic">
                    "Ivon: Eres una mujer extraordinaria y una madre ejemplar. Me siento muy afortunado de que seas la madre de Alexa."
                </p>
            </div>

            {/* Phase 2: La Monda Reveal (3s) + Persists in Phase 3 */}
            <div className={`absolute bottom-0 left-0 w-full p-8 md:p-12 text-center transition-all duration-[1000ms] ease-out ${isVisible && (phase === 'monda' || phase === 'restart') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}>
                <h1 className="text-2xl md:text-4xl font-serif italic text-white/90 tracking-widest uppercase">
                    Porque tú <span className="font-bold text-white border-b border-white/30 pb-1">eres la monda</span>
                </h1>
            </div>

            {/* Phase 3: Restart Experience - No overlay, just the photo and text */}
            <div className={`absolute bottom-0 left-0 w-full p-8 flex flex-col items-center justify-center transition-all duration-[2000ms] ease-out ${isVisible && phase === 'restart' ? 'opacity-100 translate-y-[-100px]' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <p className="text-white/40 font-mono text-[10px] mb-4 tracking-[0.4em] uppercase">Memoria Finalizada</p>
                <button
                    onClick={(e) => { e.stopPropagation(); onReset(); }}
                    className="px-8 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/60 text-[10px] font-light tracking-[0.3em] hover:bg-white/10 transition-all active:scale-95 uppercase"
                >
                    Reiniciar
                </button>
            </div>
        </div>
    );
};

export default Finale;
