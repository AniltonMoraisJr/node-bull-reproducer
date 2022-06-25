export default {
  redis: {
    host: process.env.REDIS_HOST,
    paassword: process.env.REDIS_PASSWORD,
    port: Number(process.env.REDIS_PORT),
  },
};
