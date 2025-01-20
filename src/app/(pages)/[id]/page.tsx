'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { createLabel } from "@/app/products/labelCreate";


type Props = {
    category: string,
    description: string,
    id: number,
    _id: string,
    image: string,
    price: number,
    rating: {
        rate: number,
        count: number
    },
    title: string,
    sku: string,
}


function Page() {
    const [product, setProduct] = useState<Props>()
    const [rates, setRates] = useState<{ rateId: string, shippingAmount: { amount: number, currency: string }, carrierId: string }[]>([])
    const [label, setLabel] = useState("")
    const { id } = useParams();




    useEffect(() => {
        function getPost() {
            fetch(`http://localhost:3000/api/product/${id}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data)
                });
        }
        getPost()
    }, [])


    const orderNow = async (id: string) => {
        const res = await createLabel(id);
        console.log(res);
        setRates(res);

    }




    async function createLabelFromRate(id: string) {
        try {
            const res = await fetch(`http://localhost:3000/api/label`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            })

            const data = await res.json();
            console.log(data);
            setLabel(data.labelDownload.png);
        } catch (error) {
            console.log(error);
        }

    }






    return (
        <>

            <div className='w-full  flex justify-center items-center my-10'>
                {!product && <h1>Loading...</h1>}
                {product && <><div className='w-1/2 flex justify-center items-center'>
                    {product?.image && <Image className='w-[300px]' src={urlFor(product.image).url()} width={500} height={500} alt="image" priority={true} />}
                </div>
                    <div className='w-1/2'>
                        <div className='w-[70%] flex flex-col gap-5'>
                            <h1 className='text-3xl'>{product?.title}</h1>
                            <p>{product?.description}</p>
                            <h1 className='text-2xl text-red-600'>Rs : {product?.price}</h1>
                            <p className='text-yellow-800'>Rating : {product?.rating.rate}</p>
                            <button onClick={() => { orderNow(product._id) }} className="border py-3 px-4 border-red-700 rounded hover:bg-red-700 hover:text-white">Order Now</button>
                        </div>
                    </div></>}
            </div>


            <div className='grid grid-cols-3 gap-2 w-[80%] mx-auto'>
                {rates && rates.map((rate) => {
                    return (
                        <div key={rate.rateId} className='flex flex-col border p-5' onClick={() => { createLabelFromRate(rate.rateId) }}>
                            <h1>$ : {rate.shippingAmount.amount}</h1>
                            <h1>US : {rate.shippingAmount.currency}</h1>
                            <h1>Rate ID : {rate.rateId}</h1>
                            <h1>Carrier ID : {rate.carrierId}</h1>
                        </div>
                    )
                })}
            </div>

            <div className='w-full flex justify-center items-center my-10'>
                {label && <img src={label} alt="label" />}
            </div>
        </>
    )
}

export default Page