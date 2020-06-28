# strapi-plugin-instagram-feed

## Installation

```
$ npm i strapi-plugin-instagram-feed
```
or
```
$ yarn add strapi-plugin-instagram-feed
```

## Configurations

### Base config

`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  'instagram-feed': {
    username: 'instagram',
    count: 4,
    isText: true,
    isThumbnails: true,
  },
});
```

### Cron

Enable cron.

`./config/server.js`
```js
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron: { enabled: true },
});
```

Add cron job for Instagram Feed.

`./config/functions/cron.js`
```js
module.exports = {
  // At every 30th minute.
  '*/30 * * * *': () => {
    strapi.plugins['instagram-feed'].services.instagramfeed.fetchInstagramFeed();
  }
};
```

### Exemple output
```json
[
    {
        media_id: "2340988290610601675",
        shortcode: "CB83HJ9MZ7L",
        text: "Here are the faces of #Pride. Bold, bright and beautiful. 🌈💋✨⁣ ⁣ Meet @pradaolic, @watoniki, @sgairewood and @hibiscussseater. These LGBTQ+ makeup artists from around the world created new looks that represent how they #ShareWithPride, this June and beyond.⁣ ⁣ “I #ShareWithPride by recognizing the Black and brown queer folks who fought for LGBTQIA+ rights to this day,” says 19-year-old Myla (@pradaolic). “And also by unapologetically being myself and doing things that make me happy.⁣ ⁣ See how all these Pride looks were created and learn more about each makeup artist, right now on our story and IGTV.⁣ ⁣ Photos by @pradaolic, @watoniki, @sgairewood and @hibiscussseater",
        comment_count: 6479,
        like_count: 445700,
        display_url: "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/105968638_711749393004488_7206447664559054522_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=bjTyKN-cQ4QAX8dtquO&oh=53e548dc4cfbcd32a67592f5b44661c0&oe=5F23BCC7",
        owner_id: "25025320",
        date: 1593287572,
        thumbnail: "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.180.1440.1440a/s640x640/105968638_711749393004488_7206447664559054522_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=bjTyKN-cQ4QAX8dtquO&oh=7b139b9aeeffe7e3f1894f9736791af3&oe=5F23DBE3",
        thumbnail_resource: [
            {
                src: "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-15/e35/c0.180.1440.1440a/s150x150/105968638_711749393004488_7206447664559054522_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=bjTyKN-cQ4QAX8dtquO&oh=b27885127d5d76f59e8e54da014ac5dc&oe=5F21B253",
                config_width: 150,
                config_height: 150
            },
            {
                src: "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-15/e35/c0.180.1440.1440a/s240x240/105968638_711749393004488_7206447664559054522_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=bjTyKN-cQ4QAX8dtquO&oh=cb4ffff3064d77abac1160122df02fa5&oe=5F217B55",
                config_width: 240,
                config_height: 240
            },
            {
                src: "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-15/e35/c0.180.1440.1440a/s320x320/105968638_711749393004488_7206447664559054522_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=bjTyKN-cQ4QAX8dtquO&oh=c2b42530c726bfdbc48637381c025b9c&oe=5F21372B",
                config_width: 320,
                config_height: 320
            },
            {
                src: "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-15/e35/c0.180.1440.1440a/s480x480/105968638_711749393004488_7206447664559054522_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=bjTyKN-cQ4QAX8dtquO&oh=cbd4e0bcfd648f518a87794f3f1671cd&oe=5F2212EE",
                config_width: 480,
                config_height: 480
            },
            {
                src: "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.180.1440.1440a/s640x640/105968638_711749393004488_7206447664559054522_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=bjTyKN-cQ4QAX8dtquO&oh=7b139b9aeeffe7e3f1894f9736791af3&oe=5F23DBE3",
                config_width: 640,
                config_height: 640
            }
        ],
        is_video: false
    }
]
```