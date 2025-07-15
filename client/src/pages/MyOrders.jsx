import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user');
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className='mt-30'>
      <div className='flex flex-col items-end w-max mb-8'>
        <p className='text-2xl font-medium uppercase text-[#545454]'>My Orders</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      {myOrders.map((order, index) => (
        <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 max-w-5xl overflow-x-auto'>
          <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col mb-4'>
            <span>Order Id : {order._id}</span>
            <span>Mode of Payment : {order.paymentType}</span>
            <span className='text-primary-dull'>Total Amount : {currency}{order.amount}</span>
          </p>

          <div className="w-full min-w-[640px]">
            <div className="grid grid-cols-12 bg-gray-100 text-gray-700 text-sm font-semibold py-2 px-4 rounded-t-md">
              <span className="col-span-5">Product</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-center">Status</span>
              <span className="col-span-3 text-right">Amount</span>
            </div>

            {order.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 items-center text-gray-600 text-sm px-4 py-4 bg-white border-b border-gray-200"
              >
                <div className="col-span-5 flex items-center gap-3 min-w-0">
                  <img
                    src={item.product.image[0]}
                    alt="product"
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-base font-medium text-gray-800 break-words">{item.product.name}</p>
                    <p className="text-xs text-gray-500">{item.product.category}</p>
                  </div>
                </div>

                <p className="col-span-2 text-center">{item.quantity || "1"}</p>
                <p className="col-span-2 text-center">{order.status}</p>
                <p className="col-span-3 text-right font-medium">
                  {currency}{item.product.offerPrice * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;