const dev = process.env.NODE_ENV !== 'production';
export const backendServer = dev? 'http://localhost:8080' : 'http://172.15.0.3:8080'
export const FrontendServer = dev ? 'http://localhost:3000' : '172.15.0.4:3000'