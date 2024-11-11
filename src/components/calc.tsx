// components/CurrencyConverter.tsx

import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
    const [input, setInput] = useState(''); // Valor que o usuário deseja converter
    const [result, setResult] = useState(''); // Resultado da conversão
    const [fromCurrency, setFromCurrency] = useState('USD'); // Moeda de origem
    const [toCurrency, setToCurrency] = useState('EUR'); // Moeda de destino

    // Taxas de câmbio de exemplo (em uma aplicação real, essas taxas viriam de uma API)
    const exchangeRates = {
        USD: { EUR: 0.85, GBP: 0.75, BRL: 5.0 },
        EUR: { USD: 1.18, GBP: 0.88, BRL: 5.9 },
        GBP: { USD: 1.33, EUR: 1.14, BRL: 6.7 },
        BRL: { USD: 0.20, EUR: 0.17, GBP: 0.15 },
    };

    // Converte o valor sempre que `input`, `fromCurrency`, ou `toCurrency` mudarem
    useEffect(() => {
        if (input && fromCurrency && toCurrency && exchangeRates[fromCurrency]) {
            const rate = exchangeRates[fromCurrency][toCurrency];
            if (rate) {
                setResult((parseFloat(input) * rate).toFixed(2));
            } else {
                setResult('Taxa não disponível');
            }
        }
    }, [input, fromCurrency, toCurrency]);

    // Atualiza o valor de entrada com a digitação do usuário
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <div className="rounded-xl justify-items-end w-fit float-right">
            <div className="text-xs text-neutral-400 mb-2 bg-gray-600 bg-opacity-30 backdrop-blur-sm shadow-sm shadow-neutral-900 p-[0.35rem] rounded-lg">Currency Converter</div>

            {/* Campo de entrada para o valor */}
            <input
                type="number"
                placeholder="Digite o valor"
                value={input}
                onChange={handleInputChange}
                className="focus:outline-0 bg-transparent rounded-lg p-2 text-sm w-full text-center mb-4 text-neutral-400"
            />

            <div className='flex'>
                {/* Dropdown para selecionar a moeda de origem */}
                <div className=" justify-between items-center mb-4">
                    <label className="text-xs p-2">From</label>
                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="text-xs text-neutral-400 focus:outline-0 rounded-lg p-2"
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="BRL">BRL</option>
                    </select>
                </div>

                {/* Dropdown para selecionar a moeda de destino */}
                <div className=" justify-between items-center mb-4 ">
                    <label className="text-xs p-2">To:</label>
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="text-xs text-neutral-400 rounded-lg p-2 focus:outline-0"
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="BRL">BRL</option>
                    </select>
                </div>
            </div>

            {/* Exibição do resultado */}
            <div className="text-right text-md font-regular">
                {result ? `${result} ${toCurrency}` : 'Result'}
            </div>
        </div>
    );
};

export default CurrencyConverter;
