const Instagram = require('instagram-scraping');

module.exports = {
  async fetchInstagramFeed() {
    const { username } = strapi.plugins['instagram-feed'].config;

    return await Instagram.scrapeUserPage(username)
      .then(async data => {
        const posts = data.medias;
        strapi.log.info(`✅ Instagram Feed Plugin -> Fetch ${username} feed`);

        const oldPosts = await strapi.query('instagram-feed', 'instagram-feed').find();
        let createPostCount = 0;
        let updatePostCount = 0;
        let deletePostCount = 0;

        const queries = [];

        posts.forEach(post => {
          if(!oldPosts.find(oldPost => oldPost.owner_id === post.owner_id)) {
            createPostCount ++;
            queries.push(
              strapi.query('instagram-feed', 'instagram-feed').create({
                shortcode: post.shortcode,
                owner_id: post.owner_id,
                date: new Date(post.date * 1000).toISOString(),
                comment_count: post.comment_count,
                like_count: post.like_count,
                is_video: post.is_video,
                text: post.text,
                display_url: post.display_url,
                thumbnail: post.thumbnail,
                thumbnail_150x150: post.thumbnail_resource[0].src,
                thumbnail_240x240: post.thumbnail_resource[1].src,
                thumbnail_320x320: post.thumbnail_resource[2].src,
                thumbnail_480x480: post.thumbnail_resource[3].src,
                thumbnail_640x640: post.thumbnail_resource[4].src
              })
            );
          } else {
            updatePostCount ++;
            queries.push(
              strapi.query('instagram-feed', 'instagram-feed').update(
                { owner_id: post.owner_id },
                {
                  comment_count: post.comment_count,
                  like_count: post.like_count,
                  text: post.text,
                }
              )
            );
          }
        })

        oldPosts.forEach(oldPost => {
          if(!posts.find(post => post.owner_id === oldPost.owner_id)) {
            deletePostCount ++;
            queries.push(
              strapi.query('instagram-feed', 'instagram-feed').delete({ id: oldPost.id })
            );
          }
        })

        await Promise.all(queries);

        strapi.log.info(`✅ Instagram Feed Plugin -> Create ${createPostCount} posts`);
        strapi.log.info(`✅ Instagram Feed Plugin -> Update ${updatePostCount} posts`);
        strapi.log.info(`❌ Instagram Feed Plugin -> Delete ${deletePostCount} posts`);
      })
      .catch(err => {
        console.error(err);
        return err.message;
      });

  },
  async getInstagramFeed() {
    const { count, fields } = strapi.plugins['instagram-feed'].config;
    const feed = await strapi.query('instagram-feed', 'instagram-feed').find({ _sort: 'date:desc' });
    if(!feed.length) {
      await strapi.plugins['instagram-feed'].services['instagram-feed'].fetchInstagramFeed();
      feed = await strapi.query('instagram-feed', 'instagram-feed').find({ _sort: 'date:desc' });
    }
    feed.forEach(f => {
      delete f.id;
      for (const [key, value] of Object.entries(fields)) {
        if(!value) {
          delete f[key];
        }
      }
    })

    feed.length = count;

    return feed;
  }
}
