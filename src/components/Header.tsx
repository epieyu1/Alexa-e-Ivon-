import React from 'react';
import { Trash2 } from 'lucide-react';

interface HeaderProps {
    onClear: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClear }) => {
    return (
        <header className="relative z-10 p-4 md:p-6 flex justify-between items-start pointer-events-none">
            <div>
                <h1 className="text-2xl font-light tracking-tighter flex items-center gap-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400 font-bold">
                        Ivon y Alexa
                    </span>
                    <span className="text-slate-500 text-xs font-mono mt-1">v1.6.8</span>
                </h1>
                <p className="text-slate-400 text-sm font-light mt-1">
                    Un tributo a la reina de su casa y a la princesita que sigue sus pasos.
                </p>
            </div>

            <div className="flex gap-2 pointer-events-auto">
                <button
                    onClick={(e) => { e.stopPropagation(); onClear(); }}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 active:scale-95 transition-all"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </header>
    );
};

export default Header;
