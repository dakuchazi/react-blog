import React, { useState } from "react";
import MyPagination from "../MyPagination";
import Divider from "./Divider";
import EditBox from "./EditBox";
import MsgList from "./MsgList";
import Placehold from "./Placehold";

interface Props {
  autoScroll?: boolean;
  scrollToTop?: number;
  current: number;
  data: any;
  loading: boolean;
  isMsg: boolean;
  setPage: Function;
  from: string;
}

const Comment: React.FC<Props> = ({
  current,
  autoScroll = false,
  scrollToTop = 0,
  data,
  loading,
  isMsg,
  setPage,
  from,
}) => {
  return (
    <div>
      <Divider />
      <EditBox isReply={false} from={from} />
      <Placehold msgCount={data.total} isMsg={isMsg} />
      <MsgList data={data.list} loading={loading} from={from} />
      <MyPagination
        current={current}
        defaultPageSize={10}
        total={data.total}
        setPage={setPage}
        autoScroll={autoScroll}
        scrollToTop={scrollToTop}
      />
    </div>
  );
};

export default Comment;
