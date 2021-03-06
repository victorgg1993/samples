import React, { useContext } from "react";
import { NoArrow, UpArrow } from "./Arrows";
import "./Link.css";
import UserContext from "../UserContext";
import firebase from "@firebase/app";

function Link({ id, url, by, votes, loading, upvoted }) {
  const { user } = useContext(UserContext);

  const _vote = (positive) => () => {
    const db = firebase.firestore();
    const linkRef = db.doc(`/reddit/${id}`);
    const voteRef = db.doc(`/users/${user}/votes/${id}`);
    db.runTransaction(async (tx) => {
      const doc = await tx.get(linkRef);
      var newVotes = doc.data().votes + (positive ? 1 : -1);
      tx.update(linkRef, { votes: newVotes });
      if (positive) {
        tx.set(voteRef, {});
      } else {
        tx.delete(voteRef);
      }
    });
  };

  const vote = _vote(true);
  const unvote = _vote(false);

  return (
    <div className="link">
      {user && (
        <div className="vote">
          {!loading && !upvoted ? <UpArrow onClick={vote} /> : <NoArrow />}
        </div>
      )}
      <div className="content">
        <a href={url}>{url}</a>
        <div className="subtitle">
          <span className="stats">
            {votes} vote{votes === 1 ? "" : "s"}
          </span>
          {by && <span className="by">by {by}</span>}
          {user && upvoted && (
            <span className="unvote" onClick={unvote}>
              unvote
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Link;
