import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { userInstance } from '../../axios/axios';
import './listing.css';

const ListingDetail = () => {
  const [videoDetails, setVideoDetails] = useState();
  const [list, setList] = useState([]);

  const fetchDetails = async (videoId) => {
    const res = await userInstance.post('/getVideoDetails', { videoId });
    if (res.data.code === 200) {
      setVideoDetails(res.data.videoDetails);
      setList(res.data.lists);
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('v');
    if (videoId) {
      fetchDetails(videoId);
    }
  }, []);

  const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + ' years';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' months';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' days';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' hours';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' minutes';
    }
    return Math.floor(seconds) + ' seconds';
  };

  const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(2) + 'K'; // convert to K for number from > 1000 < 1 million
    } else if (num >= 1000000 && num < 1000000000) {
      return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
    } else if (num >= 100000000 && num < 1000000000000) {
      return (num / 100000000).toFixed(2) + 'B';
    } else if (num >= 1000000000000)
      return (num / 1000000000000).toFixed(2) + 'T';
    else return num; // if value < 1000, nothing to do
  };

  const handleVideoDetails = (id) => {
    window.location.href = `/detail?v=${id}`;
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='listing-detail-page'>
            <div className='detail-page-section'>
              <div className='left-section'>
                <div className='video-section'>
                  <ReactPlayer
                    url={videoDetails && videoDetails.link}
                    controls
                  />
                  {/* <h5>#1 ON TRENDING FOR MUSIC</h5> */}
                  <h4>{videoDetails && videoDetails.title}</h4>
                  <div className='bottomtext'>
                    <p>
                      {numFormatter(
                        videoDetails && videoDetails.statistics.viewCount
                      )}{' '}
                      Views,
                      {timeSince(
                        new Date(videoDetails && videoDetails.publishedAt)
                      )}
                    </p>
                    <div className='like-section'>
                      <span>
                        {numFormatter(
                          videoDetails && videoDetails.statistics.likeCount
                        )}{' '}
                        likes
                      </span>
                      <span>
                        {numFormatter(
                          videoDetails && videoDetails.statistics.dislikeCount
                        )}{' '}
                        dislikes
                      </span>
                    </div>
                  </div>
                </div>
                <div className='channel-section'>
                  <img
                    src={videoDetails && videoDetails.channel.thumbnails[2].url}
                    height='50'
                    width='50'
                    alt='channel-thumbnail'
                  />
                  <div className='channel-name'>
                    <h6>{videoDetails && videoDetails.channel.title}</h6>
                    <span>
                      {numFormatter(
                        videoDetails &&
                          videoDetails.channel.statistics.subscriberCount
                      )}
                      {'  '}
                      <small> &nbsp;subscribers</small>
                    </span>
                    <p>{videoDetails && videoDetails.description}</p>
                  </div>
                </div>
              </div>
              <div className='right-section'>
                <div className='list-view-section'>
                  {list && list.length !== 0 ? (
                    list.map((item, i) => (
                      <div
                        className='listing-box-list-view'
                        key={item._id}
                        onClick={() => handleVideoDetails(item.videoId)}
                      >
                        <div className='listing-img'>
                          <img src={item.thumbnails[2].url} alt='image1' />
                        </div>
                        <div className='listing-content'>
                          <h6>{item.title}</h6>
                          <p>
                            <span>{item.channel && item.channel.title}</span> .{' '}
                            <span>
                              {numFormatter(item.statistics.viewCount)} Views
                            </span>{' '}
                            <span>{timeSince(new Date(item.publishedAt))}</span>
                          </p>
                          <p>
                            {item.description.length > 100
                              ? item.description.substring(0, 100) + '...'
                              : item.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No records</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListingDetail;
