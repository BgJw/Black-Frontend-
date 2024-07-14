import { SERVER_PORT } from "../handleApiRequest";


export const signInUser = async (username: string, password: string) => {
    const res = await fetch(`${SERVER_PORT}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password
        }),
    });

    return res;
};

