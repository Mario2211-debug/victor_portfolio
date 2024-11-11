import { motion } from "framer-motion";

export default function WorkPagePopup({ isOpen, onClose, children }) {
  return isOpen ? (
    <motion.div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-neutral-900 bg-opacity-60 rounded-lg py-4 px-6 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-500"
        >
          &times;
        </button>
        {children}
      </div>
    </motion.div>
  ) : null;
}
