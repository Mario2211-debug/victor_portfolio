const { default: next } = require('next')

/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.andacademy.com',
                port: '',
                pathname: '/resources/wp-content/uploads/2023/09/Inside8-2.webp',
            },
        ],
    },

}

module.exports = nextConfig
