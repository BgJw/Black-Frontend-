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

export const getOrderByDay = async (day: number, month: number, year: number, department: string): Promise<IList[]> => {
  try {
      const response = await fetch(`${apiUrl}${day}/${month+1}/${year}/${department}`);
      
      if (response.ok) {
          const data = await response.json();
          
          return await data;
      } else {
          console.error('Error fetching data:', response.statusText);
          throw new Error(response.statusText);
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      return [];
  }
};

export const fetchClientNumber = async () => {
    try {
      const response = await fetch(`${SERVER_PORT}/dataHub/customerNumber`);
      if (!response.ok) {
        throw new Error('Failed to fetch customer number');
      }
      const data = await response.json();
      return data.customerNumber;
    } catch (error) {
      console.error('Error fetching customer number:', error);
    }
}

export const incrementClientNumber = async () => {
    try {
        return await handleApiRequest(`${SERVER_PORT}/dataHub/customerNumber`, 'POST', {} );
    } catch (error) {
        return {success: false, message: String(error) };
    }

}

