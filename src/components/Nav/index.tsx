import "./index.custom.scss";

import {
  BgColorsOutlined,
  CheckOutlined,
  HomeOutlined,
  MenuOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  useEventListener,
  useLocalStorageState,
  useSafeState,
  useUpdateEffect,
} from "ahooks";
import { Drawer } from "antd";
import classNames from "classnames";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { blogAdminUrl } from "@/utils/constant";
import { modeMap, modeMapArr } from "@/utils/modeMap";

import { useLinkList } from "./config";
import s from "./index.scss";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectMode,
  selectNavShow,
  setMode,
  setNavShow,
} from "@/store/slices/layoutSlice";

const bodyStyle = window.document.getElementsByTagName("body")[0].style;

const Nav: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const navShow = useAppSelector(selectNavShow);
  // eslint-disable-next-line no-unused-vars
  const [_, setLocalMode] = useLocalStorageState("localMode");
  const { navArr, secondNavArr, mobileNavArr } = useLinkList();
  const [visible, setVisible] = useSafeState(false);

  const modeOptions = [
    "rgb(19, 38, 36)",
    "rgb(110, 180, 214)",
    "rgb(171, 194, 208)",
  ];

  useEventListener(
    "mousewheel",
    (event) => {
      event = event || window.event;
      dispatch(setNavShow(event.wheelDeltaY > 0));
    },
    { target: document.body }
  );

  useUpdateEffect(() => {
    setLocalMode(mode);
    for (const type of modeMapArr) {
      bodyStyle.setProperty(type, modeMap[type as keyof typeof modeMap][mode!]);
    }
  }, [mode]);

  return (
    <>
      <nav className={classNames(s.nav, { [s.hiddenNav]: !navShow })}>
        <div className={s.navContent}>
          {/* 主页 */}
          <div className={s.homeBtn} onClick={() => navigate("/")}>
            <HomeOutlined />
          </div>

          {/* 后台管理 */}
          <a
            className={s.adminBtn}
            href={blogAdminUrl}
            target="_blank"
            rel="noreferrer"
          >
            <SettingOutlined />
          </a>

          {/* 黑暗模式切换 */}
          <div className={s.modeBtn}>
            <BgColorsOutlined />
            <div className={s.modeOpions}>
              {modeOptions.map((backgroundColor, index) => (
                <div
                  key={index}
                  style={{ backgroundColor }}
                  className={classNames(s.modeItem, s[`modeItem${index}`])}
                  onClick={() => {
                    dispatch(setMode(index));
                  }}
                >
                  <CheckOutlined
                    style={{ display: mode === index ? "block" : "none" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 文章单独按钮 */}
          <div className={s.articlesBtn}>
            <div className={s.articelsSecond}>
              {secondNavArr.map((item, index) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? s.sedActive : s.articelsSecondItem
                  }
                  to={item.to}
                  key={index}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            文章
          </div>

          {/* 其他按钮 */}
          {navArr.map((item, index) => (
            <NavLink
              className={({ isActive }) => (isActive ? s.navActive : s.navBtn)}
              to={item.to}
              key={index}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
      <div className={s.mobileNavBtn} onClick={() => setVisible(true)}>
        <MenuOutlined />
      </div>
      <Drawer
        placement="right"
        onClose={() => setVisible(false)}
        visible={visible}
        className="mobile-nav-box"
      >
        <div className={s.mobileNavBox}>
          {mobileNavArr.map((item, index) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? s.mobileNavActive : s.mobileNavItem
              }
              to={item.to}
              key={index}
            >
              {item.name}
            </NavLink>
          ))}
          {modeOptions.map((backgroundColor, index) => (
            <div
              key={index}
              style={{ backgroundColor }}
              className={classNames(s.modeItem, s[`modeItem${index}`])}
              onClick={() => setMode?.(index)}
            >
              {mode === index && <CheckOutlined />}
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Nav;
