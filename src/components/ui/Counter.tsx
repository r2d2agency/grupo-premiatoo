import { useEffect, useState, useRef } from "react";
import { useInView, animate } from "framer-motion";

export function Counter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  
  // Extract first number (with optional decimals) plus prefix/suffix.
  // e.g. "R$ 619,59 mi" -> prefix: "R$ ", number: 619.59, suffix: " mi"
  const numericMatch = value.match(/(\d+(?:[.,]\d+)?)/);
  const prefix = numericMatch ? value.slice(0, numericMatch.index!) : "";
  const suffix = numericMatch ? value.slice(numericMatch.index! + numericMatch[0].length) : "";
  const rawNumber = numericMatch ? numericMatch[0] : "";
  const decimalSep = rawNumber.includes(",") ? "," : rawNumber.includes(".") ? "." : "";
  const decimals = decimalSep ? rawNumber.split(decimalSep)[1].length : 0;
  const targetNumber = numericMatch ? parseFloat(rawNumber.replace(",", ".")) : null;

  const formatNumber = (n: number) => {
    const fixed = n.toFixed(decimals);
    return decimalSep === "," ? fixed.replace(".", ",") : fixed;
  };

  useEffect(() => {
    if (isInView && targetNumber !== null) {
      const controls = animate(0, targetNumber, {
        duration: 2,
        ease: "easeOut",
        onUpdate(v) {
          setDisplayValue(formatNumber(v));
        },
      });
      return () => controls.stop();
    } else if (targetNumber === null) {
      setDisplayValue(value);
    }
  }, [isInView, targetNumber, value]);

  return (
    <span ref={nodeRef}>
      {targetNumber !== null ? `${prefix}${displayValue}${suffix}` : value}
    </span>
  );
}
