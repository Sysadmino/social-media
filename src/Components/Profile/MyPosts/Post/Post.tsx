import React from "react";
import styles from "./post.module.scss";

interface IPostProps {
  message: string;
  likesCount: number;
}

const Post: React.FC<IPostProps> = (props) => {
  const { message, likesCount } = props;
  return (
    <div className={styles.item}>
      <img
        alt="post"
        src="https://ohcat.ru/assets/images/img_gallery/115.jpg"
        className={styles.image}
      />
      <div className={styles.text}>{message}</div>
      <span className={styles.like}>{likesCount}</span>
    </div>
  );
};

export default Post;
