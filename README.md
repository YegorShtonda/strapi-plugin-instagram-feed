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
    fields: {
      shortcode: true,
      owner_id: true,
      date: true,
      comment_count: true,
      like_count: true,
      is_video: true,
      text: true,
      display_url: true,
      thumbnail: true,
      thumbnail_150x150: true,
      thumbnail_240x240: true,
      thumbnail_320x320: true,
      thumbnail_480x480: true,
      thumbnail_640x640: true
    }
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
    strapi.plugins['instagram-feed'].services['instagram-feed'].fetchInstagramFeed();
  }
};
```

### Exemple output
```json
[
  {
    "shortcode": "CCq1D_cMYMF",
    "owner_id": "25025320",
    "date": "2020-07-15T16:20:02.000Z",
    "comment_count": 11924,
    "like_count": 1265280,
    "is_video": false,
    "text": "“My work is a form of play. It’s a way to lose myself in the landscape, to integrate more deeply with something bigger,” says artist Benjamin Everett (@bejamin). Benjamin constructs his painterly photographic landscapes from multiple images, and often many locations, from his travels around the world.⁣ ☁️⁣ “In the case of clouds, I may see a particular billowing curve or interesting shadowed shape. The cloud in this image is a combination of five or six individual cloud parts.” Overall, this image was made from 20 individual photos.⁣ ☁️⁣ “My favorite part of making art is the moment when the image seems to take over and I’m along for the ride. It’s like climbing or surfing. You know what mountain you’re on, or what kind of wave you’ve caught, but never too certain how it will turn out. Sometimes I don’t want the process to end because I don’t want the adventure to be over.”⁣ ☁️⁣ #ThisWeekOnInstagram⁣ ⁣ Photo illustration by @bejamin",
    "display_url": "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/108328143_173046760861295_8394639393927238253_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=e3DAn_I5uFMAX9JosyS&oh=bc89a2f0612a67f2761fec04f09bb60e&oe=5F396F7A",
    "thumbnail": "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.169.1349.1349a/s640x640/108328143_173046760861295_8394639393927238253_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=e3DAn_I5uFMAX9JosyS&oh=3fb799bae83d74fe394ffccb9700b57c&oe=5F38954E",
    "thumbnail_150x150": "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-15/e35/c0.169.1349.1349a/s150x150/108328143_173046760861295_8394639393927238253_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=e3DAn_I5uFMAX9JosyS&oh=2c1e0d0d31e7af8bd21d8da27838f94e&oe=5F3ADDFE",
    "thumbnail_240x240": "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-15/e35/c0.169.1349.1349a/s240x240/108328143_173046760861295_8394639393927238253_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=e3DAn_I5uFMAX9JosyS&oh=50112bdcf581d9700a3f33ebac5f1482&oe=5F3A9A7C",
    "thumbnail_320x320": "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-15/e35/c0.169.1349.1349a/s320x320/108328143_173046760861295_8394639393927238253_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=e3DAn_I5uFMAX9JosyS&oh=43006e2b3155f753b6f4b02c4ebd9205&oe=5F384806",
    "thumbnail_480x480": "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-15/e35/c0.169.1349.1349a/s480x480/108328143_173046760861295_8394639393927238253_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=e3DAn_I5uFMAX9JosyS&oh=2843a9778e7fd2050eb7f5815ad80550&oe=5F3949C3",
    "thumbnail_640x640": "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.169.1349.1349a/s640x640/108328143_173046760861295_8394639393927238253_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=e3DAn_I5uFMAX9JosyS&oh=3fb799bae83d74fe394ffccb9700b57c&oe=5F38954E"
  }
]
```
