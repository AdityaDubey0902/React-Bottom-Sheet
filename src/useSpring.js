// src/useSpring.js
import { useState, useRef, useEffect } from "react";

export default function useSpring(initial) {
  const [value, setValue] = useState(initial);
  const target = useRef(initial);
  const velocity = useRef(0);
  const animationFrame = useRef();

  const update = () => {
    const stiffness = 0.1;
    const damping = 0.8;

    const displacement = target.current - value;
    velocity.current = velocity.current * damping + displacement * stiffness;
    const next = value + velocity.current;

    if (Math.abs(velocity.current) < 0.1 && Math.abs(displacement) < 0.1) {
      setValue(target.current);
      return;
    }

    setValue(next);
    animationFrame.current = requestAnimationFrame(update);
  };

  const setTarget = (t) => {
    target.current = t;
    cancelAnimationFrame(animationFrame.current);
    animationFrame.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(animationFrame.current);
  }, []);

  return [value, setTarget];
}
