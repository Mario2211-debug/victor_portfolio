import React, { createContext, useContext, useEffect, useState } from 'react';
import { setCache, getCache, clearCache } from '@/app/util/indexedDBHelper';

interface CacheContextType {
    cache: Map<string, any>;
    fetchAndCache: (key: string, fetchFunction: () => Promise<any>) => Promise<any>;
    clearAllCache: () => Promise<void>;
}

const CacheContext = createContext<CacheContextType | undefined>(undefined);

export const CacheProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cache, setCacheState] = useState(new Map<string, any>());

    // Atualiza o estado local e armazena no IndexedDB
    const fetchAndCache = async (key: string, fetchFunction: () => Promise<any>) => {
        // Primeiro, verifica se há dados no estado local
        if (cache.has(key)) return cache.get(key);

        // Em seguida, verifica o IndexedDB
        const cachedData = await getCache(key);
        if (cachedData) {
            setCacheState((prev) => new Map(prev).set(key, cachedData));
            return cachedData;
        }

        // Caso contrário, faz o fetch e armazena
        const data = await fetchFunction();
        setCache(key, data);
        setCacheState((prev) => new Map(prev).set(key, data));
        return data;
    };

    // Limpa o cache local e no IndexedDB
    const clearAllCache = async () => {
        await clearCache();
        setCacheState(new Map());
    };

    return (
        <CacheContext.Provider value={{ cache, fetchAndCache, clearAllCache }}>
            {children}
        </CacheContext.Provider>
    );
};

export const useCache = (): CacheContextType => {
    const context = useContext(CacheContext);
    if (!context) throw new Error('useCache must be used within a CacheProvider');
    return context;
};
