import { IPersonel } from "../../../../slices/types";
import { ApiResponse, handleApiRequest } from "../handleApiRequest";


const apiUrl = "http://localhost:5000/months/";



export const addNewMonth = async (body: Partial<IPersonel>):Promise<ApiResponse> => {
    try {
        return await handleApiRequest(apiUrl, 'POST', body);
    } catch (error) {
        return {success: false, message: String(error) };
    }
};
