import React from 'react'

export const LinkCard = ( ({ link })=>{

    return (
        <>
            <h3>Link</h3>

            <p>Your Link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Source: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Number of Clicks: <strong>{link.clicks}</strong></p>
            <p>Date Created: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>

        </>
    )
})