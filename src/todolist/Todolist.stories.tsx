import type {Meta, StoryObj} from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Todolist} from "./Todolist";
import {TaskType} from "../App";

//const meta: Meta<typeof Todolist> = {
export default {
    title: 'Todolist',
    component: Todolist,

};

//export default meta;

type Story = StoryObj<typeof  Todolist>;

export  const FullStory: Story = {
    args: {
        todoListId: "list1",
        title: 'Configure list',
        tasks: []
    }
}

const onChangeRemoveTask = action('removeTask')
const onChangeChangeFilter = action('changeFilter')
const onChangeAddTask = action('addTask')
const onChangeChangeTaskStatus = action('changeTaskStatus')
const onChangeRemoveListTasks = action('removeListTasks')

export const  EmptyList = () => {

    const tasks: TaskType[] = []

    return <Todolist
        key={'list1'}
        todoListId={'list1'}
        title={'List with out tasks'}
        tasks={tasks}
        removeTask={onChangeRemoveTask}
        changeFilter={onChangeChangeFilter}
        addTask={onChangeAddTask}
        changeTaskStatus={onChangeChangeTaskStatus}
        filter={'all'}
        removeListTasks={onChangeRemoveListTasks}
    />

}


export const  TList = () => {

    const tasks: TaskType[] = [
        {id: 'task1', title: 'HTML&CSS', isDone: true},
        {id: 'task2', title: 'JS', isDone: true},
        {id: 'task3', title: 'ReactJS', isDone: false}
    ]

    return <Todolist
        key={'list1'}
        todoListId={'list1'}
        title={'List tasks'}
        tasks={tasks}
        removeTask={onChangeRemoveTask}
        changeFilter={onChangeChangeFilter}
        addTask={onChangeAddTask}
        changeTaskStatus={onChangeChangeTaskStatus}
        filter={'all'}
        removeListTasks={onChangeRemoveListTasks}
    />

}


