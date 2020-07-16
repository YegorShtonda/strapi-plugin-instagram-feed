module.exports = {
  async index(ctx) {
    const feed = await strapi.plugins['instagram-feed'].services['instagram-feed'].getInstagramFeed();
    ctx.send(feed);
  },
};
