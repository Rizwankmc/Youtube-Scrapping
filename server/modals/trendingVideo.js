import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    videoId: {
      type: String,
    },
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
    contentDetails: {
      duration: {
        type: String,
      },
      dimension: {
        type: String,
      },
      definition: {
        type: String,
      },
      caption: {
        type: String,
      },
      licensedContent: {
        type: Boolean,
      },
      projection: {
        type: String,
      },
    },
    statistics: {
      viewCount: {
        type: String,
      },
      likeCount: {
        type: String,
      },
      dislikeCount: {
        type: String,
      },
      favoriteCount: {
        type: String,
      },
      commentCount: {
        type: String,
      },
    },
    publishedAt: {
      type: String,
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
    },
  },
  { timestamp: true }
);

const TrendingVideo = mongoose.model('TrendingVideo', schema);
export default TrendingVideo;
