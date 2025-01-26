import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_STORAGE_KEY || 'your-fallback-secret';

export const secureStorage = {
    set: (key, value) => {
        try {
            const encryptedValue = CryptoJS.AES.encrypt(
                JSON.stringify({
                    data: value,
                    timestamp: Date.now()
                }),
                SECRET_KEY
            ).toString();
            localStorage.setItem(key, encryptedValue);
        } catch (error) {
            console.error('Error storing data:', error);
        }
    },

    get: (key) => {
        try {
            const encrypted = localStorage.getItem(key);
            if (!encrypted) return null;

            const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
            const { data, timestamp } = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

            // Validate token age (24h expiry)
            if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
                secureStorage.remove(key);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Error retrieving data:', error);
            return null;
        }
    },

    remove: (key) => {
        localStorage.removeItem(key);
    }
};