"use client"
import { useEffect, useState } from 'react';
import { fetchDataWithToken } from '@/axiosUtility/data.api';
import { fetchData } from '@/axiosUtility/api';

function Data() {
  const [data, setData] = useState<never[]>([]);
  useEffect(() => {
    // Use asynchronous function to fetch data


    // Call the asynchronous function
    const dataFromApi = fetchData('/category/all');
    
  }, []);

  return data;
}

export default Data;
