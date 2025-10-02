import { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

type LottiePlayerProps = {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  speed?: number;
};

export default function LottiePlayer({ src, loop = true, autoplay = true, className = '', speed = 1 }: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      path: src,
    });
    anim.setSpeed(speed);
    animRef.current = anim;
    return () => {
      anim.destroy();
      animRef.current = null;
    };
  }, [src, loop, autoplay, speed]);

  return <div ref={containerRef} className={className} aria-hidden />;
}


