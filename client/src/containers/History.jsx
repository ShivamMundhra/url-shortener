import React,{useState,useEffect} from 'react';
import styles from "./styles.module.css";
import axios from "axios"
const History = (props) => {
  const { origin } = window.location;
  let component=<div>Please Log in</div>
  const [linksArray,setLinksArray] = useState(null);
  let linksComponent;
  useEffect(()=>{
    axios.get('/api/v1/users/history')
    .then((data)=>{
      setLinksArray(data.data.data.urls);
    })
    .catch(error=>console.log(error))
  },[]);
  if(linksArray){
    linksComponent = linksArray.map((obj,i)=>
      <div key={i} className={styles.linkRow} >
        <a className={styles.fullLink} href={obj.longUrl}>{obj.longUrl}</a>
        <a className={styles.shortLink} href={`${origin}/redirect/${obj.shortId}`}>{`${origin}/redirect/${obj.shortId}`}</a>
      </div>)
    component=<div className={styles.History}>
                <div className={styles.contentBox}>
                  <div className={styles.userName}>Hello {props.user.name}</div>
                  <div className={styles.headingRow}><div className={styles.fullLink}>Full Link</div> <div className={styles.shortLink}>Short Link</div></div>
                  {linksComponent}
                </div>
              </div>;
  }
  return ( 
    <div>{component}</div>
   );
}
 
export default History;