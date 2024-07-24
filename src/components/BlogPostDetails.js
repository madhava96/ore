import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BlogPostDetails.module.css'; // Import CSS module

const apiKey = '0e6bf687072b484484e4c822c5c9a2c5'; // Replace with your actual API key

const BlogPostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://newsapi.org/v2/everything?q=${id}&apiKey=${apiKey}`);
        setPost(res.data.articles[0]);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  const publishedDate = new Date(post.publishedAt).toLocaleDateString();

  return (
    <div className={`${styles.container} ${styles.blogPostDetails}`}>
      <h1>{post.title}</h1>
      <img src={post.urlToImage} alt={post.title} className={styles.img} />
      <p className={styles.date}>Published on: {publishedDate}</p>
      <p>{post.content}</p>
      <button onClick={() => navigate(-1)} className={styles.button}>Back</button>
    </div>
  );
};

export default BlogPostDetails;
