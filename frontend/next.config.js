/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "**", // Permitindo todos os domínios
                port: '',
                pathname: '**'

            }
        ],
    },

}

module.exports = nextConfig
