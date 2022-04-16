import { api_endpoint } from "../config";

const DOMAIN = api_endpoint;

export async function authLogin(requestData) {
  const response = await fetch(`${DOMAIN}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify(requestData),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login Fail!!.');
  }

  return data;
}
export async function sendOrder(requestData) {
  const response = await fetch(`${DOMAIN}/api/auth/order`, {
    method: 'POST',
    body: JSON.stringify(requestData),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization':'Bearer '+requestData.apiToken
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Order Fail!!.');
  }

  return data;
}
export async function logout(requestData) {
  const response = await fetch(`${DOMAIN}/api/auth/logout`, {
    method: 'GET',
    headers: {     
      'Accept': 'application/json',
      'Authorization':'Bearer '+requestData.apiToken
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Logout Fail!!.');
  }

  return data;
}
export async function checkPromoCode(requestData) {
  const response = await fetch(`${DOMAIN}/api/auth/promo-code/match`, {
    method: 'POST',
    body: JSON.stringify({
              "pack_id":requestData.pack_id,
              "promo_code":requestData.promo_code
          }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization':'Bearer '+requestData.apiToken
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get class-packs.');
  }
  let promoData=null;
  if(data.errorCode === 0){
    promoData = data.promoData;
  }else{
    throw new Error(data.message || 'Could not get class-packs.');
  }

  return promoData;
}

export async function getClassPacks(requestData) {
  const response = await fetch(`${DOMAIN}/api/auth/class-packs`, {
    method: 'POST',
    body: JSON.stringify({
              "mem_tier":"newbie",
              "rowsPerPage":20
          }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization':'Bearer '+requestData.apiToken
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get class-packs.');
  }
  let classPacks=[];
  if(data.errorCode === 0){
    classPacks = data.data.pack_list;
  }

  return classPacks;
}
