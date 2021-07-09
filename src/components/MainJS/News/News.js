import React from 'react'

export default function News({news}) {
    return (
        <div>
            <h4>{news.title}</h4>
            <h6>{news.name}</h6>
        </div>
    )
}
