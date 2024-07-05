import { UserOutlined } from "@ant-design/icons";
import {
  useBoolean,
  useKeyPress,
  useMount,
  useRequest,
  useSafeState,
} from "ahooks";
import { message } from "antd";
import classNames from "classnames";
import React, { useRef } from "react";
import { myAvatar70, myEmail, myLink, myName, QQ } from "@/utils/constant";
import AdminBox from "./AdminBox";
import Emoji from "./Emoji";
import PreShow from "./PreShow";
import axios from "@/utils/apis/axios";
import API from "@/utils/api";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectUserInfo,
  setAvatar,
  setEmail,
  setName,
  setWebsite,
} from "@/store/slices/userInfoSlice";
import { getCommentListAsync } from "@/store/slices/commentSlice";

import s from "./index.scss";
import { useSearchParams } from "react-router-dom";

interface Props {
  isReply?: boolean;
  replyName?: string;
  closeReply?: Function;
  className?: string;
  replyId?: string;
  from: string;
  pid?: string;
  artId?: string;
}

type AddMsgParams = {
  name: string;
  website: string;
  email: string;
  avatar: string;
  pid?: string;
  from: string;
  content: string;
  artId?: string;
};

const EditBox: React.FC<Props> = ({
  isReply,
  replyName,
  closeReply,
  className,
  from,
  replyId,
}) => {
  const nameRef = useRef(null);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const [showAdmin, setShowAdmin] = useSafeState(false);
  const [showPre, { toggle: togglePre, setFalse: closePre }] =
    useBoolean(false);
  const [text, setText] = useSafeState("");
  const artId = searchParams.get("artId");

  const { loading: addCommentloading, run: addCommentRun } = useRequest(
    async (params: AddMsgParams) => {
      const res: any = await axios.post(API.addCommentApi, params);
      return res;
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === "200") {
          message.success((isReply ? "回复" : "发布") + "成功");
          if (artId) {
            dispatch(
              getCommentListAsync({ pagesize: 10, current: 1, from, artId })
            );
          }
          dispatch(getCommentListAsync({ pagesize: 10, current: 1, from }));
        }
      },
    }
  );
  const validateConfig = {
    name: {
      check: /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,8}$/,
      content: userInfo.name,
      errText: "昵称仅限中文、数字、字母，长度2~8！",
    },
    email: {
      check: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
      content: userInfo.email,
      errText: "请输入正确的邮箱地址！",
    },
    link: {
      check: /^$|^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,
      content: userInfo.website,
      errText: "请输入正确的url，或不填！",
    },
    text: {
      check: /^[\s\S]*.*[^\s][\s\S]*$/,
      content: text,
      errText: "请输入内容再发布~",
    },
  };

  const validate = () => {
    Object.keys(validateConfig).forEach((item) => {
      const { check, errText, content } =
        validateConfig[item as keyof typeof validateConfig];
      if (!check.test(content!)) {
        message.error(errText);
        throw new Error("breakForEach");
      }
    });
  };

  const checkAdmin = () => {
    if (
      userInfo.role !== "cdbb" &&
      (userInfo.name === myName ||
        userInfo.name === QQ ||
        userInfo.email === myEmail ||
        userInfo.website?.indexOf(myLink) !== -1)
    ) {
      message.warning("未登录不可以使用管理员账户（昵称、邮箱、网址）哦~");
      throw new Error("Not Admin");
    }
  };

  const submit = async () => {
    validate();
    checkAdmin();

    const parmas: AddMsgParams = {
      name: userInfo.name,
      website: userInfo.website,
      email: userInfo.email,
      avatar: userInfo.avatar,
      content: text,
      from: from,
    };
    if (replyId) {
      parmas.pid = replyId;
    }
    if (artId) {
      parmas.artId = artId;
    }
    addCommentRun(parmas);
  };

  useMount(() => {
    if (userInfo.role === "cdbb") {
      // 管理员已登录
      dispatch(setName(myName));
      dispatch(setEmail(myEmail));
      dispatch(setWebsite(myLink));
      dispatch(setAvatar(myAvatar70));
      return;
    }
  });

  const handleName = () => {
    const regQQ = /[1-9][0-9]{4,11}/;
    if (userInfo.name === "admin") {
      setShowAdmin(true);
      dispatch(setName(""));
      return;
    }
    if (
      userInfo.role !== "cdbb" &&
      (userInfo.name === myName || userInfo.name === QQ)
    ) {
      message.warning("未登录不可以使用管理员账户哦~");
      dispatch(setName(""));
      return;
    }
    if (regQQ.test(userInfo.name!)) {
      const avatarUrl = `https://q1.qlogo.cn/g?b=qq&nk=${userInfo.name}&s=100`;
      const QQEmail = `${userInfo.name}@qq.com`;
      dispatch(setName(""));
      dispatch(setEmail(QQEmail));
      dispatch(setAvatar(avatarUrl));
      return;
    }
  };

  useKeyPress(13, handleName, {
    target: nameRef,
  });

  const openPreShow = () => {
    if (!showPre && !text) {
      message.info("请写点什么再预览~");
      return;
    }
    togglePre();
  };

  const handleCloseReply = () => {
    closeReply?.();
  };

  return (
    <div className={classNames(s.editBox, className)}>
      {isReply && (
        <div className={s.replyNameBox}>
          回复给「<span>{replyName}</span>」：
        </div>
      )}
      <div className={s.flex}>
        <AdminBox showAdmin={showAdmin} setShowAdmin={setShowAdmin} />

        <div className={s.avatarBoxCol}>
          <div className={s.avatarBox}>
            {userInfo.avatar ? (
              <img src={userInfo.avatar} className={s.editAvatar} />
            ) : (
              <UserOutlined className={s.noAvatar} />
            )}
          </div>
        </div>
        <div className={s.editInputBox}>
          <div className={s.inputBox}>
            <div className={classNames(s.inputInfo, s.flex2)}>
              <div className={s.inputKey}>昵称</div>
              <input
                ref={nameRef}
                type="text"
                className={s.inputValue}
                placeholder="QQ号"
                value={userInfo.name}
                onChange={(e) => dispatch(setName(e.target.value))}
                onBlur={handleName}
              />
            </div>
            <div className={classNames(s.inputInfo, s.flex3)}>
              <div className={s.inputKey}>邮箱</div>
              <input
                type="text"
                className={s.inputValue}
                placeholder="必填"
                value={userInfo.email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
              />
            </div>
            <div className={classNames(s.inputInfo, s.flex3)}>
              <div className={s.inputKey}>网址</div>
              <input
                type="text"
                className={s.inputValue}
                placeholder="选填"
                value={userInfo.website}
                onChange={(e) => dispatch(setWebsite(e.target.value))}
              />
            </div>
          </div>

          <div className={s.textareaBox}>
            <textarea
              className={s.textarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="写点什么吗？支持markdown格式！&#10;可以在「昵称」处填写QQ号，自动获取「头像」和「QQ邮箱」！"
            />
          </div>
          <div className={s.commentBtns}>
            <Emoji />
            {isReply && (
              <div className={s.cancelBtn} onClick={handleCloseReply}>
                取消
              </div>
            )}
            <div className={s.previewBtn} onClick={openPreShow}>
              预览
            </div>
            <div className={s.sendBtn} onClick={submit}>
              {isReply ? "回复" : " 发布"}
            </div>
          </div>
        </div>
      </div>
      <PreShow
        closePre={closePre}
        content={text}
        className={classNames({ [s.preShowHidden]: !showPre })}
      />
    </div>
  );
};

export default EditBox;
