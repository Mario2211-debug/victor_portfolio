import { motion, AnimatePresence } from "framer-motion";
import { XIcon, CogIcon, SparklesIcon } from "@heroicons/react/outline";

export default function WorkPagePopup({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Overlay com animação */}
          <motion.div
            className="absolute inset-0 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal principal */}
          <motion.div
            className="bg-black/20 backdrop-blur-md border border-white/10 mx-4 rounded-xl py-4 px-6 w-full max-w-6xl h-[90vh] relative shadow-2xl overflow-hidden"
            initial={{ 
              opacity: 0, 
              scale: 0.95, 
              y: 20 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.95, 
              y: 20 
            }}
            transition={{ 
              duration: 0.4, 
              ease: "easeOut",
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            {/* Header do modal */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                  <CogIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Ferramentas</h2>
                  <p className="text-xs text-white/60">Utilitários e ferramentas úteis</p>
                </div>
              </div>
              
              <motion.button
                onClick={onClose}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <XIcon className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Conteúdo principal */}
            <motion.div
              className="h-[calc(100%-120px)] overflow-y-auto space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {children}
            </motion.div>

            {/* Footer minimalista */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 pt-3 border-t border-white/10 bg-black/10 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <div className="flex items-center justify-center text-xs text-white/40 px-6 py-2">
                <span>Pressione ESC para fechar</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
