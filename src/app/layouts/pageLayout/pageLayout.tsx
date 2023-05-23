import { FC } from "react";
import s from "./pageLayout.module.css";
import { Footer, Header, NavBar } from "widgets";
import { IPageLayout } from "./pageLayout.types";

export const PageLayout: FC<IPageLayout> = ({ children }) => {
  return (
    <main className={s.layout}>
      <Header />
      <NavBar />
      <main>{children}</main>
      <Footer />
    </main>
  );
};
