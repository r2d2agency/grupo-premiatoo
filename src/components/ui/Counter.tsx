import { useEffect, useState, useRef } from "react";
import { useInView, animate } from "framer-motion";

export function Counter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  
  // Extract number and suffix (e.g., "15+" -> number: 15, suffix: "+")
  const numericMatch = value.match(/(\d+)/);
  const suffix = value.replace(/(\d+)/, "");
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : null;

  useEffect(() => {
    if (isInView && targetNumber !== null) {
      const controls = animate(0, targetNumber, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          setDisplayValue(Math.round(value).toString());
        },
      });
      return () => controls.stop();
    } else if (targetNumber === null) {
      setDisplayValue(value);
    }
  }, [isInView, targetNumber, value]);

  return (
    <span ref={nodeRef}>
      {targetNumber !== null ? `${displayValue}${suffix}` : value}
    </span>
  );
}
