import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPostItem from './BlogPostItem';
import styles from './BlogPostList.module.css'; // Import CSS module

const apiKey = '0e6bf687072b484484e4c822c5c9a2c5'; // Replace with your actual API key

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`https://newsapi.org/v2/everything?q=blog&apiKey=${apiKey}&page=${page}&pageSize=10`);
        setPosts(res.data.articles);
        setTotalPages(Math.ceil(res.data.totalResults / 10));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [page]);

  return (
    <div className={styles.container}>
      <div className={styles.blogPostList}>
        {posts.map((post, index) => (
          <BlogPostItem key={index} post={post} />
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default BlogPostList;

