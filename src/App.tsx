import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { PlusCircle, ClipboardText } from 'phosphor-react';

import { Header } from './Header';
import { Count } from './Count';
import { Task } from './Task';

import styles from './App.module.css';
import './global.css';

const tasks_mock = [
    {
        id: 101,
        description: "Entrar no Google e buscar por Rocketseat",
        completed: true
    },
    {
        id: 102,
        description: "Assistir os videos de boas vindas e se inscrever no bootcamp que mais se enquadra na sua realidade",
        completed: true
    },
    {
        id: 103,
        description: "Terminar todos os desafios do bootcamp",
        completed: false
    },
    {
        id: 104,
        description: "Entrar na comunidade, fazer amigos e networks",
        completed: false
    },
    {
        id: 105,
        description: "Dar um upgrade na sua carreira! Foquete não tem ré",
        completed: false
    }
]

interface TaskType {
    id: number;
    description: string;
    completed: boolean;
}

function countCompletedTasks(tasks: TaskType[]) {
    return tasks.reduce((sum, task) => {
        if (task.completed) {
            return sum += 1;
        }

        return sum;
    }, 0);
}

export function App() {
    const [tasks, setTasks] = useState(tasks_mock);

    const [createdTasks, setCreatedTasks] = useState(tasks.length);
    const [completedTasks, setCompletedTasks] = useState(countCompletedTasks(tasks));

    const [newTask, setNewTask] = useState('');

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();

        const newId = tasks.reduce((highestId, task) => {
            if (task.id > highestId) {
                highestId = task.id;
            }

            return highestId + 1;
        }, 0);

        const tasksWithNewTask = [...tasks, {
            id: newId,
            description: newTask,
            completed: false
        }]

        setTasks(tasksWithNewTask);
        setCreatedTasks(tasksWithNewTask.length);
        setNewTask('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('');
        setNewTask(event.target.value);
    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório');
    }

    function deleteTask(taskToDeleteId: number) {
        const tasksWithoutDeletedOne = tasks.filter((task) => {
            return task.id !== taskToDeleteId;
        });

        setCreatedTasks(tasksWithoutDeletedOne.length);
        setCompletedTasks(countCompletedTasks(tasksWithoutDeletedOne));

        setTasks(tasksWithoutDeletedOne);
    }

    function changeCheckbox(taskIdToBeChanged: number, status: boolean) {
        const tasksWithCheckedUpdate = tasks.map((task) => {
            if (task.id === taskIdToBeChanged) {
                task.completed = status;
                return task;
            } else {
                return task;
            }
        });

        setCompletedTasks(countCompletedTasks(tasksWithCheckedUpdate));
        setTasks(tasksWithCheckedUpdate);
    }

    return (
        <div className={styles.app}>
            <Header />

            <div className={styles.wrapper}>
                <form
                    className={styles.addNewTask}
                    onSubmit={handleCreateNewTask}
                >
                    <input
                        type='text'
                        placeholder='Adicione um nova tarefa'
                        value={newTask}
                        onChange={handleNewTaskChange}
                        onInvalid={handleNewTaskInvalid}
                        required
                    />

                    <button type='submit'>
                        Criar {<PlusCircle className={styles.PlusCircle} />}
                    </button>
                </form>
                <div className={styles.tasksInfos}>
                    <span className={styles.createdTasks}>
                        Tarefas criadas
                        <Count
                            createdTasks={createdTasks}
                        />
                    </span>
                    <span className={styles.finishedTasks}>
                        Concluídas
                        <Count
                            relativeCount
                            createdTasks={createdTasks}
                            completedTasks={completedTasks}
                        />
                    </span>
                </div>
                {createdTasks ?
                    tasks.map((task) => {
                        return <Task
                            key={task.id}
                            id={task.id}
                            description={task.description}
                            completed={task.completed}
                            onDeleteTask={deleteTask}
                            onChangeCheckbox={changeCheckbox}
                        />
                    })
                    :
                    <div className={styles.taskListEmpty}>
                        <ClipboardText size={56} color="var(--gray-300)" />
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        <span>Crie tarefas e organize seus itens a fazer</span>
                    </div>
                }
            </div>
        </div>
    )
}