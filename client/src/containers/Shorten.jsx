import React, { useState } from "react";

// import { useHistory } from "react-router-dom";
import axios from "axios";
import copy from "copy-to-clipboard";
import styles from "./styles.module.css";
import Snackbar from "@bit/mui-org.material-ui.snackbar";

const Shorten = (props) => {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [open, setOpen] = useState(false);
  const { origin } = window.location;
  const handleUrl = (event) => {
    const { value } = event.target;
    setUrl(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/shorten", { url: url })
      .then((res) => setShortId(res.data.data.doc.shortId))
      .catch((err) => console.log(err));
  };
  const copyTextToClipboard = () => {
    copy(`${origin}/redirect/${shortId}`);
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className={styles.Shorten}>
      <form onSubmit={handleSubmit}>
        <input value={url} name={url} type="text" onChange={handleUrl} />
        <button type="submit">Shorten</button>
      </form>
      {shortId ? (
        <div className={styles.copyBox} onClick={copyTextToClipboard}>
          <span
            className={styles.noselect}
          >{`${origin}/redirect/${shortId}`}</span>
        </div>
      ) : (
        <div className={styles.emptyBox}>&nbsp;</div>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Link Copied"
      />
    </div>
  );
};

export default Shorten;
