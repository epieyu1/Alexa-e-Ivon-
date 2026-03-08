import React, { useState, useCallback, useRef } from 'react';
import type { PhotoElement } from './types';
import { COLORS, FLOWERS_MESSAGES, IMAGES } from './constants';
import PhotoCard from './components/PhotoCard';
import PhotoZoom from './components/PhotoZoom';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import Finale from './components/Finale';
import Footer from './components/Footer';
import { Heart } from 'lucide-react';

export default function App() {
  const [elements, setElements] = useState<PhotoElement[]>([]);
  const [appState, setAppState] = useState<'building' | 'animating' | 'finale'>('building');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic max size based on screen width
  const getMaxSize = () => {
    if (typeof window === 'undefined') return 150;
    if (window.innerWidth < 380) return 100;
    if (window.innerWidth < 768) return 130;
    return 150;
  };

  const addElement = useCallback((clientX?: number, clientY?: number) => {
    // Si ya no estamos construyendo, no agregar más fotos
    if (appState !== 'building') return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculamos el tamaño primero para usarlo en los límites de posición
    const maxSize = getMaxSize();
    const size = (maxSize * 0.6) + Math.random() * (maxSize * 0.4);
    const halfSize = size / 2;
    const padding = 16; // Menos padding en los bordes para aprovechar espacio en móvil

    // Límites estrictos para evitar desbordes en los bordes de la pantalla
    const minX = padding + halfSize;
    const maxX = rect.width - padding - halfSize;
    const minY = padding + halfSize + 80; // Más margen arriba para el header
    const maxY = rect.height - padding - halfSize - 120; // Más margen abajo para el footer

    let x, y;

    if (clientX !== undefined && clientY !== undefined) {
      x = clientX;
      y = clientY;
    } else {
      // Distribución aleatoria real en todo el espacio disponible
      x = minX + Math.random() * (maxX - minX);
      y = minY + Math.random() * (maxY - minY);
    }

    setElements((prev) => {
      const currentCount = prev.length;
      const newElement: PhotoElement = {
        id: Math.random().toString(36).substring(2, 11),
        x,
        y,
        size,
        rotation: (Math.random() - 0.5) * 30, // Rotación sutil estilo polaroid
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        imageUrl: IMAGES[currentCount % IMAGES.length],
        message: FLOWERS_MESSAGES[currentCount % FLOWERS_MESSAGES.length],
        timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false, minute: '2-digit', second: '2-digit' }),
      };

      const newElements = [...prev, newElement];
      // Verificar si llegamos a 10 imágenes
      if (newElements.length === 10) {
        setAppState('animating');
        setTimeout(() => {
          setAppState('finale');
        }, 3000); // AUMENTADO: 3 segundos completos de suspenso antes de revelar
      }
      return newElements;
    });
  }, [appState]);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Solo agregar si el click es directamente en el fondo o canvas, no en la UI
    if (e.target === e.currentTarget || (e.target as HTMLElement).id === 'canvas-overlay') {
      addElement(e.clientX, e.clientY);
    }
  };

  const clearCanvas = () => {
    setElements([]);
    setAppState('building');
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#0a0a0c] text-slate-100 flex flex-col font-sans select-none touch-none"
      onPointerDown={handlePointerDown}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
      />

      <Header onClear={clearCanvas} />

      <div id="canvas-overlay" className="absolute inset-0 overflow-hidden">
        {elements.map((el) => (
          <PhotoCard
            key={el.id}
            element={el}
            isAnimating={appState === 'finale'}
            onPhotoClick={setSelectedPhoto}
          />
        ))}
      </div>

      <PhotoZoom photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

      <LoadingScreen isVisible={appState === 'animating'} count={elements.length} />

      <Finale isVisible={appState === 'finale'} onReset={clearCanvas} />

      {appState === 'building' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center animate-pulse flex flex-col items-center gap-2">
            <Heart className="w-10 h-10 text-pink-500/20 mb-2" />
            <span className="text-slate-600 text-[10px] font-mono tracking-[0.3em] uppercase max-w-[250px] leading-relaxed">
              Toca {elements.length}/10 veces para distribuir sus recuerdos
            </span>
          </div>
        </div>
      )}

      {appState === 'building' && elements.length > 0 && (
        <div className="absolute bottom-[140px] left-0 w-full flex justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-1000">
          <span className="text-slate-500 text-[10px] font-mono tracking-[0.2em] uppercase opacity-80 bg-black/20 backdrop-blur-sm px-4 py-1 rounded-full border border-white/5">
            (Toca cualquier imagen para visualizarla al 100%)
          </span>
        </div>
      )}

      <Footer count={elements.length} />
    </div>
  );
}
