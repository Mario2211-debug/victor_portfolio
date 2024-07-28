const { default: next } = require('next')

/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imagedelivery.net',
                port: '',
                pathname: '/uBqAtZO4sPEULxkQkcAiNg/**'

            }
        ],
    },

}

module.exports = nextConfig
