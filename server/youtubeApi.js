import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

export const fetchVideList = async () => {
  const res = await youtube.videos.list({
    part: ['snippet,contentDetails,statistics'],
    chart: 'mostPopular',
    regionCode: 'IN',
    maxResults: 50,
  });
  console.log('DDD =>', res);
  if (res.data) {
    return res.data.items;
  } else {
    return false;
  }
};

export const fetchChannelDetail = async (id) => {
  const res = await youtube.channels.list({
    part: ['snippet,contentDetails,statistics'],
    id: [id],
  });
  if (res.data) {
    return res.data.items[0];
  } else {
    return false;
  }
};
