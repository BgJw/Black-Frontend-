export interface IWorkTime{
    day: number, 
    time: string,
    _id: string
}
export interface IEmployees {
    name: string,
    position: string,
    hours_worked: number,
    work_time: IWorkTime[],
    _id: string
}
export interface IPersonel {
    month: string,
    year: number,
    department: string,
    employees: IEmployees[],
    _id: string    
}
export enum Status {
    idle = 'idle',
    loading = 'loading',
    error = 'error'
}
export interface ScheduleSlice {
    year: number,
    month: {
        name: string,
        numb: number
    },
    status: Status,
    personel: IPersonel
}
