import React, { useEffect, useState } from 'react'
import Hero from '../component/Layout/Hero'
import GenderCollectionSection from '../component/Products/GenderCollectionSection'
// import NewArrival from '../component/Products/NewArrival'
import ProductDetails from '../component/Products/ProductDetails'
import ProductGrid from '../component/Products/ProductGrid'
import FeaturedCollectoin from '../component/Products/FeaturedCollectoin'
import FeatuedSection from '../component/Products/FeatureSection'
import {useDispatch, useSelector} from "react-redux"
import { fetchProductsByFilters } from '../redux/slice/productSlice'
import axios from 'axios'




const Home = () => {
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: "8",
      })
    );
    // fetch best seller product
    const fetchBestSeller = async () =>{
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div className='p-4'>
        <Hero/>
        <GenderCollectionSection/>
        {/* <NewArrival/> */}

        {/* Best Seller */}

        <h2 className='text-3xl text-center font-bold mb-4'>
          Best Seller
        </h2>
        {bestSellerProduct ? (
          <ProductDetails productId={bestSellerProduct._id}/>) : (
          <p className='text-center'>Loading best seller product....</p>
        ) }
    

        <div className=" container mx-auto">
          <h2 className=' text-3xl text-center font-bold mb-4'>
            Top Wears for Women
          </h2>
          <ProductGrid products={products} loading={loading} error={error}/>
        </div>

        <FeaturedCollectoin/>
        <FeatuedSection/>

    </div>
  )
}

export default Home