import React, { useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import axios from 'axios';


const Orders = () => {
  const { backendUrl,token, currency } = useContext(ShopContext);
  const [orderData,setOrderData]=useState([]);

  const loadOrderData = async ()=>{
    try {
      if(!token){
        return null;
      }
      // debugger;
      const response=await axios.get(backendUrl+'/api/order/userorders',{headers:{token}});
      console.log("dharmika",response);
      if(response.data.success){
        let allOrdersItem=[];
        console.log(response.data.orders)
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            console.log("hedfkjnkidfh----->",item)
            item['status']=order.status;
            item['payment']=order.payment;
            item['paymentMethod']=order.paymentMethod;
            item['date']=order.date;
            allOrdersItem.push(item);
          })
        })
      

        // console.log("fshbvhjfbvjhb=--->",allOrdersItem);
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    loadOrderData();
  },[token])
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orderData.slice(0, Math.min(orderData.length, 4)).map((item, index) => (
            
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 '>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item?.image[0]} />
                <div>
                  <p className='sm:text-base font-medium'>{item?.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity:{item.quantity}</p>
                    <p>Size:{item.size}</p>
                  </div>
                  <p className='mt-1'>Date:<span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Date:<span className='text-gray-400'>{item.paymentMethod}</span></p>
                  <p className='mt-1'>Date:<span className='text-gray-400'>{"price"}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between '>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  {/* <p className='text-sm md:text-base'>{"hbfjhbfjb"}</p> */}
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
