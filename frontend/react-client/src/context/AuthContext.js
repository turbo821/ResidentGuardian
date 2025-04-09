import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import api from "../api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const checkAuthState = useCallback(async () => {
        try {
            const response = await api.get("/api/auth/check-auth");
            return response.data.isAuthenticated;
        } catch {
            return false;
        }
    }, []);

    const fetchUserProfile = useCallback(async () => {
        try {
            const response = await api.get("/api/auth/profile");
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                return null;
            }
            throw error;
        }
    }, []);

    const refreshToken = useCallback(async () => {
        if (isRefreshing) return false;
        
        setIsRefreshing(true);
        try {
            await api.post("/api/auth/refresh-token", {});
            return true;
        } catch (error) {
            console.error("Refresh failed:", error.response);
            return false;
        } finally {
            setIsRefreshing(false);
        }
    }, [isRefreshing]);

    const checkAuth = useCallback(async () => {
        setIsLoading(true);
        try {
            let isAuthenticated = false;
    
            isAuthenticated = await checkAuthState();
    
            if (!isAuthenticated) {
                const refreshed = await refreshToken();
    
                if (refreshed) {
                    isAuthenticated = await checkAuthState();
                }
            }
    
            if (isAuthenticated) {
                const userData = await fetchUserProfile();
                setUser(userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check error:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, [checkAuthState, fetchUserProfile, refreshToken]);

    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async () => {
            if (isMounted) {
                await checkAuth();
            }
        };

        initializeAuth();

        return () => {
            isMounted = false;
        };
    }, [checkAuth]);

    const login = useCallback(async (email, password) => {
        setIsLoading(true);
        try {
            await api.post("/api/auth/login", { email, password });
            await checkAuth();
        } catch (error) {
            console.error("Login error:", error.response);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [checkAuth]);

    const register = useCallback(async (fullName, email, password) => {
        setIsLoading(true);
        try {
            await api.post("/api/auth/register", { fullName, email, password });
            await checkAuth();
        } catch (error) {
            console.error("Register error:", error.response);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [checkAuth]);

    const logout = useCallback(async () => {
        try {
            await api.post("/api/auth/logout", {});
        } catch (error) {
            console.error("Logout error:", error.response);
        } finally {
            setUser(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user, 
            isLoading,
            isRefreshing,
            login, 
            register,
            logout,
            checkAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
};