import React from 'react'
import {Link} from 'react-router-dom'
export const LinksList = ({ links }) => {

    if (!links.length){ //if no links exist
        return <p className="center">No URLS Exist</p>
    }
    
    return (
        <table className="striped responsive">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Source</th>
                    <th>Shortened</th>
                    <th>Open</th>
                </tr>
            </thead>

            <tbody>
                { links.map((link, index) => {
                    return (
                        <tr key= { link._id}>
                            <td>{ index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Open</Link>
                            </td>
                        </tr>
                    )
                })}
                

            </tbody>
        </table>
    )
}