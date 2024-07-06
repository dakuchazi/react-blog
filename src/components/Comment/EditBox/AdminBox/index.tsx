import { useKeyPress, useSafeState } from "ahooks";
import { message } from "antd";
import classNames from "classnames";
import React, { useRef } from "react";
import { myAvatar, myEmail, myKey, myLink, myName } from "@/utils/constant";
import axios from "@/utils/axios";
import API from "@/utils/api";
import { useAppDispatch } from "@/store";
import {
  setAvatar,
  setEmail,
  setName,
  setRole,
  setWebsite,
} from "@/store/slices/userInfoSlice";

import s from "./index.scss";

interface Props {
  showAdmin?: boolean;
  setShowAdmin?: Function;
}

const AdminBox: React.FC<Props> = ({ showAdmin = false, setShowAdmin }) => {
  const pwdRef = useRef(null);
  const dispatch = useAppDispatch();
  const [adminEmail, setAdminEmail] = useSafeState("");
  const [adminPwd, setAdminPwd] = useSafeState("");

  const hideAdmin = () => {
    setShowAdmin?.(false);
    setAdminEmail("");
    setAdminPwd("");
  };

  const adminLogin = async () => {
    const res: any = await axios.post(API.loginApi, {
      username: adminEmail,
      password: adminPwd,
    });
    if (res.code === "200") {
      message.success("登录成功");
      dispatch(setName(myName));
      dispatch(setEmail(myEmail));
      dispatch(setRole(myKey));
      dispatch(setAvatar(myAvatar));
      dispatch(setWebsite(myLink));
      hideAdmin();
    } else {
      message.error("登录失败");
    }
  };

  useKeyPress(13, adminLogin, {
    target: pwdRef,
  });

  return (
    <div className={classNames(s.adminBox, { [s.showAdmin]: showAdmin })}>
      <div className={s.itemBox}>
        <div className={s.adminKey}>邮箱</div>
        <input
          type="text"
          className={s.adminValue}
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
        />
      </div>
      <div className={s.itemBox}>
        <div className={s.adminKey}>密码</div>
        <input
          ref={pwdRef}
          type="password"
          className={s.adminValue}
          value={adminPwd}
          onChange={(e) => setAdminPwd(e.target.value)}
        />
      </div>
      <div className={classNames(s.itemBox, s.adminBtns)}>
        <div className={s.adminBtn} onClick={hideAdmin}>
          取消
        </div>
        <div className={s.adminBtn} onClick={adminLogin}>
          登录
        </div>
      </div>
    </div>
  );
};

export default AdminBox;
