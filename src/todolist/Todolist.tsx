import {FilterValuesType, TaskType} from "../App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
// import {Button} from "../Button";
import {Box, Button, Checkbox, List, ListItem} from "@mui/material";
import {CreateItemForm} from "../CreateItemForm";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import {containerSx, getListItemSx} from "./Todolist.styles";

type PropsType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, taskStatus: boolean) => void
    changeTaskTitle: (todoListId: string, taskId: string, taskTitle: string) => void
    changeTitle: (todoListId: string, taskTitle: string) => void
    filter: FilterValuesType
    removeListTasks: (todoListId: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        changeTaskTitle,
        changeTitle,
        todoListId,
        removeListTasks
    } = props

    const changeFilterTasksHandler = (filter: FilterValuesType, todoListId: string) => {
        changeFilter(filter, todoListId)
    }

    const removeListTasksHandler = () => {
        removeListTasks(todoListId)
    }

    const addNewTask = (title: string) => {
        addTask(todoListId, title)
    }

    const changeTitleHandler = (newTitle: string) => {
        changeTitle(todoListId, newTitle)
    }

    return (
        <div>
            <div className={'todolist-title-container'}>
                <EditableSpan title={title} changeTaskTitle={changeTitleHandler}/>
                {/*<Button onClick={removeListTasksHandler} title={'x'}/>*/}
                <IconButton onClick={removeListTasksHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <div>
                <CreateItemForm addItem={addNewTask}/>
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    // : <ul>
                    : <List dense disablePadding>
                        {tasks.map((task) => {
                            const removeTaskHandler = () => {
                                removeTask(todoListId, task.id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(todoListId, task.id, newStatusValue)
                            }

                            const changeTaskTitleHandler = (newTitle: string) => {
                                changeTaskTitle(todoListId, task.id, newTitle)
                            }

                            // return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            // return <ListItem key={task.id} className={task.isDone ? 'is-done' : ''} sx={{p: "0"}}>
                            // return <ListItem key={task.id} sx={{p: "0", justifyContent: "space-between", opacity: task.isDone ? '0.5' : '1'}}>
                            return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <div>
                                    {/*<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>*/}
                                    <Checkbox checked={task.isDone} size="small" onChange={changeTaskStatusHandler}/>
                                    <EditableSpan title={task.title} changeTaskTitle={changeTaskTitleHandler}/>
                                </div>
                                {/*<Button onClick={removeTaskHandler} title={'x'}/>*/}
                                {/*<IconButton aria-label="delete" onClick={removeTaskHandler}>*/}
                                <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                                {/*</li>*/}
                            </ListItem>
                        })}
                        {/*</ul>*/}
                    </List>
            }
            <Box sx={containerSx}>
                {/*<Button className={filter === 'all' ? 'active-filter' : '' } title={'All'} onClick={()=> changeFilterTasksHandler('all', todoListId)}/>*/}
                {/*<Button className={filter === 'active' ? 'active-filter' : '' } title={'Active'} onClick={()=> changeFilterTasksHandler('active', todoListId)}/>*/}
                {/*<Button className={filter === 'completed' ? 'active-filter' : '' } title={'Completed'} onClick={()=> changeFilterTasksHandler('completed', todoListId)}/>*/}
                <Button variant={filter === 'all' ? 'outlined' : 'text'} color="inherit"
                        onClick={() => changeFilterTasksHandler('all', todoListId)}>All</Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'} color="primary"
                        onClick={() => changeFilterTasksHandler('active', todoListId)}>Active</Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'} color="secondary"
                        onClick={() => changeFilterTasksHandler('completed', todoListId)}>Completed</Button>
            </Box>
        </div>
    )
}
