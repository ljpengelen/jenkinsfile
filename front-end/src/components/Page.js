import { h } from "preact";
import { Header } from "src/components/Header";
import styles from "./Page.scss";

export const Center = ({ children }) => (
  <div class={styles.center}>{children}</div>
);

export const Page = ({ children }) => (
  <div class={styles.page}>
    <Header />
    <main class={styles.main}>{children}</main>
  </div>
);
