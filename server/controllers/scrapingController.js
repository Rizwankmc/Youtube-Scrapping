import Channel from '../modals/channels.js';
import TrendingVideo from '../modals/trendingVideo.js';
import { fetchChannelDetail, fetchVideList } from '../youtubeApi.js';

export const fetchUpdatedList = async (req, res) => {
  try {
    let isSuccess = false;
    const list = await fetchVideList();
    for (let item of list) {
      const channelDetails = await fetchChannelDetail(item.snippet.channelId);
      const {
        snippet: {
          publishedAt,
          title,
          description,
          customUrl,
          thumbnails,
          country,
        },
        id,
        statistics,
      } = channelDetails;
      const isChannelAdded = await Channel.findOne({ channelId: id });
      let channel;
      if (isChannelAdded)
        channel = await Channel.findOneAndUpdate(
          { channelId: id },
          {
            title,
            description,
            link: customUrl,
            publishedAt,
            statistics,
            thumbnails: Object.values(thumbnails),
            channelId: id,
            country,
          },
          { new: true }
        );
      else
        channel = await Channel.create({
          title,
          description,
          link: customUrl,
          publishedAt,
          statistics,
          thumbnails: Object.values(thumbnails),
          channelId: id,
          country,
        });
      if (channel) {
        let video;
        const isVideo = await TrendingVideo.findOne({ videoId: item.id });
        if (isVideo) {
          video = await TrendingVideo.findOneAndUpdate(
            { videoId: item.id },
            {
              title: item.snippet.title,
              publishedAt: item.snippet.publishedAt,
              description: item.snippet.description,
              thumbnails: Object.values(item.snippet.thumbnails),
              videoId: item.id,
              statistics: item.statistics,
              contentDetails: item.contentDetails,
              link: `https://www.youtube.com/watch?v=${item.id}`,
              channel: channel._id,
            },
            { new: true }
          );
        } else {
          video = await TrendingVideo.create({
            title: item.snippet.title,
            publishedAt: item.snippet.publishedAt,
            description: item.snippet.description,
            thumbnails: Object.values(item.snippet.thumbnails),
            videoId: item.id,
            statistics: item.statistics,
            contentDetails: item.contentDetails,
            link: `https://www.youtube.com/watch?v=${item.id}`,
            channel: channel._id,
          });
        }
        if (video) {
          isSuccess = true;
        } else {
          isSuccess = false;
        }
      }
    }

    if (isSuccess) {
      const list = await TrendingVideo.find({})
        .sort({ 'statistics.viewCount': -1 })
        .populate({ path: 'channel' });
      res.send({ code: 200, message: 'Success', list: list });
    } else {
      res.send({ code: 400, message: 'Fail' });
    }
  } catch (err) {
    console.error(err);
    res.send({ code: 500, message: ' Internal Server Error' });
  }
};

export const fetchListFromDB = async (req, res) => {
  try {
    const list = await TrendingVideo.find({})
      .sort({ 'statistics.viewCount': -1 })
      .populate({ path: 'channel' })
      .limit(50);
    if (list) res.send({ code: 200, message: 'Success', list: list });
    else res.send({ code: 400, message: 'Fail' });
  } catch (err) {
    console.error(err);
    res.send({ code: 500, message: ' Internal Server Error' });
  }
};

export const fetchVideoDetails = async (req, res) => {
  try {
    const { videoId } = req.body;
    const list = await TrendingVideo.findOne({ videoId }).populate({
      path: 'channel',
    });
    const listing = await TrendingVideo.find({ videoId: { $ne: videoId } })
      .sort({ 'statistics.viewCount': -1 })
      .populate({ path: 'channel' })
      .limit(7);
    if (list)
      res.send({
        code: 200,
        message: 'Success',
        videoDetails: list,
        lists: listing,
      });
    else res.send({ code: 404, message: 'Not Found' });
  } catch (err) {
    console.error(err);
    res.send({ code: 500, message: ' Internal Server Error' });
  }
};
