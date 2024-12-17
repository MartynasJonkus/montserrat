import axios from "axios";

const API_BASE_URL = "http://localhost:5282"; // Your backend API URL

interface LoginResponse {
    token: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
    });
    return response.data;
};