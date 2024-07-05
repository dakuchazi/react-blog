import { useMount, useTitle } from "ahooks";
import classNames from "classnames";
import React from "react";
import { siteTitle } from "@/utils/constant";
import useTop from "@/utils/hooks/useTop";
import Card from "../Card";
import LayoutLoading from "../LayoutLoading";
import PageTitle from "../PageTitle";
import s from "./index.scss";
import { useAppDispatch } from "@/store";
import { setNavShow } from "@/store/slices/layoutSlice";

interface Props {
  title?: string;
  className?: string;
  setNavShow?: Function;
  loading?: boolean;
  isPost?: boolean;
  classes?: string;
  date?: string;
  rows?: number;
}

const Layout: React.FC<Props> = ({
  title,
  className,
  loading,
  children,
  classes,
  date,
  isPost = false,
  rows,
}) => {
  const dispatch = useAppDispatch();

  useTitle(`${siteTitle} | ${title || ""}`);

  useMount(() => {
    window.scrollTo(0, 0);
    dispatch(setNavShow(true));
  });

  return (
    <>
      <PageTitle
        title={title}
        className={classNames({ [s.postTitle]: isPost })}
      >
        {isPost && (
          <div>
            <span className={s.articleClass}>{classes}</span>
            <span className={s.articleDate}>{date}</span>
          </div>
        )}
      </PageTitle>
      <Card isStatic={true} className={classNames(s.layoutCard, className)}>
        {loading ? <LayoutLoading rows={rows} /> : children}
      </Card>
    </>
  );
};

export default Layout;
