const dev = process.env.NODE_ENV !== 'production';
export const backendServer = 'my-server:8080'
export const FrontendServer = dev ? 'http://localhost:3000' : '172.15.0.1:3000'