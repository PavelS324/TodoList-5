import './App.css';
import {Todolist} from "./todolist/Todolist";
import {FC, useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm";
import {
    AppBar,
    Button,
    Container, CssBaseline,
    Grid,
    IconButton,
    Paper, Switch,
    Toolbar,
    Typography
} from "@mui/material";
import {
    createTheme,
    ThemeProvider
} from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu"
import {containerSx} from "./todolist/Todolist.styles";
import {NavButton} from "./navButton/NavButton.styles";

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

type ThemeMode = 'dark' | 'light'
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
        const tlFiltered = tl.filter(t => {
            return t.id !== taskId
        })

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
    const changeTaskTitle = (todoListId: string, taskId: string, taskTitle: string) => {
        let tl = [...tasks[todoListId]]
        const tlChanged = tl.map(t => t.id === taskId ? {...t, title: taskTitle} : t)
        let newState = {...tasks}
        newState[todoListId] = tlChanged

        setTasks(newState)
    }

    const changeTitle = (todoListId: string, taskTitle: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListId ? {...t, title: taskTitle} : t))
    }

    const removeListTasks = (todoListId: string) => {
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(newTodoLists)

        let newTasks = {...tasks}
        delete newTasks[todoListId]
        setTasks(newTasks)
    }

    const addList = (title: string) => {

        let todoListIdX = v1()

        const newList: TodoListType = {
            id: todoListIdX,
            title: title,
            filter: 'all'
        }
        setTodoLists([newList, ...todoLists])

        let newTasks: TasksStateType = {...tasks, [todoListIdX]: []}

        setTasks(newTasks)
    }

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            }
        }
    })

    const  changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" sx={{marginBottom: "15px"}}>
                <Toolbar>
                    <Container maxWidth="lg" sx={containerSx}>
                        <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        {/*<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>*/}
                        {/*	News*/}
                        {/*</Typography>*/}
                        <div>
                            {/*<Button color="inherit">Sign in</Button>*/}
                            {/*<Button color="inherit">Sign up</Button>*/}
                            {/*<Button color="inherit">Faq</Button>*/}
                            <NavButton>Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                            <Switch color={'default'} onChange={changeMode} />
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Grid container sx={{margin: "15px 0 20px"}}>
                    <CreateItemForm addItem={addList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoLists.map(tl => {
                        let tasksForTodolist = tasks[tl.id]
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
                        }

                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
                        }

                        return (<Grid key={tl.id}>
                            <Paper elevation={3} sx={{padding: "15px"}}>
                                <Todolist
                                    // key={tl.id}
                                    todoListId={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTitle={changeTitle}
                                    filter={tl.filter}
                                    removeListTasks={removeListTasks}
                                />
                            </Paper>
                        </Grid>)

                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App;
