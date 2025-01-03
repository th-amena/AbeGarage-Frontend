const api_url = import.meta.env.VITE_API_URL;

if (!api_url) {
  throw new Error(
    "API URL is not defined. Please check your environment variables."
  );
}
const createNewOrder = (newOrder, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(newOrder),
  };
  console.log(requestOptions);
  const response = fetch(`${api_url}/api/order`, requestOptions);
  return response;
};
// Function to fetch order details by ID
const getOrderById = async (order_hash) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${api_url}/api/order/${order_hash}`,
    requestOptions
  );
  //   console.log(response);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch order details.");
  }
  return response;
};
//A function to get customer order
const getSingleCustomerOrders = async (customer_hash, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/customer/orders/${customer_hash}`,
    requestOptions
  );
  return response;
};
/**
 * Fetch all orders
 * Used for OrdersPage
 */
const getOrders = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${api_url}/api/orders`, requestOptions);
  const data = await response.json();
  // console.log(data);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch orders.");
  }

  return data; // Assuming the API returns an object with an orders array
};

const updateOrderStatus = async (order_hash, orderDetails, token) => {
   const requestOptions = {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         "x-access-token": token,
      },
      body: JSON.stringify({
         order_id: orderDetails.order_id, // Include order_id explicitly
         service_completed: orderDetails.service_completed, // Array of updated service statuses
         order_status: orderDetails.order_status, // The overall order status (0 for In Progress, 1 for Completed)
      }),
   };

   try {
      const response = await fetch(
         `${api_url}/api/order/update-order/${order_hash}`,
         requestOptions
      );

      if (!response.ok) {
         throw new Error(`Failed with status code: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Order status update response:", responseData);
      return responseData; // Return the successful response data
   } catch (error) {
      console.error("Failed to update order status:", error);
      throw new Error(error.message || "Failed to update order status.");
   }
};

// const updateOrderStatus = async (order_hash, updatedServices, order_status, token) => { 
//   const requestOptions = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       "x-access-token": token,
//     },
//     body: JSON.stringify({
//       order_hash,        // Order identifier (hash)
//       service_completed: updatedServices, // Array of updated service statuses
//       order_status,      // The overall order status (0 for In Progress, 1 for Completed)
//     }),
//   };

//   try {
//     const response = await fetch(
//       `${api_url}/api/order`,
//       requestOptions
//     );
//     console.log(response);
    
//     return response; // Return the successful response data
//   } catch (error) {
//     console.log(error);
    
//     // throw new Error(error.message || "Failed to update order status.");
//   }
// };
export default {
  createNewOrder,
  getSingleCustomerOrders,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
