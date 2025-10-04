// components/AdvancedCalculator.tsx

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalculatorIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon
} from '@heroicons/react/outline';

const AdvancedCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [mode, setMode] = useState('calculator'); // calculator, currency, percentage
    const [currencyInput, setCurrencyInput] = useState('');
    const [currencyResult, setCurrencyResult] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');

    // Taxas de câmbio atualizadas
    const exchangeRates = useMemo(() => ({
        USD: { EUR: 0.92, GBP: 0.79, BRL: 5.15, JPY: 149.5 },
        EUR: { USD: 1.09, GBP: 0.86, BRL: 5.61, JPY: 162.8 },
        GBP: { USD: 1.27, EUR: 1.16, BRL: 6.52, JPY: 189.2 },
        BRL: { USD: 0.19, EUR: 0.18, GBP: 0.15, JPY: 29.0 },
        JPY: { USD: 0.0067, EUR: 0.0061, GBP: 0.0053, BRL: 0.034 },
    }), []);

    // Calculadora básica
    const inputNumber = (num) => {
        if (waitingForOperand) {
            setDisplay(String(num));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? String(num) : display + num);
        }
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const clear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    };

    const performOperation = (nextOperation) => {
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const currentValue = previousValue || 0;
            const newValue = calculate(currentValue, inputValue, operation);

            setDisplay(String(newValue));
            setPreviousValue(newValue);
        }

        setWaitingForOperand(true);
        setOperation(nextOperation);
    };

    const calculate = (firstValue, secondValue, operation) => {
        switch (operation) {
            case '+': return firstValue + secondValue;
            case '-': return firstValue - secondValue;
            case '×': return firstValue * secondValue;
            case '÷': return firstValue / secondValue;
            case '=': return secondValue;
            default: return secondValue;
        }
    };

    // Conversor de moedas
    useEffect(() => {
        if (currencyInput && fromCurrency && toCurrency && exchangeRates[fromCurrency]) {
            const rate = exchangeRates[fromCurrency][toCurrency];
            if (rate) {
                setCurrencyResult((parseFloat(currencyInput) * rate).toFixed(2));
            } else {
                setCurrencyResult('Taxa não disponível');
            }
        }
    }, [currencyInput, fromCurrency, toCurrency, exchangeRates]);

    const calculatePercentage = (value, percentage) => {
        return (value * percentage) / 100;
    };

    const modes = [
        { id: 'calculator', name: 'Calculadora', icon: CalculatorIcon },
        { id: 'currency', name: 'Moedas', icon: CurrencyDollarIcon },
        { id: 'percentage', name: 'Percentual', icon: ChartBarIcon },
    ];

    return (
        <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
                <div className="p-1 bg-white/10 rounded backdrop-blur-sm">
                    <CalculatorIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h2 className="text-base font-medium text-white">Calculadora</h2>
                    <p className="text-xs text-white/60">Múltiplas funcionalidades</p>
                </div>
            </div>

            {/* Seletor de modo */}
            <div className="flex gap-2 mb-4">
                {modes.map((modeItem) => (
                    <motion.button
                        key={modeItem.id}
                        onClick={() => setMode(modeItem.id)}
                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-xs transition-all duration-200 backdrop-blur-sm ${
                            mode === modeItem.id
                                ? 'bg-white/20 text-white'
                                : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <modeItem.icon className="w-4 h-4" />
                        {modeItem.name}
                    </motion.button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {mode === 'calculator' && (
                    <motion.div
                        key="calculator"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        {/* Display */}
                        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 text-right border border-white/10">
                            <div className="text-xl font-mono text-white">{display}</div>
                        </div>

                        {/* Teclado */}
                        <div className="grid grid-cols-4 gap-2">
                            {[
                                ['C', '±', '%', '÷'],
                                ['7', '8', '9', '×'],
                                ['4', '5', '6', '-'],
                                ['1', '2', '3', '+'],
                                ['0', '0', '.', '=']
                            ].map((row, rowIndex) =>
                                row.map((key, colIndex) => (
                                    <motion.button
                                        key={key}
                                        onClick={() => {
                                            if (key === 'C') clear();
                                            else if (key === '.') inputDecimal();
                                            else if (['+', '-', '×', '÷', '='].includes(key)) performOperation(key);
                                            else inputNumber(key);
                                        }}
                                        className={`p-2 rounded text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
                                            ['C', '±', '%', '÷', '×', '-', '+', '='].includes(key)
                                                ? 'bg-white/20 hover:bg-white/30 text-white'
                                                : 'bg-white/10 hover:bg-white/15 text-white'
                                        } ${key === '0' && colIndex === 0 ? 'col-span-2' : ''}`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {key}
                                    </motion.button>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}

                {mode === 'currency' && (
                    <motion.div
                        key="currency"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        <input
                            type="number"
                            placeholder="Valor para converter"
                            value={currencyInput}
                            onChange={(e) => setCurrencyInput(e.target.value)}
                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">De</label>
                                <select
                                    value={fromCurrency}
                                    onChange={(e) => setFromCurrency(e.target.value)}
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    {Object.keys(exchangeRates).map(currency => (
                                        <option key={currency} value={currency}>{currency}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Para</label>
                                <select
                                    value={toCurrency}
                                    onChange={(e) => setToCurrency(e.target.value)}
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    {Object.keys(exchangeRates).map(currency => (
                                        <option key={currency} value={currency}>{currency}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {currencyResult && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gray-900/50 rounded-lg p-4 text-center"
                            >
                                <div className="text-2xl font-bold text-white">
                                    {currencyResult} {toCurrency}
                                </div>
                                <div className="text-sm text-gray-400 mt-1">
                                    Taxa: 1 {fromCurrency} = {exchangeRates[fromCurrency]?.[toCurrency]?.toFixed(4)} {toCurrency}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {mode === 'percentage' && (
                    <motion.div
                        key="percentage"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="number"
                                placeholder="Valor base"
                                className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="number"
                                placeholder="Percentual"
                                className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                            {['10%', '20%', '25%', '50%', '75%', '100%'].map(percent => (
                                <motion.button
                                    key={percent}
                                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-all duration-200"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {percent}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdvancedCalculator;
