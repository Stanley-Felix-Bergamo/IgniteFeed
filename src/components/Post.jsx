import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { useState } from "react";

export const Post = ({ author, publishedAt, content }) => {
  const [comments, setCommets] = useState(["Post muito bom, hein?!"]);
  const [newCommentText, setnewCommentText] = useState("");

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBr,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true,
  });

  const handleCreateNewComment = () => {
    event.preventDefault();
    setCommets([...comments, newCommentText]);
    setnewCommentText("");
  };

  const handleNewCommentChange = () => {
    event.target.setCustomValidity("");
    setnewCommentText(event.target.value);
  };

  const deleteComment = (commentToDelete) => {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });
    setCommets(commentsWithoutDeletedOne);
  };

  const handleNewCommentInvalid = () => {
    event.target.setCustomValidity("Esse campo é obrigátorio !");
  };

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          required
          value={newCommentText}
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((commet) => {
          return (
            <Comment
              key={commet}
              content={commet}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
};
