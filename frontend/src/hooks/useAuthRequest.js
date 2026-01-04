import React, {useEffect} from 'react'
import {useAuth} from "@clerk/clerk-react";
import api from "../lib/axios.js";
import axios from "axios";

function useAuthRequest() {

    const {isSignedIn, getToken, isLoaded} = useAuth();

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(async (config) => {
            if(isSignedIn) {
                try {
                    const token = await getToken();
                    if(token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }

                }catch (error) {
                    console.error('Failed to get authentication token:', error);
                }
            }
            return config;
        })

        return () => api.interceptors.request.eject(interceptor)
    }, [isSignedIn, getToken])


    return { isSignedIn, isClerkLoaded: isLoaded }
}

export default useAuthRequest
