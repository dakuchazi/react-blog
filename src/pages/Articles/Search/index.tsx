import { ArrowRightOutlined, RedoOutlined } from "@ant-design/icons";
import { useKeyPress } from "ahooks";
import React, { useRef } from "react";

import s from "./index.scss";

interface Props {
  value: string;
  onSearch: Function;
  onChange: Function;
}

const Search: React.FC<Props> = ({ value, onSearch, onChange }) => {
  const inputRef = useRef(null);
  useKeyPress(13, () => onSearch(), {
    target: inputRef,
  });
  useKeyPress(27, () => onChange(""), {
    target: inputRef,
  });

  return (
    <div className={s.searchBox}>
      <input
        ref={inputRef}
        autoFocus
        type="text"
        placeholder="搜索文章标题..."
        className={s.search}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {/* 搜索按钮 */}
      <div className={s.searchBtn} onClick={() => onSearch()}>
        <ArrowRightOutlined />
      </div>
      {/* 重置按钮 */}
      <div className={s.searchBtn} onClick={() => onChange("")}>
        <RedoOutlined />
      </div>
    </div>
  );
};

export default Search;
