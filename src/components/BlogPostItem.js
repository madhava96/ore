import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogPostItem.module.css'; // Import CSS module

const BlogPostItem = ({ post }) => {
  return (
    <div className={styles.blogPostItem}>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <Link to={`/post/${post.title}`} className={styles.link}>Read More</Link>
    </div>
  );
};

export default BlogPostItem;
