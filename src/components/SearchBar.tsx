import { SearchIcon, XIcon } from '@heroicons/react/outline';
import { motion } from "framer-motion";

export default function SearchBar({ onClose }) {
    return (
        <>
            <motion.div
                className="fixed inset-0 backdrop-blur-md items-center justify-center z-50 flex"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                    opacity: onClose ? 1 : 0,
                    scale: onClose ? 1 : 0.95,
                    pointerEvents: onClose ? 'auto' : 'none'
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="p-8 rounded-2xl w-full max-w-lg border border-slate-900 bg-black">
                    <div className="flex items-center space-x-3 ">
                        {/* Barra de pesquisa */}
                        <SearchIcon className="h-5 w-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Type a command or search..."
                            className="w-full bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none"
                        />
                        {/* Botão de fechar */}
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-300"
                        >
                            <XIcon className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Opções abaixo da barra de pesquisa */}
                    <div className="mt-8 text-sm text-gray-400">
                        <div className="uppercase font-semibold text-xs text-gray-500 mb-2">
                            Appearance
                        </div>
                        <div className="grid items-center justify-between py-1">
                            <span className='font-semibold text-white'>Switch to light mode</span>
                            <span className="text-gray-500">Currently in dark mode</span>
                        </div>
                        <div className="grid items-center justify-between py-1">
                            <span className='font-semibold text-white'>Switch to Inter font</span>
                            <span className="text-gray-500">Currently using System font</span>
                        </div>
                        <div className="uppercase font-semibold text-xs text-gray-500 mt-4 mb-2">
                            Tools
                        </div>
                        <div className="grid items-center justify-between py-1">
                            <span className='font-semibold text-white'>Calculate</span>
                            <span className="text-gray-500">Try: 2 + 2 or 34% of 567</span>
                        </div>
                        <div className="grid items-center justify-between py-1">
                            <span className='font-semibold text-white'>Check time anywhere</span>
                            <span className="text-gray-500">Try: time in Tokyo</span>
                        </div>
                        <div className="grid items-center justify-between py-1">
                            <span className='font-semibold text-white'>Current weather</span>
                            <span className="text-gray-500">Loading weather...</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
