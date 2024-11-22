import React, { useState, useEffect } from 'react'
import axios from "axios"
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async ( event, orderId) => {
    try {
      const response = await axios.post(backendUrl + "/api/order/status", {orderId, status: event.target.value}, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(response.date.message)
      
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, idx) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] 
            gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-4 md:my-5 text-xs sm:text-sm text-gray-700'
             key={idx}>
              <img className='w-16' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {
                    order.items.map((item, idx) => {
                      if (idx === order.items.length - 1) {
                        return <p className="py-1" key={idx}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                      } else {
                        return <p className="py-1" key={idx}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>
                      }
                    })}
                </div>
                <p className='mt-3 mb-2 font-medium text-color'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Item: {order.items.length}</p>
                <p className='mt-3'>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              <p className='text-sm sm:text-[15px] text-color font-bold'>{currency}{order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold '>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>

          ))
        }
      </div>

    </div>
  )
}

export default Orders
