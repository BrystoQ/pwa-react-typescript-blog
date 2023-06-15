import React from "react";
import { Link } from "react-router-dom";

interface ArticleProps {
  id: number;
  title: string;
  body: string;
}

interface ArticleCardProps {
  article: ArticleProps;
}

const ArticleCard: React.FC<ArticleCardProps> = (props) => {
  const { title, body, id } = props.article;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{body.substring(0, 100)}</p>
        <Link to={`/articles/${id}`} className="btn btn-primary">
          Lire la suite
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
