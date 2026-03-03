import './CinematicBackground.css';

export const CinematicBackground = () => {
    return (
        <div className="cinematic-bg">
            {/* SVG Grain — feTurbulence noise */}
            <svg className="vellum-grain">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
            <div className="vignette-layer" />
        </div>
    );
};
