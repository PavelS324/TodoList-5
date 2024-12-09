import './App.css';
import {Todolist} from "./todolist/Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}


export type TasksStateType = {
	[key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}

function App() {

	let todoListId1 = v1()
	let todoListId2 = v1()

	const [todoLists, setTodoLists] = useState<TodoListType[]>([
		{id: todoListId1, title: 'What to learn', filter: 'all'},
		{id: todoListId2, title: 'What to buy', filter: 'all'}
	])

	const [tasks, setTasks] = useState<TasksStateType>({
		[todoListId1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todoListId2]: [
			{id: v1(), title: 'Rest API', isDone: true},
			{id: v1(), title: 'GraphQL', isDone: false},
		]
	})

	const removeTask = (todoListId: string, taskId: string) => {
		debugger
		let tl = [...tasks[todoListId]]
		const  tlFiltered = tl.filter(t => {return t.id !== taskId})

		let filteredTasks = {...tasks}
		filteredTasks[todoListId] = tlFiltered

		setTasks(filteredTasks)
	}

	const addTask = (todoListId: string, title: string) => {
		debugger
		const newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		let tl = [newTask, ...tasks[todoListId]]
		let newTasks = {...tasks}
		newTasks[todoListId] = tl

		setTasks(newTasks)
	}

	const changeFilter = (filter: FilterValuesType, todoListId: string) => {
		const newTL = todoLists.map(tl => {
			return tl.id === todoListId ? {...tl, filter} : tl
		})
		setTodoLists(newTL)
	}

	const changeTaskStatus = (todoListId: string, taskId: string, taskStatus: boolean) => {
		let tl = [...tasks[todoListId]]
		const tlChanged = tl.map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
		let newState = {...tasks}
		newState[todoListId] = tlChanged

		setTasks(newState)
	}

	const removeListTasks = (todoListId: string) => {
		let newTodoLists = todoLists.filter(tl => tl.id !== todoListId)
		setTodoLists(newTodoLists)

		let newTasks = {...tasks}
		delete newTasks[todoListId]
		setTasks(newTasks)
	}

	return (
		<div className="App">
			{todoLists.map(tl => {
				let tasksForTodolist = tasks[tl.id]
				if (tl.filter === 'active') {
					tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
				}

				if (tl.filter === 'completed') {
					tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
				}

				return (<Todolist
					key={tl.id}
					todoListId={tl.id}
					title={tl.title}
					tasks={tasksForTodolist}
					removeTask={removeTask}
					changeFilter={changeFilter}
					addTask={addTask}
					changeTaskStatus={changeTaskStatus}
					filter={tl.filter}
					removeListTasks={removeListTasks}
				/>)

			})}
		</div>
	);
}

export default App;
