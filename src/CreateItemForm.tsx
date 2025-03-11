import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent} from "react";

type TypeCreateItemForm = {
    error: string | null
    taskTitle: string
    changeTaskTitleHandler: (event: ChangeEvent<HTMLInputElement>) => void
    addTaskOnKeyUpHandler: (event: KeyboardEvent<HTMLInputElement>) => void
    addTaskHandler: (todoListId: string) => void
    todoListId: string

}
export const CreateItemForm = (props: TypeCreateItemForm) => {
    const {error, taskTitle, changeTaskTitleHandler, addTaskOnKeyUpHandler, addTaskHandler, todoListId} = props

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