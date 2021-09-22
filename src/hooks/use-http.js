import { useCallback, useState } from "react";

const useHTTPRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (request, dataTransform = () => null) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(request.url, {
                method: request.method ? request.method : "GET",
                body: request.body ? JSON.stringify(request.body) : null,
                headers: request.headers ? request.headers : {},
            });

            if (!response.ok) {
                throw new Error(`${request.method} Request Failed.`);
            }

            const data = await response.json();
            dataTransform(data);
        } catch (err) {
            setError(err.message || "Unknown Error.");
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useHTTPRequest;