import { fetchData } from '@/axiosUtility/api';
import React, { useState } from 'react'

const Data = async () => {
    const [categories, setCategories] = useState([])
    try {
        const result = await fetchData('/category/all'); // Replace 'your-endpoint' with the actual API endpoint

        if (result && result.categories) {
            const categories = result.categories;
            setCategories(categories);
            // Now you can work with the 'categories' array
        } else {
            console.error('Response format is not as expected');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    return categories
}

export default Data
