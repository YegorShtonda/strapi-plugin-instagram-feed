module.exports = {
  index: async ctx => {
    const feed = await strapi.plugins['instagram-feed'].services.instagramfeed.getInstagramFeed();

    ctx.send(feed);
  },
};
