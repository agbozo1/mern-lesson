import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinkCard } from '../components/LinkCard'

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id //id for link (router)

    //get link
    const getLink = useCallback( async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            } )
            setLink(fetched) //assign the fetched link to 'link' with setLink

        } catch (e) {    }
    }, [token, linkId, request])//dependencies

    //request data
    useEffect( ()=> {
        getLink()
    }, [getLink])//dependencies

    if(loading){ //while the server is refreshing - show the Loader component
        return <Loader/>
    }

    return (//when the server is not loading - show the LinkCard component
        <>
            { !loading && link && <LinkCard link={link} /> } 
        </>
    )
}