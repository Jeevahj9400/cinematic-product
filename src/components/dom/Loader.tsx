"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const { progress, active, item } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    // When loading is complete and no more items are loading
    if (!active && progress === 100) {
      const t = setTimeout(() => setShow(false), 1200);
      return () => clearTimeout(t);
    }
  }, [active, progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white"
        >
          <div className="relative w-full max-w-sm flex flex-col items-center px-6">
            <motion.div 
              className="mb-12 overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 font-light">
                Initializing
              </h2>
            </motion.div>

            {/* Premium Loader Bar */}
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
              
              {/* Animated glow on the leading edge */}
              <motion.div 
                className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/80 blur-sm"
                initial={{ left: "-32px" }}
                animate={{ left: `calc(${progress}% - 32px)` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>

            <div className="w-full flex justify-between items-center mt-6 text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">
              <span className="truncate max-w-[200px] opacity-50">
                {item ? item.split('/').pop() : 'Engine'}
              </span>
              <span className="tabular-nums opacity-80">{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
