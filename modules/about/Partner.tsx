import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface Partner {
  id: number;
  name: string;
  photo: string;
}

interface PartnersProps {
  partners: Partner[];
}

const PartnerSection: React.FC<PartnersProps> = ({ partners }) => {
  return (
    <div className="grid grid-cols-1 items-center  sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 mt-10 w-full">
      {partners.map((partner) => (
        <motion.div
          key={partner.id}
          className="flex flex-col items-center p-4 rounded-xl"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }} // Slightly reduced scale for cleaner UI
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          {/* Container for image to maintain aspect ratio and scale responsively */}
          <div className="relative w-40 h-40 md:w-44 md:h-44 lg:w-52 lg:h-52 mb-4">
            <Image
              src={partner.photo}
              alt={partner.name}
              fill // Use fill for better responsive control within a parent div
              className="object-cover rounded-full"
            />
          </div>
          
          <h3 className="text-base md:text-lg font-bold text-gray-900 text-center">
            {partner.name}
          </h3>
        </motion.div>
      ))}
    </div>
  );
};

export default PartnerSection;