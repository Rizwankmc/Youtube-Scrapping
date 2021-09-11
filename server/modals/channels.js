import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    link: {
      type: String,
    },
    thumbnails: [
      {
        type: Object,
      },
    ],
    statistics: {
      viewCount: {
        type: String,
      },
      subscriberCount: {
        type: String,
      },
      commentCount: {
        type: String,
      },
      hiddenSubscriberCount: {
        type: String,
      },
      videoCount: {
        type: String,
      },
    },
    publishedAt: {
      type: String,
    },
    channelId: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { timestamp: true }
);

const Channel = mongoose.model('Channel', schema);
export default Channel;
