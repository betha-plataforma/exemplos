module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/plataforma/publico/front-end/estrutura/showcase-vue/' // prod
    : '/', // dev
}
