import React from "react";

import s from "./index.scss";

interface Props {
  tags: string[];
}

const ArtTags: React.FC<Props> = ({ tags }) => {
  return (
    <div className={s.articleTags}>
      {tags.length &&
        tags.map((item, index) => (
          <span className={s.articleTag} key={index}>
            {item}
          </span>
        ))}
    </div>
  );
};

export default ArtTags;
