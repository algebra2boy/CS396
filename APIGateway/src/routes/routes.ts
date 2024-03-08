interface Proxy {
    target: string;
    changeOrigin: boolean;
    pathRewrite: {
        [key: string]: string;
    }
}

interface RateLimit {
    windowMs: number;
    max: number;
}

export interface Route {
    url: string;
    auth: boolean;
    creditCheck: boolean;
    rateLimit?: RateLimit;
    proxy: Proxy;
}


export const ROUTES: Route[] = [
    {
        url: '/free',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 5, // limit each IP to 5 requests per windowMs
        },
        proxy: {
            target: "https://www.google.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/free`]: '',
            },
        }
    },
    {
        url: '/premium',
        auth: true,
        creditCheck: true,
        // Proxy configuration containing information about the target to which the request should be redirected
        proxy: {
            target: "https://www.google.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/premium`]: '',
            },
        }
    }
]