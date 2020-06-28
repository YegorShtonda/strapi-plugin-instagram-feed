module.exports = {
  index: async ctx => {
    console.log(strapi.config);
    const feed = await strapi.plugins['instagram-feed'].services.instagramfeed.getInstagramFeed();

    ctx.send(feed);
  },
};
