import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";

import styles from "../styles/Home.module.scss";
import fonts from "@/styles/fonts";
import Layout from "@/components/layout/layout";
import { auth } from "@/libs/firebase/firebase";
import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "@/libs/react-query";
import queryClient from "@/libs/react-query";
import { useFetchCandidateByUid } from "@/hooks/candidate_hooks/candidate_hooks";
import axios from "axios";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({
      duration: 1500,
      once: false,
    });
  }, []);

  useEffect(() => {
    Router.events.on("routeChangeStart", (...params) => {
      NProgress.start(params);
    });
    Router.events.on("routeChangeComplete", NProgress.done);
    Router.events.on("routeChangeError", NProgress.done);
    return () => {
      Router.events.off("routeChangeStart", NProgress.start);
      Router.events.off("routeChangeComplete", NProgress.done);
      Router.events.off("routeChangeError", NProgress.done);
    };
  }, []);

  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // const { mutateAsync, isLoading } = useFetchCandidateByUid();

  const getLoggedInUser = async (user) => {
    const res = await axios.post(`/api/candidate/${user.uid}`, {
      user,
    });

    if (res.status === 200) {
      return res.data;
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user?.uid) {
        try {
          const loggedInUser = await getLoggedInUser(user);
          setCurrentUser(loggedInUser);
        } catch (err) {
          console.log("logged in user error-->", err);
        }
      } else {
        setCurrentUser(null);
      }
      setSession(user);
    });
  }, []);

  return (
    <>
      <main className={`${styles.main} ${fonts.MainFont}`}>
        <QueryClientProvider client={queryClient}>
          <Layout currentUser={currentUser} session={session}>
            <Component
              {...pageProps}
              currentUser={currentUser}
              session={session}
              setCurrentUser={setCurrentUser}
              setSession={setSession}
            />
          </Layout>
        </QueryClientProvider>
      </main>
    </>
  );
}
