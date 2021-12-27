import React from "react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import PostModify from "./PostModify";

const PostList = ({ posts, from, reload }) => {

    return (
        <ul className="post_list">
            {posts.map(post => {
                const pretty_date = DateTime.fromJSDate(new Date(`${post.date}`))
                                    .toLocaleString(DateTime.DATETIME_FULL);
                return(
                    <div className="post" key={post._id}>
                        <Link to={`/post/${post._id}`}>
                            <h1>{post.title}</h1>
                            <p>By: {post.user.username}</p>
                            <p>{pretty_date}</p>
                        </Link>
                        {(JSON.parse(localStorage.user)._id === post.user._id) &&
                            !from &&
                            <PostModify Pid={post._id} refresh={reload} />
                        }
                    </div>
                )
            })}
        </ul>

    )
}

export default PostList;