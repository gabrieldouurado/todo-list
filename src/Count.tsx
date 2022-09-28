import styles from './Count.module.css';

interface CountProps {
    relativeCount?: boolean;
    createdTasks: number;
    completedTasks?: number;
}

export function Count({ relativeCount, createdTasks, completedTasks }: CountProps) {
    return (
        <div className={styles.count}>
            {relativeCount ? `${completedTasks} de ${createdTasks}` : createdTasks}
        </div>
    )
}