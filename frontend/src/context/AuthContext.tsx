import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { axiosClient } from '../api/axios';
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'teacher' | 'student';
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
    login: (data: any) => Promise<void>;
    logout: () => Promise<void>;
    getUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    isLoading: true,
    login: async () => { },
    logout: async () => { },
    getUser: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const { data } = await axiosClient.get('/api/user');
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (data: any) => {
        await axiosClient.get('/sanctum/csrf-cookie');
        await axiosClient.post('/login', data);
        await getUser();
    };

    const logout = async () => {
        await axiosClient.post('/logout');
        setUser(null);
        navigate('/login');
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading, login, logout, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
