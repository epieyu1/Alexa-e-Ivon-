import React from 'react';
import { Heart } from 'lucide-react';

interface LoadingScreenProps {
    isVisible: boolean;
    count: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible, count }) => {
    return (
        <div
            className={`absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-700 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <Heart className="w-10 h-10 text-pink-500 mb-6 animate-bounce drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
            <span className="text-pink-400 font-mono text-sm mb-4 tracking-widest uppercase animate-pulse">
                Desencriptando memorias...
            </span>
            <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden shadow-inner relative">
                <div
                    className="h-full bg-gradient-to-r from-pink-500 to-violet-500 absolute top-0 left-0"
                    style={{
                        width: isVisible ? '100%' : '0%',
                        transition: isVisible ? 'width 3000ms linear' : 'none'
                    }}
                />
            </div>
            <div className="mt-3 text-[10px] text-slate-400 font-mono">
                System.Memory.Decrypt({count}/10)
            </div>
        </div>
    );
};

export default LoadingScreen;
