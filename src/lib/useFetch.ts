import { useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();

        fetch(url, { signal: controller.signal })
            .then(response => response.json())
            .then(setData)
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [url]);

    return { data, loading };
}