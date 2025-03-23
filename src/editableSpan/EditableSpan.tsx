import {ChangeEvent, useState} from "react";


type EditableSpanType = {
    title: string
    changeTaskTitle: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
    const {title, changeTaskTitle} = props

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState(title)

    const onDoubleClickHandler = () => {
        setIsEditMode(true)
    }

    const onBlurHandler = () => {
        setIsEditMode(false)
        changeTaskTitle(inputValue)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    return (
        <>
            {isEditMode ?
                <input value={inputValue} autoFocus onBlur={onBlurHandler} onChange={onChangeHandler} /> :
                <span onDoubleClick={onDoubleClickHandler} >{title}</span>
            }
        </>
    )
}

