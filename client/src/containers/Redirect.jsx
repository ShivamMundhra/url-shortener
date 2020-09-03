import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../assets/410-lego-loader.json";
import styles from "./styles.module.css";
const Redirect = (props) => {
  const [longUrl, setLongUrl] = useState("");
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const params = useParams();
  useEffect(() => {
    axios.get(`/api/v1/redirect/${params.shortId}`).then((data) => {
      const { longUrl } = data.data;
      setLongUrl(longUrl);
    });
    let timer = setTimeout(() => {
      window.location.href = longUrl;
    }, 1200);
    return () => clearTimeout(timer);
  }, [params.shortId, longUrl]);
  return (
    <div className={styles.redirect}>
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isStopped={false}
        isPaused={false}
      />
      <p
        style={{
          fontSize: "30px",
          margin: "0",
          transform: "translateY(-50px)",
        }}
      >
        Redirecting to original Url
      </p>
    </div>
  );
};

export default Redirect;
