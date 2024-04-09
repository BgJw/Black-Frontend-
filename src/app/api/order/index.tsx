import { ApiResponse, SERVER_PORT, handleApiRequest } from "../handleApiRequest";



const apiUrl = `${SERVER_PORT}/orders/`;

export interface ISelectedItem {
    id: number;
      price: string;
    name: string;
      numb: string;
  };
  

export enum PaidMethod {
    Cash = "Gotówka",
    Card = "Karta",
    DoPay = 'Do zapłaty'
  }

export interface IList {
    dateReceived: string;
    whatReceived: ISelectedItem[];
    customerNumber: string;
    receivedBy: string;
    amountToPay: string;
    paid: boolean;
    cardOrCash: PaidMethod;
    weight: string;
    whoMadeIt: string;
    hour: string;
    forWhen: string;
  }
export interface ICreateOrder {
    day: number;
    month: number;
    year: number;
    department: string;
    orders: IList[];
}

export const addNewOrder = async (body: ICreateOrder):Promise<ApiResponse> => {    
    try {
        return await handleApiRequest(apiUrl, 'POST', body);
    } catch (error) {
        return {success: false, message: String(error) };
    }
};
