import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}

function App() {

	const [todoLists, setTodoLists] = useState<TodoListType[]>([
		{id: v1(), title: 'What to learn', filter: 'all'},
		{id: v1(), title: 'What to buy', filter: 'all'}
	])

	const [tasks, setTasks] = useState<TaskType[]>([
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
	])

	// const [filter, setFilter] = useState<FilterValuesType>('all')

	const removeTask = (taskId: string) => {
		const filteredTasks = tasks.filter((task) => {
			return task.id !== taskId
		})
		setTasks(filteredTasks)
	}

	const addTask = (title: string) => {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		const newTasks = [newTask, ...tasks]
		setTasks(newTasks)
	}

	const changeFilter = (filter: FilterValuesType, todoListId: string) => {
		const newTL = todoLists.map(tl => {
			return tl.id === todoListId ? {...tl, filter} : tl
		})
		setTodoLists(newTL)
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
		const newState = tasks.map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
		setTasks(newState)
	}

	return (
		<div className="App">
			{todoLists.map(tl => {
				let tasksForTodolist = tasks
				if (tl.filter === 'active') {
					tasksForTodolist = tasks.filter(task => !task.isDone)
				}

				if (tl.filter === 'completed') {
					tasksForTodolist = tasks.filter(task => task.isDone)
				}

				return (<Todolist
					key={tl.id}
					todoListid={tl.id}
					title={tl.title}
					tasks={tasksForTodolist}
					removeTask={removeTask}
					changeFilter={changeFilter}
					addTask={addTask}
					changeTaskStatus={changeTaskStatus}
					filter={tl.filter}
				/>)

			})}
			{/*<Todolist*/}
			{/*	title="What to learn"*/}
			{/*	tasks={tasksForTodolist}*/}
			{/*	removeTask={removeTask}*/}
			{/*	changeFilter={changeFilter}*/}
			{/*	addTask={addTask}*/}
			{/*	changeTaskStatus={changeTaskStatus}*/}
			{/*	filter={filter}*/}
			{/*/>*/}
		</div>
	);
}

export default App;
