import { FC } from "react";
import s from "./pageLayout.module.css";
import { Footer, Header } from "widgets";
import { IPageLayout } from "./pageLayout.types";
import { Box } from "@chakra-ui/react";

export const PageLayout: FC<IPageLayout> = ({ children }) => {
  return (
    <main className={s.layout}>
      <Header />
      <Box bg="cyan.600" className={s.topbar} />
      {/* <NavBar /> */}
      <main>
        <Box bg="cyan.100" minH="calc(100vh - 100px)">
          {children}
        </Box>
      </main>
      <Footer />
    </main>
  );
};
