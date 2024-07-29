import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsByCategory } from '../services/Api';

const NewsDetail = () => {
    const { category, link } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
      };

    useEffect(() => {
      const fetchNewsDetail = async () => {
        try {
          const decodedLink = decodeURIComponent(link); // Decode the link
          const allPosts = await getNewsByCategory(category);
          const selectedPost = allPosts.find(post => post.link.endsWith(decodedLink));
          setNewsItem(selectedPost);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching news detail:', error);
          setLoading(false);
        }
      };
  
      fetchNewsDetail();
    }, [category, link]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!newsItem) {
      return <div>News not found</div>;
    }
  
    return (
      <div>
        <h1>{newsItem.title}</h1>
        <p>{newsItem.description}</p>
        <img src={newsItem.thumbnail} alt={newsItem.title} />
        <p><i className="bi bi-calendar-event"></i> {formatDate(newsItem.pubDate)}</p>
        <a href={newsItem.link} target="_blank" rel="noopener noreferrer">Baca Selengkapnya</a>
      </div>
    );
  };
  
  export default NewsDetail;
