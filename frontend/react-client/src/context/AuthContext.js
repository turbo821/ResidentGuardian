import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: Check in cookies
        const checkAuth = async () => {
            try {
                const user = await fetchUserProfile();
                if(user !== null) {
                    console.log(user);
                   setUser(user); 
                }
                // else {
                //     await refreshToken();
                //     const user = await fetchUserProfile();
                //     setUser(user);
                // }
            } catch (error) {
                console.log(error.response);
                // logout();
            } finally {
                setIsLoading(false);
            }
        };
        if(!user) {
            checkAuth();
            console.log(user);
        }
    }, []);

    const refreshToken = async () => {
        try {
            console.log("refresh token");
            await api.post("/api/auth/refresh-token", {}, { withCredentials: true });
        }
        catch(err) {
            console.log(err.response);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await api.get("/api/auth/profile");
            if(response.status === 401) {
                return null;
            }
            return response.data;
        }
        catch (error) {
            console.log(error.response);
        }
        return null;
    };

    const login = async (email, password) => {
        const user = {
            email: email,
            password: password
        }
        const response = await api.post("/api/auth/login", user, { withCredentials: true });
        console.log(response.data);

        const userData = await fetchUserProfile();
        setUser(userData);
    };

    const register = async (fullName, email, password) => {
        const user  = {
            fullName: fullName,
            email: email,
            password: password
        }
        const response = await api.post("/api/auth/register", user, { withCredentials: true });
        console.log(response.data);
    }

    const logout = async () => {
        try {
            await api.post("/api/auth/logout", {}, { withCredentials: true });
        } 
        catch(err) {
            console.log(err.response);
        }
        finally {
            setUser(null);
        }
    };

    // const authFetch = async (url, options = {}) => {
    //     try {
    //         return await api(url, options);
    //     } catch (error) {
    //         if (error.response?.status === 401) {
    //             await refreshToken();
    //             return await api(url, options); // Повторяем запрос
    //         }
    //         throw error;
    //     }
    // };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isLoading, 
            login, 
            register,
            logout, 
            refreshToken,
            // authFetch 
        }}>
            {children}
        </AuthContext.Provider>
    );
};