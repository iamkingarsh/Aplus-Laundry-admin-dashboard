import React from 'react'

function checkIfOwner() {
    const currentRole = 'owner'
    const isOwner = currentRole === 'owner' ? false : true
    return isOwner
}

export default checkIfOwner
