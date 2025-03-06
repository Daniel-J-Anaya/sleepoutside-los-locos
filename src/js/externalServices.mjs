const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    // console.log(res)
    throw { name: 'servicesError', message: await res.json() };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  // console.log(data.Result);
  return data.Result;
}

export async function findProductById(id) {
  const products = await fetch(baseURL + `product/${id}`);
  const productData = await products.json();
  return productData.Result;
};

export async function checkout(json) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json),
  };
  return await fetch(baseURL + 'checkout/', options).then(convertToJson);
};

export async function loginRequest(creds) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  };
  let response = await fetch(baseURL + 'login/', options).then(convertToJson);
  console.log(response)
  return response.accessToken
};


export async function getOrders() {
  const token = getLocalStorage("so-token");
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  return await fetch(baseURL + 'orders/', options).then(convertToJson);
};