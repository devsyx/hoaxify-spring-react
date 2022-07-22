import { useEffect, useState } from 'react';
import axios from "axios";

export const useApiProgress = (apiMethod, apiPath, strictPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false);
    useEffect(() => {
        let requestInterceptor, responseInterceptor;
        const updateApiCall = (method, url, inProgress) => {
            if (method !== apiMethod)
                return;
            if (strictPath && url === apiPath) {
                setPendingApiCall(inProgress);
            }
            if (!strictPath && url.startsWith(apiPath)) {
                setPendingApiCall(inProgress);
            }
        }
        const registerInterceptors = () => {
            requestInterceptor = axios.interceptors.request.use(request => {
                updateApiCall(request.method, request.url, true);
                return request;
            });
            responseInterceptor = axios.interceptors.response.use(response => {
                updateApiCall(response.config.method, response.config.url, false);
                return response;
            }, (error) => {
                updateApiCall(error.config.method, error.config.url, false);
                throw error;
            })
        }
        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }
        registerInterceptors();
        return () => {
            unregisterInterceptors();
        }
    }, [apiMethod, apiPath])
    return pendingApiCall;
}
