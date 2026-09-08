export interface Task{
    id: number,
    title: string,
    status: 'todo' | 'in-progress' | 'done',
    created_at: string,
}

export interface CreateTask{
    title: string,
    status: 'todo' | 'in-progress' | 'done',
}

export interface UpdateTask{
    status: 'todo' | 'in-progress' | 'done',
}

export interface DeleteTask{
    id: number,
}