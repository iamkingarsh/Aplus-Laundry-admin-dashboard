"use client"   
import { useEffect, useState } from 'react';
import { fetchDataWithToken } from '@/axiosUtility/data.api';

function Data() {
    const [data, setData] = useState<never[]>([]);
  useEffect(() => {
    // Use asynchronous function to fetch data
   

    // Call the asynchronous function
    fetchData();
  }, []);

  return data;
}

export default Data;
