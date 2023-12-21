const Redis = require("redis");

exports.set = async (key, value) => {
    const client = await Redis.createClient().connect()
    await client.set(key, value)
}