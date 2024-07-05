import "./global.custom.scss";

import { useLocalStorageState, useMount } from "ahooks";
import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";

import Footer from "@/components/Footer";
import Main from "@/components/Main";
import Nav from "@/components/Nav";
import BackToTop from "./components/BackToTop";
import { useAppDispatch, useAppSelector } from "./store";
import { selectMode, setMode } from "./store/slices/layoutSlice";

import s from "./App.scss";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const bgClasses = [s.bg0, s.bg1, s.bg2];
  const [localMode] = useLocalStorageState("localMode");

  useMount(() => {
    if (localMode !== undefined) {
      dispatch(setMode(localMode));
    }
  });

  return (
    <div className={classNames(s.AppBox, bgClasses[mode!])}>
      <Nav />
      <Main />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;
