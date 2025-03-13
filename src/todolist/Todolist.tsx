import {FilterValuesType, TaskType} from "../App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "../Button";
import {CreateItemForm} from "../CreateItemForm";

type PropsType = {
	todoListId: string
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string, todoListId: string) => void
	changeFilter: (filter: FilterValuesType, todoListId: string) => void
	addTask: (todoListId: string, title: string) => void
	changeTaskStatus: (todoListId: string, taskId: string, taskStatus: boolean) => void
	filter: FilterValuesType
	removeListTasks: (todoListId: string) => void
}

export const Todolist = (props: PropsType) => {
	const {title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus, todoListId, removeListTasks} = props

	// const [taskTitle, setTaskTitle] = useState('')
	// const [error, setError] = useState<string | null>(null)
	//
	// const addTaskHandler = (todoListId: string) => {
	// 	if (taskTitle.trim() !== '') {
	// 		addTask(todoListId, taskTitle.trim())
	// 		setTaskTitle('')
	// 	} else {
	// 		setError('Title is required')
	// 	}
	// }
	//
	// const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
	// 	setTaskTitle(event.currentTarget.value)
	// }
	//
	// const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
	// 	setError(null)
	// 	if (event.key === 'Enter') {
	// 		addTaskHandler(todoListId)
	// 	}
	// }

	const changeFilterTasksHandler = (filter: FilterValuesType, todoListId: string) => {
		changeFilter(filter, todoListId)
	}

	const removeListTasksHandler = () => {
		removeListTasks(todoListId)
	}

	const addNewTask = (title: string) => {
		addTask(todoListId, title)
	}

	return (
		<div>
			<div className={'todolist-title-container'}>
				<h3>{title}</h3>
				<Button onClick={removeListTasksHandler} title={'x'}/>
			</div>
			<div>
				{/*<input*/}
				{/*	className={error ? 'error' : ''}*/}
				{/*	value={taskTitle}*/}
				{/*	onChange={changeTaskTitleHandler}*/}
				{/*	onKeyUp={addTaskOnKeyUpHandler}*/}
				{/*/>*/}
				{/*<Button title={'+'} onClick={() => {addTaskHandler(todoListId)}}/>*/}
				{/*{error && <div className={'error-message'}>{error}</div> }*/}
				<CreateItemForm addItem={addNewTask} />
			</div>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {
							const removeTaskHandler = () => {
								removeTask(todoListId, task.id)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(todoListId, task.id, newStatusValue)
							}

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
								<span>{task.title}</span>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : '' } title={'All'} onClick={()=> changeFilterTasksHandler('all', todoListId)}/>
				<Button className={filter === 'active' ? 'active-filter' : '' } title={'Active'} onClick={()=> changeFilterTasksHandler('active', todoListId)}/>
				<Button className={filter === 'completed' ? 'active-filter' : '' } title={'Completed'} onClick={()=> changeFilterTasksHandler('completed', todoListId)}/>
			</div>
		</div>
	)
}
