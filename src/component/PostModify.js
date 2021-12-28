import React from "react";
import { Link } from "react-router-dom";

const PostModify = ({ Pid, refresh }) => {

    const handleDelete = () => {
        const deletePost = async () => {
            try {
                const response = await fetch(`https://my-blog-api-29.herokuapp.com/post/${Pid}/delete`, {
                    method:'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }

                });
                const data = await response.json();
                if (data.errors) {
                    console.log(data.errors.msg);
                } else {
                    refresh();
                }
            } catch (err) {
                console.log(err);
            }
        }
        deletePost();
    }

    return(
        <div className="post_modify">
            <Link className="page" to={`/blog_page/post/${Pid}/edit`}>Update Post</Link>
            <button onClick={() => handleDelete()}>Delete Post</button>
        </div>
    )
}

export default PostModify;