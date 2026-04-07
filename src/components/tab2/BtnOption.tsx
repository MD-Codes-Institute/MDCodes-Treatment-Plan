import { PropsPlanModal } from "../../contents/tabs/ContentsTab2";
import { motion } from "framer-motion";
interface PropsBtnOption extends PropsPlanModal {
  handleCancelOption: () => void;
  id: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: { opacity: 0, x: 100, transition: { duration: 0.3} },
};

const itemVariants = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const BtnOption: React.FC<PropsBtnOption> = ({ handleCancelOption, patients, id }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-row gap-5 items-center justify-center"
    >
      <motion.button
        variants={itemVariants}
        onClick={(e: any) => {
          e.stopPropagation(), handleCancelOption();
        }}
        className="text-white"
      >
        Cancel
      </motion.button>
      <motion.button variants={itemVariants} className="text-red-600 font-extrabold">
        Delete
      </motion.button>
    </motion.div>
  );
};

export default BtnOption;
