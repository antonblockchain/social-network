import React, { useState } from "react";
import styles from "./users.module.css";
import picture from "../images/1.jpg";
import Preloader from "../common/Preloader";
import { NavLink} from "react-router-dom";

const Users = ({ props, onHandlerPage }) => {
console.log(props.users)
  const [pages, setPages] = useState(1)

  const pagescount = Math.ceil(props.totalcount, props.pageSize);
  let arr = []
  
  for(let i =1; i<=pagescount;i++)
  {
    arr.push(i)
  }

  let portion = Math.ceil(pagescount / props.portionSize)
  let leftportion = (pages - 1) * props.portionSize + 1
  let rightportion = (pages) * props.portionSize

  if (!props.isFetching) {
    return <Preloader />;
  }
  
  return (
    <div className={styles.userscontainer}>
      <div>
       {pages > 1 && <button onClick={()=>{setPages(pages - 1)}} >prev</button>}
        {arr.filter(p=> p <= rightportion && p>=leftportion)
        .map((e,i) => (
          <span
          key={i*Math.random()* 31}
            onClick={() => onHandlerPage(e)}
            className={`${props.selectedPage == e ? styles.selectedPage : ""} ${
              styles.page
            }`}
          >
            {e}
          </span>
        ))}
        { portion>pages && <button onClick={()=>{setPages(pages+1)}} >next</button>}
      </div>
      {props.users.map((e) => (
        <div className={styles.user} key={e.id * Math.random() * 10}>
          <NavLink to={'/profile/' + e.id} onClick={()=>{props.LoadProfile(e)}}>
          <img
            className={styles.photo}
            src={e.photos.large ? e.photos.large : picture}
          />
          </NavLink>
          <h1>{e.name}</h1>
          <div>
            <p>{e.slogan}</p>
            <p>{e.location}</p>
            {!e.followed ? (
              <button disabled={props.followingProgress.some(id=>id===e.id)} onClick={() => {props.FollowThunk(e.id)}}>Follow</button>
            ) : (
              <button disabled={props.followingProgress.some(id=>id===e.id)} onClick={() => {props.UnFollowThunk(e.id)}}>Unfollow</button>
                )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Users;
