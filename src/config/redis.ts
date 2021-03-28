import redis from "redis";

const client = redis.createClient({
  host: process.env.RD_HOST,
});

export { client };
