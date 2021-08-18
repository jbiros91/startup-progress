import { useState, useCallback } from "react";

interface Fact {
    id: string
    text: string
    source: string
    language: string
    permalink: string
}

export const useFetchRandomFact = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Fact | null>(null)
    const [error, setError] = useState()


    return {
        data,
        loading,
        error,
        fetch: useCallback(() => {
            setLoading(true)
            fetch('https://uselessfacts.jsph.pl/random.json')
                .then(response => response.json())
                .then(setData)
                .catch(setError)
                .finally(() => setLoading(false))

        }, []),
    }
}
