import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { userInstance } from '../../axios/axios';
import './listing.css';

const Listing = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetchList = async () => {
    setLoading(true);
    const res = await userInstance.get('/listing');
    setLoading(false);
    if (res.data.code === 200) {
      setList(res.data.list);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleNewUpdate = async () => {
    setLoading(true);
    const res = await userInstance.get('/updatedListing');
    setLoading(false);
    if (res.data.code === 200) {
      setList(res.data.list);
    }
  };

  const handleVideoDetails = (id) => {
    window.location.href = `/detail?v=${id}`;
  };

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
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='listing-page'>
            <h4 className='mb-5'>Trending List </h4>
            <div className='update-btn'>
              <Button onClick={handleNewUpdate}>Update List</Button>
            </div>
            {loading ? (
              <Spinner animation='border' />
            ) : (
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
                          {item.description.length > 180
                            ? item.description.substring(0, 180) + '...'
                            : item.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No records</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Listing;
