import { Check, Trash } from 'phosphor-react';

import styles from './Task.module.css';

interface TaskProps {
    id: number;
    description: string;
    completed: boolean;
    onDeleteTask: (id: number) => void;
    onChangeCheckbox: (id: number, status: boolean) => void;
}

export function Task({ id, description, completed, onDeleteTask, onChangeCheckbox }: TaskProps) {
    function handleDeleteTask() {
        onDeleteTask(id);
    }

    function handleChangeCheckbox() {
        onChangeCheckbox(id, !completed);
    }

    return (
        <div className={styles.task}>
            {completed ?
                <div
                    className={styles.checkedCircle}
                    onClick={handleChangeCheckbox}
                >
                    <Check />
                </div>
                :
                <div
                    className={styles.uncheckedCircle}
                    onClick={handleChangeCheckbox}
                />}
            <p>{description}</p>
            <Trash
                className={styles.trash}
                onClick={handleDeleteTask}
            />
        </div>
    )
}