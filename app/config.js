const dev = process.env.NODE_ENV !== 'production';
export const backendServer = 'http://localhost:8080'
export const FrontendServer = dev ? 'http://localhost:3000' : 'http://example.com'