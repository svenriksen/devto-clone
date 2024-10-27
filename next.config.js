
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const withMDX = await import("@next/mdx");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        // domains: ['lh3.googleusercontent.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    // async headers() {
    //     return [
    //         {
    //             source: '/:path*{/}?',
    //             headers: [
    //                 {
    //                     key: 'X-Accel-Buffering',
    //                     value: 'no',
    //                 },
    //             ],
    //         },
    //     ];
    // }
};

export default withMDX.default()(config);
