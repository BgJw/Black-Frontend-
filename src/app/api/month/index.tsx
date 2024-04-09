import { IPersonel } from "../../../slices/types";
import { ApiResponse, SERVER_PORT, handleApiRequest } from "../handleApiRequest";


const apiUrl = `${SERVER_PORT}/months/`;



export const addNewMonth = async (body: Partial<IPersonel>):Promise<ApiResponse> => {
    try {
        return await handleApiRequest(apiUrl, 'POST', body);
    } catch (error) {
        return {success: false, message: String(error) };
    }
};
