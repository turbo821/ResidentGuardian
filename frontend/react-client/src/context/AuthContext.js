import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        const userData = JSON.parse(atob(token.split(".")[1]));
        setUser({ id: userData.id, email: userData.email, roles: userData.roles || [] });
        }
        setIsLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        const userData = JSON.parse(atob(token.split(".")[1]));
        console.log(userData);
        setUser({ id: userData.id, email: userData.email, roles: userData.roles || [] });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};