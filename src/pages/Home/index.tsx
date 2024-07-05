import { useMount, useSafeState, useTitle } from "ahooks";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { setNavShow } from "@/store/slices/layoutSlice";
import { annotation, siteTitle } from "@/utils/constant";
import Section from "./Section";
import { useAppDispatch } from "@/store";
import { getTagListAsync } from "@/store/slices/tagSlice";
import { getTypeListAsync } from "@/store/slices/typeSlice";
import { getArticleListAsync } from "@/store/slices/articleSlice";
import Aside from "./Aside";

import s from "./index.scss";

//今日诗词
const getPoem = require("jinrishici");

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  useTitle(siteTitle);

  useMount(() => {
    window.scrollTo(0, 0);
    dispatch(setNavShow(true));
  });

  //用法与 React.useState 完全一样，但是在组件卸载后异步回调内的 setState 不再执行，避免因组件卸载后更新状态而导致的内存泄漏。
  const [poem, setPoem] = useSafeState("");
  useMount(() => {
    getPoem.load(
      (res: {
        data: {
          content: string;
        };
      }) => setPoem(res.data.content)
    );

    dispatch(getTagListAsync());
    dispatch(getTypeListAsync());
    dispatch(getArticleListAsync({ pagesize: 8, current: 1, isDraft: false }));
  });

  return (
    <>
      <PageTitle
        title={siteTitle}
        desc={poem || ""}
        children={annotation}
        className={s.homeTitle}
      />
      <div className={s.body}>
        <Section />
        <Aside />
      </div>
    </>
  );
};

export default Home;
