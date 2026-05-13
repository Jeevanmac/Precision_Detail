import React, { useState, useEffect } from 'react';

const SafeImage = ({ src, alt, className, fallback = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' }) => {
    const [imgSrc, setImgSrc] = useState(src || fallback);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (src) {
            setImgSrc(src);
            setHasError(false);
        }
    }, [src]);

    const handleError = () => {
        if (!hasError) {
            console.error(`[SafeImage] Failed to load image: ${src}. Falling back.`);
            setImgSrc(fallback);
            setHasError(true);
        }
    };

    return (
        <img 
            src={imgSrc} 
            alt={alt || "Architectural Asset"} 
            className={className} 
            onError={handleError}
        />
    );
};

export default SafeImage;
