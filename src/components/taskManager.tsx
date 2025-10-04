import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTask } from "./taskContext";
import { 
  SaveIcon as SaveAsIcon, 
  TrashIcon, 
  CheckIcon, 
  ClockIcon,
  CalendarIcon,
  PlusIcon,
  XIcon
} from "@heroicons/react/outline";

const TaskManager = () => {
    const { tasks, saveTask, clearTask } = useTask();
    const [title, setTitle] = useState(tasks.title || "");
    const [description, setDescription] = useState(tasks.description || "");
    const [hour, setHour] = useState(tasks.hour || "");
    const [date, setDate] = useState(tasks.date || "");
    const [isCompleted, setIsCompleted] = useState(false);
    const [showForm, setShowForm] = useState(!tasks.title);

    const currentDate = new Date();
    const dd = currentDate.getDate();
    const mm = currentDate.getMonth() + 1;
    const yyyy = currentDate.getFullYear();
    const hr = currentDate.getHours();
    const mnt = currentDate.getMinutes().toString().padStart(2, '0');

    const handleSaveTask = () => {
        const task = { 
            title, 
            description, 
            hour: `${hr}:${mnt}`, 
            date: `${dd}/${mm}/${yyyy}`,
            completed: false,
            createdAt: new Date().toISOString()
        };
        saveTask(task);
        setTitle("");
        setDescription("");
        setShowForm(false);
    };

    const handleCompleteTask = () => {
        setIsCompleted(true);
        setTimeout(() => {
            clearTask();
            setIsCompleted(false);
            setShowForm(true);
        }, 2000);
    };

    const handleEditTask = () => {
        setTitle(tasks.title || "");
        setDescription(tasks.description || "");
        setShowForm(true);
    };

    return (
        <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
                <div className="p-1 bg-white/10 rounded backdrop-blur-sm">
                    <CheckIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h2 className="text-base font-medium text-white">Tarefas</h2>
                    <p className="text-xs text-white/60">Organize suas atividades</p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {showForm ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        <div className="space-y-3">
                            <input
                                className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-200 text-sm"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Título da tarefa"
                            />
                            <textarea
                                className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-200 resize-none text-sm"
                                rows={2}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Descrição da tarefa"
                            />
                        </div>

                        <div className="flex gap-2">
                            <motion.button
                                onClick={handleSaveTask}
                                disabled={!title.trim()}
                                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-lg transition-all duration-200 backdrop-blur-sm text-sm"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <SaveAsIcon className="w-3 h-3" />
                                Salvar
                            </motion.button>
                            
                            <motion.button
                                onClick={() => setShowForm(false)}
                                className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-lg transition-all duration-200 backdrop-blur-sm text-sm"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <XIcon className="w-3 h-3" />
                                Cancelar
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="task-display"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        {tasks.title ? (
                            <motion.div
                                className={`bg-black/20 backdrop-blur-sm rounded-lg p-3 border-l-2 ${
                                    isCompleted ? 'border-white bg-white/5' : 'border-white/30'
                                }`}
                                animate={isCompleted ? { scale: 1.02 } : { scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-white">{tasks.title}</h3>
                                    {isCompleted && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-green-400"
                                        >
                                            <CheckIcon className="w-6 h-6" />
                                        </motion.div>
                                    )}
                                </div>
                                
                                <p className="text-gray-300 mb-4">{tasks.description}</p>
                                
                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                    <div className="flex items-center gap-1">
                                        <ClockIcon className="w-4 h-4" />
                                        <span>{tasks.hour}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>{tasks.date}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <motion.button
                                        onClick={handleCompleteTask}
                                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <CheckIcon className="w-4 h-4" />
                                        Concluir
                                    </motion.button>
                                    
                                    <motion.button
                                        onClick={handleEditTask}
                                        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Editar
                                    </motion.button>
                                    
                                    <motion.button
                                        onClick={clearTask}
                                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                        Excluir
                                    </motion.button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-gray-400 mb-4">
                                    <CheckIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p>Nenhuma tarefa criada ainda</p>
                                </div>
                                <motion.button
                                    onClick={() => setShowForm(true)}
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 mx-auto"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    Criar Nova Tarefa
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TaskManager;
