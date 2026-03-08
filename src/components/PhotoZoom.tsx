import React from 'react';
import { X, Calendar } from 'lucide-react';
import type { PhotoElement } from '../types';

interface PhotoZoomProps {
    photo: PhotoElement | null;
    onClose: () => void;
}

const PhotoZoom: React.FC<PhotoZoomProps> = ({ photo, onClose }) => {
    if (!photo) return null;

    return (
        <div
            className="fixed inset-0 h-[100dvh] z-[100] flex flex-col bg-black animate-in fade-in duration-700 pointer-events-auto"
            onClick={onClose}
        >
            {/* Immersive Image Background */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={photo.imageUrl}
                    alt="Zoomed memory"
                    className="w-full h-full object-cover animate-in zoom-in-110 duration-[20000ms] ease-out"
                />
                {/* Elegant Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent transition-opacity duration-1000" />
            </div>

            {/* Top Header / Close Button Area */}
            <div className="relative z-10 flex justify-end p-6 md:p-10 pointer-events-none">
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="pointer-events-auto p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-black/60 transition-all active:scale-95"
                    aria-label="Cerrar vista"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Narrative Section - Bottom Positioned */}
            <div className="relative z-10 mt-auto w-full p-8 md:p-16 flex flex-col items-center text-center animate-in slide-in-from-bottom-10 duration-1000">
                <div className="flex items-center gap-3 text-pink-400 mb-4">
                    <div className="w-12 h-px bg-pink-400/50" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] drop-shadow-lg">Recuerdo Guardado</span>
                    <div className="w-12 h-px bg-pink-400/50" />
                </div>

                <h2 className="text-2xl md:text-5xl font-serif italic text-white/95 leading-tight mb-4 md:mb-6 max-w-4xl drop-shadow-2xl px-2">
                    "{photo.message}"
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-8 text-white/40 font-mono text-[9px] uppercase tracking-[0.2em] pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-pink-500/50" />
                        <span>{photo.timestamp} — Hoy</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <span className="opacity-50">ID: {photo.id.toUpperCase()}</span>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="md:hidden px-6 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 tracking-widest text-[8px]"
                    >
                        Tocar para cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhotoZoom;
