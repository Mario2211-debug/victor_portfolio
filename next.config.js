const { default: next } = require('next')
const withPWA = require('next-pwa');


/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "**", // Permitindo todos os domínios
                port: '',
                pathname: '/uBqAtZO4sPEULxkQkcAiNg/**'

            }
        ],
    },

}

module.exports = withPWA({
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
    },
    images: {
        domains: ['exemplo.com'], // Domínios configurados
    },
});

module.exports = nextConfig
