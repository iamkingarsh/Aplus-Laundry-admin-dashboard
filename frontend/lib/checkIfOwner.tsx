import React from 'react'

function checkIfOwner() {
    const currentRole = 'owner'
    const isOwner = currentRole === 'owner' ? true : false
    return isOwner
}

export default checkIfOwner
