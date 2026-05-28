import { motion } from "framer-motion";

interface RootProps {
  children: React.ReactNode;
  className: string;
}

const ModalRoot: React.FC<RootProps> = ({ children, className }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 20, duration: 0.5 }}
      className={`bg-(--ion-background-containers) ${className} rounded-2xl shadow-[0px_0px_40px_10px_#000] fixed z-30 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col overflow-hidden`}
    >
      {children}
    </motion.section>
  );
};

export default ModalRoot;
