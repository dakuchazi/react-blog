import { useToggle } from "ahooks";
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import { Title } from "../titleConfig";
import AboutMe from "./AboutMe";
import AboutSite from "./AboutSite";
import Switch from "./Switch";
import {
  getAboutListAsync,
  selectAboutData,
  selectAboutLoading,
} from "@/store/slices/aboutSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectTypeData } from "@/store/slices/typeSlice";
import { selectMode } from "@/store/slices/layoutSlice";

import s from "./index.scss";

const About: React.FC = () => {
  const [state, { toggle, setLeft, setRight }] = useToggle();
  const dispatch = useAppDispatch();
  const typeData = useAppSelector(selectTypeData);
  const aboutData = useAppSelector(selectAboutData);
  const aboutLoading = useAppSelector(selectAboutLoading);
  const mode = useAppSelector(selectMode);

  useEffect(() => {
    dispatch(getAboutListAsync());
  }, []);

  return (
    <Layout title={Title.About} loading={aboutLoading}>
      <Switch
        state={state}
        toggle={toggle}
        setLeft={setLeft}
        setRight={setRight}
      />
      <AboutMe className={state ? "" : s.hidden} content={aboutData.myself} />
      <AboutSite
        className={state ? s.hidden : ""}
        content={aboutData.website}
        classData={typeData}
        mode={mode}
      />
    </Layout>
  );
};

export default About;
