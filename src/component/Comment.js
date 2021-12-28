import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentModify from "./CommentModify";

const Comment = ({ comments, reload }) => {
    const [allow, setAllow] = useState(false);

    useEffect(() => {
        if (localStorage.token)
            setAllow(true);
    }, []);

    return (
        <div className="comments">
            {comments.map(comment => {
                return (
                    <div className="comment" key={comment._id}>
                        <h2>{comment.message}</h2>
                        <Link className="to_user" to={`/blog_page/user/${comment.user._id}`}>
                            <p>By: {comment.user.username}</p>
                        </Link>
                        <p>{DateTime.fromJSDate(new Date(`${comment.date}`))
                                .toLocaleString(DateTime.DATETIME_FULL)}</p>
                        {allow && 
                        (JSON.parse(localStorage.user)._id === comment.user._id) &&
                            <CommentModify Pid={comment.post._id} Cid={comment._id}
                                refresh={reload} />
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default Comment;