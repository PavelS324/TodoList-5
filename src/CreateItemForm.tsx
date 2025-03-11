import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TypeCreateItemForm = {
    // error: string | null
    // taskTitle: string
    // changeTaskTitleHandler: (event: ChangeEvent<HTMLInputElement>) => void
    // addTaskOnKeyUpHandler: (event: KeyboardEvent<HTMLInputElement>) => void
    // addTaskHandler: (todoListId: string) => void
    todoListId: string
    addTask: (todoListId: string, title: string) => void
}
export const CreateItemForm = (props: TypeCreateItemForm) => {
    // const {error, taskTitle, changeTaskTitleHandler, addTaskOnKeyUpHandler, addTaskHandler, todoListId} = props
    const {todoListId, addTask} = props

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = (todoListId: string) => {
        if (taskTitle.trim() !== '') {
            addTask(todoListId, taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler(todoListId)
        }
    }

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={taskTitle}
                onChange={changeTaskTitleHandler}
                onKeyUp={addTaskOnKeyUpHandler}
            />
            <Button title={'+'} onClick={() => {addTaskHandler(todoListId)}}/>
            {error && <div className={'error-message'}>{error}</div> }
        </div>
    )
}