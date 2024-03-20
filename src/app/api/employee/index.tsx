import { IEmployees } from "../../../../slices/types";
import { handleApiRequest } from "../handleApiRequest";

const apiUrl = "http://localhost:5000/employees/";


export const changeTime = async (monthId: string, employeeId: string, workTimeId: string, newTime: {time: string}) => {
    const url = `${apiUrl}${monthId}/${employeeId}/${workTimeId}`;
    return await handleApiRequest(url, 'POST', newTime);
};

export const addWorkDay = async (monthId: string, employeeId: string, emptyDay: number, time: string) => {
    const url = `${apiUrl}${monthId}/${employeeId}`;
    const newWorkDay = {
        day: emptyDay,
        time: time,
    };
    
    return await handleApiRequest(url, 'POST', newWorkDay);

};
export const changeMonthWorkTime = async (monthId: string, employee: IEmployees[]) => {
    const url = `${apiUrl}${monthId}`;
    
    return await handleApiRequest(url, 'PATCH', employee);

};

export const addNewEmployee = async (monthId: string, newEmployee: Partial<IEmployees>) => {
    const url = `${apiUrl}${monthId}`;
    return await handleApiRequest(url, 'POST', newEmployee);
}

export const removeEmployee = async(monthId: string, employeeId: string) => {
    const url = `${apiUrl}${monthId}/${employeeId}`;
    return await handleApiRequest(url, 'DELETE', undefined);
}