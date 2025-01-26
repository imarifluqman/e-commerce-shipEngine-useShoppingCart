"use client";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState } from "react";
import Link from "next/link";


interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  currency: string;
  rating: {
    rate: number;
    count: number;
  };
  _id: string;
  _type: string;
}

function Page() {

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const dataFetch = () => {
    setIsLoaded(true);


    fetch("api/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoaded(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    dataFetch();
  }, []);

  return (

    <div>
      {isLoaded && <h1 className="w-full h-[100vh] text-3xl font-bold text-center mt-10">Loading...</h1>}

      {products.length > 0 && <div className="w-full flex flex-wrap justify-evenly items-center gap-4 mt-5  ">
        {products?.map((product) => (
          <Link href={product._id} key={product.id} className="w-[300px] h-[300px] bg-white shadow-lg rounded-lg flex flex-col items-center">
            <div className="w-full h-[200px] flex justify-center items-center">
              <img src={urlFor(product.image).url()} alt={product.title} className="w-full h-full object-contain" />
            </div>
            <div className="p-4 text-center">
              <h2 className="font-semibold">{product.title.slice(0, 20)}</h2>
              <p className="text-gray-500">${product.price}</p>
            </div>

          </Link>

        ))}
      </div>}
    </div>


  )
}

export default Page