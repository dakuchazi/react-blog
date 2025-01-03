import "./index.custom.scss";
import { MenuFoldOutlined } from "@ant-design/icons";
import { useBoolean } from "ahooks";
import { Drawer } from "antd";
import classNames from "classnames";
import MarkNav from "markdown-navbar";
import React from "react";
import { useAppDispatch } from "@/store";
import { setNavShow } from "@/store/slices/layoutSlice";

import s from "./index.scss";

interface Props {
  content?: string;
}

const Navbar: React.FC<Props> = ({ content }) => {
  const dispatch = useAppDispatch();
  const [visible, { setTrue: openDrawer, setFalse: closeDrawer }] =
    useBoolean(false);

  return (
    <>
      {/* 正常的目录 */}
      <MarkNav
        className={classNames("postNavBar", s.navBar)}
        source={content || ""}
        headingTopOffset={15}
        ordered={false}
        updateHashAuto={false}
        onNavItemClick={() => {
          console.log("===123123===");

          dispatch(setNavShow(false));
        }}
      />
      {/* 中屏显示的按钮 */}
      <div className={s.hoverBar} onClick={openDrawer}>
        <MenuFoldOutlined />
      </div>
      {/* 中屏抽屉 */}
      <Drawer
        placement="right"
        onClose={closeDrawer}
        visible={visible}
        className={classNames(s.drawer, "mobile-navBar-box")}
        width={340}
      >
        <MarkNav
          className="postNavBar"
          source={content || ""}
          headingTopOffset={15 + 60}
          ordered={false}
          updateHashAuto={false}
          onNavItemClick={() => dispatch(setNavShow(true))}
        />
      </Drawer>
    </>
  );
};

export default Navbar;
