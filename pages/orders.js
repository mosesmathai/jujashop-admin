import Layout from "@/components/Layout";
import axios from "axios";
import Spinner from '@/components/Spinner';
import { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const matches = useMediaQuery('(min-width:600px)');


  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
      setIsLoading(false);
    });
  }, [])

  if (matches) {
    return (
      <Layout>
        <div className="flex justify-center">
          <h1 className="text-2xl m-0">Orders Received</h1>
        </div>
        <h1 className="text-lg text-gray-400 m-0">P.M.O.C: Prefered Mode of Communication</h1>   
        <table className="basic text-sm">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contacts</th>  
              <th>P.M.O.C</th> 
              <th>Delivery Point</th>          
              <th>Items Ordered</th>      
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7}>
                  <div className='py-2 flex justify-center'>
                    <Spinner />
                  </div>
                </td>
              </tr>
            )}
            {orders.length > 0 && orders.map(order => (
              <tr key={order._id}>
                <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                <td>
                  {order.firstName}
                </td>
                <td>
                  {order.lastName}
                </td>
                <td>0{order.phone}</td>  
                <td>{order.communication}</td>
                <td>{order.location}</td>        
                <td>
                  {order.line_items.map(l => (
                    <>
                      &#8226;&nbsp;{l.price_data.product_data.name}
                      &nbsp;&#40;x<b>{l.quantity}</b>&#41; <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <div className="flex justify-center">
          <h1 className="text-2xl m-0">Orders Received</h1>
        </div>
        <h1 className="text-sm text-gray-400 m-0">P.M.O.C: Prefered Mode of Communication</h1>   
        <div>
          <div>
            {isLoading && (
              <div>
                <div>
                  <div className='py-2 flex justify-center'>
                    <Spinner />
                  </div>
                </div>
              </div>
            )}
            {orders.length > 0 && orders.map(order => (
              <div className="border-2 font-mono pl-2" key={order._id}>
                <div>
                  <div>{(new Date(order.createdAt)).toLocaleString()}</div> 
                </div>
                <div>
                  <div>
                    <b>Name&#58;</b> {order.firstName} {order.lastName}
                  </div>
                </div>
                <div>
                  <b>Contact&#58;</b> 0{order.phone}
                </div>
                <div>
                  <b>P.M.O.C&#58;</b> {order.communication}
                </div>
                <div>
                  <b>Delivery Point&#58;</b> {order.location} 
                </div>
                <div>
                  <div>
                    <b>Items&#58;</b>
                  </div>
                  <div>
                    {order.line_items.map(l => (
                      <>
                        &#8226;&nbsp;{l.price_data.product_data.name}
                        &nbsp;&#40;x<b>{l.quantity}</b>&#41; <br />
                      </>
                    ))}
                  </div>
                </div>             
              </div>
            ))}
          </div>
        </div>
      </Layout>
    )
  }
  

}
