export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    api: {
        key: process.env.API_KEY,
    },
});