import { SearchIcon, XIcon } from '@heroicons/react/outline';
import { motion } from "framer-motion";

export default function SearchBar({ onClose }) {
    return (
        <>
            <motion.div
                className="fixed inset-0 backdrop-blur-sm items-center justify-center z-50 flex"
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
                    className="bg-black/20 backdrop-blur-md border border-white/10 mx-4 rounded-xl py-4 px-6 w-full max-w-2xl relative shadow-2xl"
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
                        <div className="flex items-center gap-2">
                            <div className="p-1 bg-white/10 rounded backdrop-blur-sm">
                                <SearchIcon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-medium text-white">Busca</h2>
                                <p className="text-xs text-white/60">Comandos e ferramentas</p>
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

                    {/* Barra de pesquisa */}
                    <div className="mb-6">
                        <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2">
                            <SearchIcon className="h-4 w-4 text-white/60" />
                            <input
                                type="text"
                                placeholder="Digite um comando ou busque..."
                                className="w-full bg-transparent text-white placeholder-white/50 focus:outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* Opções organizadas */}
                    <div className="space-y-4">
                        {/* Seção Appearance */}
                        <div className="bg-black/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                            <div className="text-xs text-white/60 uppercase font-medium mb-3">
                                Aparência
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between py-1.5 px-2 rounded bg-white/5 hover:bg-white/10 transition-all duration-200">
                                    <span className='text-sm text-white'>Alternar para modo claro</span>
                                    <span className="text-xs text-white/50">Atualmente em modo escuro</span>
                                </div>
                                <div className="flex items-center justify-between py-1.5 px-2 rounded bg-white/5 hover:bg-white/10 transition-all duration-200">
                                    <span className='text-sm text-white'>Alternar para fonte Inter</span>
                                    <span className="text-xs text-white/50">Usando fonte do sistema</span>
                                </div>
                            </div>
                        </div>

                        {/* Seção Tools */}
                        <div className="bg-black/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                            <div className="text-xs text-white/60 uppercase font-medium mb-3">
                                Ferramentas
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between py-1.5 px-2 rounded bg-white/5 hover:bg-white/10 transition-all duration-200">
                                    <span className='text-sm text-white'>Calcular</span>
                                    <span className="text-xs text-white/50">Tente: 2 + 2 ou 34% de 567</span>
                                </div>
                                <div className="flex items-center justify-between py-1.5 px-2 rounded bg-white/5 hover:bg-white/10 transition-all duration-200">
                                    <span className='text-sm text-white'>Verificar horário</span>
                                    <span className="text-xs text-white/50">Tente: horário em Tóquio</span>
                                </div>
                                <div className="flex items-center justify-between py-1.5 px-2 rounded bg-white/5 hover:bg-white/10 transition-all duration-200">
                                    <span className='text-sm text-white'>Clima atual</span>
                                    <span className="text-xs text-white/50">Carregando clima...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer minimalista */}
                    <div className="mt-6 pt-3 border-t border-white/10 text-center">
                        <div className="text-xs text-white/40">
                            Pressione ESC para fechar
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}
