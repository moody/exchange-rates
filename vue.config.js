module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/exchange-rates/" : "/",
  transpileDependencies: ["vuetify"]
};
