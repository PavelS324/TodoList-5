

type EditableSpanType = {
    title: string
}

export const EditableSpan = (props: EditableSpanType) => {
    const {title} = props

    const onClickHandler = () => {
        console.log("Click")
        // console.log(e.detail)
        // if (e.detail === 2) {
        //
        // }
    }

    return (
        <>
            <span onClick={onClickHandler} >{title}</span>
        </>
    )
}

