import type { PhotoElement } from '../types';

interface PhotoCardProps {
    element: PhotoElement;
    isAnimating: boolean;
    onPhotoClick: (photo: PhotoElement) => void;
}

const PhotoCard = ({ element, isAnimating, onPhotoClick }: PhotoCardProps) => {
    return (
        <div
            className={`absolute cursor-pointer group active:scale-95 transition-all duration-1000 ease-in-out animate-in fade-in zoom-in ${isAnimating ? 'opacity-0 scale-110 blur-sm pointer-events-none' : 'opacity-100'}`}
            onClick={(e) => {
                e.stopPropagation();
                onPhotoClick(element);
            }}
            style={{
                left: element.x,
                top: element.y,
                transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
                width: element.size,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <div
                className="p-1 pb-4 bg-white/10 backdrop-blur-2xl rounded-sm border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden ring-1 ring-white/10 w-full"
                style={{ height: element.size + 40 }}
            >
                <div className="w-full h-full relative overflow-hidden rounded-xs">
                    <img
                        src={element.imageUrl}
                        alt="Memory"
                        className="w-full h-full object-cover opacity-90 transition-opacity duration-500"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${element.id}/200/200`;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
            </div>

            <div className="mt-[-25px] w-full px-2 text-center z-20">
                <span
                    className="inline-block text-xs md:text-sm font-serif italic tracking-wide text-white drop-shadow-[0_2_10px_rgba(0,0,0,1)] leading-tight whitespace-normal break-words py-1 px-2 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10"
                >
                    {element.message}
                </span>
            </div>
        </div>
    );
};

export default PhotoCard;
