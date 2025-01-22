'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { getRatesWithShipmentDetails } from "@/app/getRates-ShipEngine/getRatesFromShipEngine";


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
    const [trackingNumber, setTrackingNumber] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const { id } = useParams();




    useEffect(() => {
        function getPost() {

            const api = `https://e-commerce-ship-engine-use-shopping-cart.vercel.app/api/product/${id}`;

            fetch(api || `http://localhost:3000/api/product/${id}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data)
                });
        }
        getPost()
    }, [])


    const orderNow = async (id: string) => {
        const res = await getRatesWithShipmentDetails(id, setIsLoaded);
        console.log(res);
        setRates(res);

    }




    async function createLabelFromRate(id: string) {
        const api = `https://e-commerce-ship-engine-use-shopping-cart.vercel.app/api/label`;
        try {
            const res = await fetch(api || `http://localhost:3000/api/label`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            })

            const data = await res.json();
            console.log(data, data.trackingNumber);
            setTrackingNumber(data.trackingNumber);
            setLabel(data.labelDownload.png);
            setRates([]);
        } catch (error) {
            console.log(error);
        }

    }






    return (
        <>

            <div className='w-full  flex flex-col lg:flex-row md:flex-row justify-center items-center my-10'>
                {!product && <h1>Loading...</h1>}
                {product && <>
                    <div className='lg:w-1/2 md-w-1/2 w-full p-5 flex justify-center items-center'>
                        {product?.image && <Image className='w-[300px]' src={urlFor(product.image).url()} width={500} height={500} alt="image" priority={true} />}
                    </div>
                    <div className='lg:w-1/2 md-w-1/2 w-full p-5'>
                        <div className='lg:w-[80%] w-[100%] flex flex-col '>
                            <h1 className='text-3xl'>{product?.title}</h1>
                            <p>{product?.description}</p>
                            <h1 className='text-2xl text-red-600'>Rs : {product?.price}</h1>
                            <p className='text-yellow-800'>Rating : {product?.rating.rate}</p>
                            <button onClick={() => { orderNow(product._id) }} className="w-[50%] border mt-5 py-3 px-4 border-red-700 rounded hover:bg-red-700 hover:text-white" disabled={isLoaded}>{isLoaded ? "Loading..." : "Get Shipping Rates"}</button>
                        </div>
                    </div></>}
            </div>

            {rates.length > 0 &&
                <div className='flex flex-col gap-2 w-[80%] mx-auto mt-10'>
                    <hr />
                    <h1>Shipping Rates</h1>
                    <p>Select a shipping rate</p>
                    <div className='flex flex-wrap justify-center items-center gap-2 w-[100%] mx-auto'>
                        {rates && rates.map((rate) => {
                            return (
                                <div key={rate.rateId} className='lg:w-[250px] w-[300px] flex flex-col border p-5 cursor-pointer hover:bg-slate-100' onClick={() => { createLabelFromRate(rate.rateId) }}>
                                    <h1>$ : {rate.shippingAmount.amount}</h1>
                                    <h1>US : {rate.shippingAmount.currency}</h1>
                                    <h1>Rate ID : {rate.rateId}</h1>
                                    <h1>Carrier ID : {rate.carrierId}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }

            <div className='w-[80%] mx-auto flex flex-col justify-center items-center my-10'>
                {trackingNumber && <h1 className='text-2xl text-green-700 my-10'>Tracking Number : {trackingNumber}</h1>}
                {label && <img src={label} alt="label" />}
            </div>
        </>
    )
}

export default Page