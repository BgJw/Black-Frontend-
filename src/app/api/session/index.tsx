import { SERVER_PORT } from "../handleApiRequest";


interface IfetchActiveSession {
    username: string;
}

export const fetchActiveSession = async () => {
    const token = localStorage.getItem('token'); 
    if (!token) {
        throw new Error('No token found');
    }
    
    const res = await fetch(`${SERVER_PORT}/auth/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch session');
    }

    const data: IfetchActiveSession = await res.json();
    
    return data;
};
