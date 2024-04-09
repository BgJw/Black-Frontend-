export interface ApiResponse {
    success: boolean,
     message: string
};


export const SERVER_PORT = "https://black-backend-production.up.railway.app";

const handleResponse = async (response: Response): Promise<ApiResponse> => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Server error');
    }
    return response.json()
  };

  const handleError = (error: Error): Promise<ApiResponse> => {
    console.error('Request error:', error.message);
    throw error;
  };


export const handleApiRequest = async (url: string, method: string, body: any): Promise<ApiResponse> => {
    
    try {
        const response = await fetch( url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        return handleResponse(response);
    } catch (error) {
        return handleError((error) as Error);
    }
    
    };
    