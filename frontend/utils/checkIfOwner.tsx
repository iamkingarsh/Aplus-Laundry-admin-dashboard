import { fetchData, postData } from '@/axiosUtility/api'
import { tr } from 'date-fns/locale';
import React from 'react'

function checkIfOwner() {
    let currentRole = ''

    const getCurrentData = async () => {

        try {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)AplusToken\s*=\s*([^;]*).*$)|^.*$/, '$1') as string;

            const result = await postData('/auth/currentuser',
                {
                    token: token
                }
            ); // Replace 'your-endpoint' with the actual API endpoint
            console.log(result.user)
            currentRole = result.user.role


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    getCurrentData()




    const isOwner = currentRole === 'owner' ? false : true
    console.log('isOwnerisOwnerisOwnerisOwnerisOwner',isOwner)

    return isOwner
}

export default checkIfOwner
