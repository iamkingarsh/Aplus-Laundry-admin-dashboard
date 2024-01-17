import { fetchData } from '@/axiosUtility/api';
import React, { use, useEffect, useState } from 'react'

const GetData = async () => {
    const categories = [] as any
    const getData = async () => {
        try {
            const result = await fetchData('/category/all'); // Replace 'your-endpoint' with the actual API endpoint

            if (result && result.categories) {
                let categories = result.categories;
                // Now you can work with the 'categories' array
            } else {
                console.error('Response format is not as expected');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
 
        getData()

    return categories
}

export default GetData
