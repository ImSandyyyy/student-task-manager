import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'student' | 'admin' | null;

interface User {
    id: string;
    username: string;
    role: UserRole;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (username: string, password: string, role: UserRole) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [isLoading, setIsLoading] = useState(false);

    const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
        setIsLoading(true);

        if (username && password && role) {
            const newUser: User = {
                id: Date.now().toString(),
                username,
                role
            };

            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            setIsLoading(false);
            return true;
        }

        setIsLoading(false);
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};