//custom hook
import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async(url, method='GET', body = null, headers={}) =>{     

        setLoading(true)

        try {
            
            if(body){
                body = JSON.stringify(body)
                headers['Content-Type'] = "application/json"
            }

            const response = await fetch(url,{method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Something is wrong with the url request')
            }

            setLoading(false)
            return data

        } catch (e) {
            //console.log('Catch',e.message)
            setLoading(false)   
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), []) //when all is said and done

    return { loading, request, error, clearError }
}