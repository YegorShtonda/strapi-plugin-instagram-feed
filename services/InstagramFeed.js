const Instagram = require('instagram-scraping');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = {
  fetchInstagramFeed: async () => {
    const { username, count, isText, isThumbnails } = strapi.plugins['instagram-feed'].config;

    return await Instagram.scrapeUserPage(username)
      .then(data => {
        const feed = data.medias.map(media => {
          if(!isText) delete media.text;
          if(!isThumbnails) delete media.thumbnail_resource;
          return media;
        });
        feed.length = Number(count);

        writeFile('.tmp/instagram-feed.json', JSON.stringify(feed))
          .catch(err => {
            console.error(err);
          });

        strapi.log.info(`✅ Fetch ${username} instagram feed`);

        return JSON.stringify(feed);
      })
      .catch(err => {
        console.error(err);
        return err.message;
      });

  },
  getInstagramFeed: async () => {
    return await readFile('.tmp/instagram-feed.json')
      .then(data => {
        return data.toString();
      })
      .catch(async () => {
        return await strapi.plugins['instagram-feed'].services.instagramfeed.fetchInstagramFeed();
      });
  }
}
