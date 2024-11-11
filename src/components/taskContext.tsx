'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Task {
    title?: string;
    description?: string;
    hour?: string;
    date?: string;
}

interface taskContext {
    tasks: Task;
    setTask: React.Dispatch<React.SetStateAction<Task>>
    saveTask: (dados: Task) => void;
    clearTask: () => void;
    getTask: () => Task;
}

const TaskContext = createContext<taskContext | undefined>(undefined);

//Função para limpar as tarefas
const clearTask = (setTask: React.Dispatch<React.SetStateAction<Task>>) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('task')
    }
    setTask(() => ({
        title: null,
        description: null,
        hour: null,
        date: null
    }))
}

//Função para obter as tarefas no localstorage
const getTask = (): Task => {
    if (typeof window !== "undefined") {
        const saveData = localStorage.getItem('task');
        if (saveData && saveData !== "undefined") {
            try {
                return JSON.parse(saveData) as Task;
            } catch (error) {
                console.error("error parsing localStorage data: ", error)
            }
        }
    }

    return {
        title: null,
        description: null,
        hour: null,
        date: null
    }
}

//Provedor do contexto

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTask] = useState<Task>(() => getTask());

    const saveTask = (dados: Task) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('task', JSON.stringify(dados))
        }
        setTask(dados)
    }

    return (
        <TaskContext.Provider value={{ tasks, setTask, saveTask, getTask, clearTask: () => clearTask(setTask) }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTask must bu used within an taskProvider")
    }
    return context;
}


export default taskContext;