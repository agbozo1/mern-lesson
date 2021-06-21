import React, {useState, useContext, useCallback, useEffect} from 'react'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import { LinksList } from '../components/LinksList'
import {Loader} from '../components/Loader'


export const LinksPage = () => {
    const [links, setLinks] = useState([])  //array of urls
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext) 

    const fetchLinks = useCallback( async () => {
        try {
            const fetched = await request('/api/link','POST',null,{ //request
                Authorization: `Bearer ${token}` //header
            })
            //loaded links
            setLinks(fetched)
        } catch (e) {  }
    }, [token, request]) // fetchLinks dependencies

    useEffect( ()=> {
        fetchLinks()
    }, [fetchLinks])

    if (loading) { //when server is loading
        return <Loader/>
    }


    return ( // in the main return.... return a <></> fragment ... if not loading ... return LinksList component
        <> 
           {!loading && <LinksList links ={links} />} 
        </>
    )
}