// import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
// import Button from "@mui/material/Button";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from "@mui/material/IconButton"

type TypeCreateItemForm = {
    addItem: (title: string) => void
}
export const CreateItemForm = (props: TypeCreateItemForm) => {
    const {addItem} = props

    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (itemTitle.trim() !== '') {
            addItem(itemTitle.trim())
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            {/*<input*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*    value={itemTitle}*/}
            {/*    onChange={changeItemTitleHandler}*/}
            {/*    onKeyUp={addItemOnKeyUpHandler}*/}
            {/*/>*/}
            <TextField
                error={error ? true : false}
                value={itemTitle}
                variant="outlined"
                label="Enter a title"
                size="small"
                helperText={error}
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            {/*<Button title={'+'} onClick={() => {addItemHandler()}}/>*/}
            {/*<Button variant="contained" onClick={() => {addItemHandler()}}>+</Button>*/}
            <IconButton color="primary" onClick={() => {addItemHandler()}}>
                <AddCircleOutline />
                {/*<AddBoxIcon />*/}
            </IconButton>
            {/*{error && <div className={'error-message'}>{error}</div> }*/}
        </div>
    )
}