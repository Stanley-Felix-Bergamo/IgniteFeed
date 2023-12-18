import { Trash } from "@phosphor-icons/react";
import { ThumbsUp } from "@phosphor-icons/react/dist/ssr";
import styles from "./Comment.module.css";
import { Avatar } from "./Avatar";
import { useState } from "react";

export const Comment = ({ content, onDeleteComment }) => {
  const [likeCount, setLikeCount] = useState(0);

  const handleDeleteComment = () => {
    console.log("Deletar");
    onDeleteComment(content);
  };

  const handleLikeComment = () => {
    setLikeCount((state) => {
      return state + 1;
    });
  };

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/diego3g.png" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Diego Fernandes</strong>
              <time
                title="05 de Dezembro às 13:00"
                dateTime="2023-05-12 13:00:00"
              >
                Cerca de 3h atrás
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={20} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
