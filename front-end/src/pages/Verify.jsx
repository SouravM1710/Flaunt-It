import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

const Verify = () => {

    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext)
    const[searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('order.id')


    const verifyPayment = async () => {
        try {
            if(!token) {
                return null
            }

            // const response = axios.
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])

  return (
    <div>
        
    </div>
  )
}

export default Verify