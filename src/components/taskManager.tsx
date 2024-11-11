import React, { useState } from "react";
import { useTask } from "./taskContext";
import { SaveAsIcon } from "@heroicons/react/outline";
import { TrashIcon } from "@heroicons/react/outline";
const TaskManager = () => {
    const { tasks, saveTask, clearTask } = useTask();
    const [title, setTitle] = useState(tasks.title || "");
    const [description, setDescription] = useState(tasks.description || "");
    const [hour, setHour] = useState(tasks.hour || "");
    const [date, setDate] = useState(tasks.date || "");

    const Usedate = new Date();
    const dd = Usedate.getDay()
    const mm = Usedate.getMonth()
    const yyyy = Usedate.getFullYear()

    const hr = Usedate.getUTCHours()
    const mnt = Usedate.getMinutes()
    const handleSaveTask = () => {
        const task = { title, description, hour, date };
        setDate(`${dd}/${mm}/${yyyy}`)
        setHour(`${hr}:${mnt}`)
        saveTask(task);
        // Limpar os campos após salvar
        setTitle("");
        setDescription("");
    };



    return (
        <div className="">
            <h2 className="text-xs w-fit text-neutral-400 mb-2 bg-gray-600 bg-opacity-30 backdrop-blur-sm shadow-sm p-[0.35rem] rounded-lg">Create a simple task </h2>
            <div className="grid text-sm">
                <div className="py-2 gap-2">
                    <input
                        className="bg-transparent focus:outline-0 "
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give a title"
                    />
                    <input
                        className="bg-transparent focus:outline-0"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Give a description"
                    />
                </div>
            </div>

            <div className="task-display flex pt-4 justify-between">
                {/* <h3 className="text-sm">Saved Task:</h3> */}
                {tasks.title ? (
                    <div>
                        <p><strong>Title:</strong> {tasks.title}</p>
                        <p><strong>Description:</strong> {tasks.description}</p>
                        <p><strong>Hour:</strong> {tasks.hour}</p>
                        <p><strong>Date:</strong> {tasks.date}</p>
                    </div>
                ) : (
                    <p className="text-sm">No task saved yet.</p>
                )}
            </div>
            <div className="flex gap-4 pt-2 float-left">
                <button className="" onClick={handleSaveTask}><SaveAsIcon className="w-5 h-5" /></button>
                <button className="" onClick={clearTask}><TrashIcon className="w-5 h-5" /></button>
            </div>
        </div>
    );
};

export default TaskManager;
