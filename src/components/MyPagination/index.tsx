import "./pagination.custom.scss";
import { Pagination } from "antd";
import React from "react";
import { useAppDispatch } from "@/store";

import s from "./index.scss";

interface Props {
  current?: number;
  defaultPageSize?: number;
  total?: number;
  setPage?: Function;
  scrollToTop?: number;
  autoScroll?: boolean;
}

const MyPagination: React.FC<Props> = ({
  current,
  defaultPageSize = 8,
  total = 0,
  setPage,
  scrollToTop = 0,
  autoScroll = false,
}) => {
  return (
    <>
      {total > defaultPageSize ? (
        <div id="myPagination" className={s.pageBox}>
          <Pagination
            current={current}
            total={total}
            defaultPageSize={defaultPageSize}
            showSizeChanger={false}
            showTitle={false}
            onChange={(page: number) => {
              setPage?.(page);
              autoScroll && window.scrollTo(0, scrollToTop);
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export default MyPagination;
