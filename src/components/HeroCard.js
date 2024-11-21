import React from "react";
import { motion } from "framer-motion";

export const HeroCard = ({ hero, index, animate }) => {
  if (!hero) return null;

  return (
    <motion.div
      className="relative w-full h-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={hero.img}
        alt={hero.name}
        className="w-full h-full object-cover"
        draggable={false}
      />
      {animate && (
        <motion.div
          className="absolute inset-0 border-4 border-yellow-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};
