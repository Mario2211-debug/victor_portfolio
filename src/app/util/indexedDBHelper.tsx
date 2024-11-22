'use client';

import { openDB, DBSchema } from 'idb';

interface CacheDB extends DBSchema {
    cache: {
        key: string; // Unique key
        value: any;  // Data to store
    };
}

// Ensure `indexedDB` is available only on the client side
const getDBInstance = () => {
    if (typeof window === 'undefined') {
        throw new Error('indexedDB is not available on the server side.');
    }
    return openDB<CacheDB>('cache-database', 1, {
        upgrade(db) {
            db.createObjectStore('cache', { keyPath: 'key' });
        },
    });
};

export const setCache = async (key: string, value: any) => {
    try {
        const db = await getDBInstance();
        await db.put('cache', { key, value });
    } catch (error) {
        console.error('Error in setCache:', error);
    }
};

export const getCache = async (key: string): Promise<any | undefined> => {
    try {
        const db = await getDBInstance();
        return (await db.get('cache', key))?.value;
    } catch (error) {
        console.error('Error in getCache:', error);
        return undefined;
    }
};

export const clearCache = async () => {
    try {
        const db = await getDBInstance();
        await db.clear('cache');
    } catch (error) {
        console.error('Error in clearCache:', error);
    }
};
