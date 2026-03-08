import React from 'react';
import { Share2, Info } from 'lucide-react';

interface FooterProps {
    count: number;
}

const Footer: React.FC<FooterProps> = ({ count }) => {
    return (
        <footer className="mt-auto p-6 relative z-10 flex flex-col items-center pointer-events-none">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex items-center gap-6 pointer-events-auto shadow-xl">
                <div className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">Rendered</span>
                    <span className="text-xl font-bold text-pink-400">{count.toString().padStart(2, '0')}</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <button className="flex flex-col items-center group">
                    <Share2 size={18} className="text-slate-400 group-active:text-pink-400 transition-colors" />
                    <span className="text-[9px] text-slate-500 mt-1 uppercase">Deploy</span>
                </button>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col items-center">
                    <Info size={18} className="text-slate-500" />
                    <span className="text-[9px] text-slate-500 mt-1 uppercase">Info</span>
                </div>
            </div>

            <div className="mt-4 text-[10px] text-slate-500 font-mono">
                Made with &lt;love /&gt; para Ivon y Alexa
            </div>
        </footer>
    );
};

export default Footer;
