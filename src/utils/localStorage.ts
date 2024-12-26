import CryptoJS from 'crypto-js';

// mengenkripsi data sebelum disimpan ke localStorage
export const encryptData = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_SECRET_KEY).toString();
};

// mendekripsi data yang diambil dari localStorage
export const decryptData = (data: string): any => {
  const bytes = CryptoJS.AES.decrypt(data, import.meta.env.VITE_SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData ? JSON.parse(decryptedData) : null;
};

export const setLocalStorage = (key: string , value: any): void => {
  const encryptedValue  = encryptData(value);
  localStorage.setItem(key, JSON.stringify(encryptedValue));
}

export const getLocalStorage = (key: string) => {
  const encryptedValue  = localStorage.getItem(key);
  
  if(encryptedValue) {
    return decryptData(encryptedValue);
  }

  return null
} 

export const removeLocalStorage  = (key: string, value: any): void => {
  // return localStorage.removeItem(key)
  return localStorage.setItem(key, JSON.stringify(value));
}

export const hasLocalStorage  = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '[]');
}