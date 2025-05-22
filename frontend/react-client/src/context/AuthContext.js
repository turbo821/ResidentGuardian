import { createContext, useState, useEffect, useContext, useCallback } from "react";
import api from "../api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserProfile = useCallback(async () => {
        try {
            const response = await api.get("/api/user");
            
            return response.data;
        } catch (error) {
            return null;
        }
    }, []);

    const checkAuth = useCallback(async () => {
        setIsLoading(true);
        try {
            const checkResponse = await api.get("/api/auth/check-auth");
            if (checkResponse.data.isAuthenticated) {
                const userData = await fetchUserProfile();
                setUser(userData);
                return true;
            }
            await api.post("/api/auth/refresh-token");
            
            const retryResponse = await api.get("/api/auth/check-auth");
            if (retryResponse.data.isAuthenticated) {
                const userData = await fetchUserProfile();
                setUser(userData);
                return true;
            }
            setUser(null);
            return false;
        } catch {
            setUser(null);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [fetchUserProfile]);

    useEffect(() => {
        checkAuth();
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
            login, 
            register,
            logout,
            checkAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
};