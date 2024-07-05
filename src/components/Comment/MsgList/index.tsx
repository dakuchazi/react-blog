import React from "react";
import MsgItem from "./MsgItem";
import LayoutLoading from "@/components/LayoutLoading";
import s from "./index.scss";

type Comment = {
  _id: string;
  createDate: string;
  content: string;
  email: string;
  website: string;
  name: string;
  avatar: string;
  children?: Comment[];
  from: string;
};

interface Props {
  data?: Comment[];
  loading: boolean;
  from: string;
}

const MsgList: React.FC<Props> = ({ data, loading, from }) => {
  return (
    <>
      {loading ? (
        <LayoutLoading />
      ) : (
        data?.map((msg) => {
          return (
            <div key={msg._id} className={s.completeMsg}>
              <MsgItem
                _id={msg._id}
                link={msg.website}
                name={msg.name}
                date={msg.createDate}
                content={msg.content}
                email={msg.email}
                avatar={msg.avatar}
                from={from}
              />
              {msg?.children &&
                msg.children.map((reply: Comment) => (
                  <MsgItem
                    key={reply._id}
                    _id={reply._id}
                    link={reply.website}
                    name={reply.name}
                    date={reply.createDate}
                    content={reply.content}
                    email={reply.email}
                    avatar={reply.avatar}
                    isReply={true}
                    from={from}
                  />
                ))}
            </div>
          );
        })
      )}
    </>
  );
};

export default MsgList;
