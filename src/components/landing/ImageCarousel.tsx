'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';

const images = [
  '/images/landingcarouselle/1.jpg',
  '/images/landingcarouselle/2.jpg',
  '/images/landingcarouselle/3.jpg',
  '/images/landingcarouselle/4.jpg'
];

// Placeholder base64 image for blur effect
const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcVFBgeMiEeHBwZJjIrJSQwLjk/MjU4N0hZODlKPTRtZmhBRVdqbm5yZWJxbXeAhYSHmJmg/f/bAEMBFRcXHhoeMyEhM3xTNFN8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fP/AABEIAAUACAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AlgAH/9k=';

export default function ImageCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    duration: 50
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [emblaApi]);

  return (
    <div 
      className="embla absolute top-0 left-0 w-full h-full overflow-hidden" 
      ref={emblaRef}
    >
      <div className="embla__container flex h-full">
        {images.map((src, index) => (
          <div 
            key={src} 
            className="embla__slide flex-[0_0_100%] relative"
          >
            <Image 
              src={src} 
              alt={`Background image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              priority={index === 0}
              quality={85}
              placeholder="blur"
              blurDataURL={blurDataURL}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div 
        className="absolute inset-0 z-10" 
        style={{
          background: 'linear-gradient(135deg, rgba(0, 119, 204, 0.10), rgba(76, 175, 80, 0.75), rgba(0, 86, 179, 0.85), rgba(0, 119, 204, 0.85))',
          backgroundSize: '400% 400%',
          animation: 'gradientAnimation 15s ease infinite'
        }}
      />
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
