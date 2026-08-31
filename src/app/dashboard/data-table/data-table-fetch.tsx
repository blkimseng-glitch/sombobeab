"use client"

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./cloumns";

const fetcher = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.');
    }
    return res.json();
};

export default function DataTableFetch() {
    // const { data } = useSWR<Products[]>(`https://api.escuelajs.co/api/v1/products`, fetcher);
    // console.log(`===>My data: ${data}`)
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function fetchingDataFromAPI() {
            const respone = await fetch(
              `https://sombobaeb.cheat.casa/food-items?skip=0&limit=100`,
            );
            const data = await respone.json();
            setProducts(data);
        }
        fetchingDataFromAPI();
    }, [])
    console.log(`===>My data: ${products}`)
  return (
    <div>
      <DataTable columns={columns} data={products}/>
    </div>
  )
}
