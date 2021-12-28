import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostControl = () => {
    const id = useParams().id;
    const nav = useNavigate();
    const [title, setTitle] = useState();
    const [postTitle, setPostTitle] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id) {
            setTitle('Edit Post');
            const fetchPost = async () => {
                try {
                    const response = await fetch(`https://my-blog-api-29.herokuapp.com/post/${id}`);
                    const data = await response.json();
                    if (data.errors) {
                        console.log(data.errors.msg);
                    } else {
                        setMessage(data.thePost.message);
                        setPostTitle(data.thePost.title);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            fetchPost();
            setMessage();
        } else {
            setTitle('Create Post');
        }
    }, [id]);

    const handleTitle = (e) => {
        setPostTitle(e.target.value);
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const createPost = async () => {
            try {
                const response = await fetch('https://my-blog-api-29.herokuapp.com/post/create', {
                    method:'post',
                    body: JSON.stringify({title: postTitle, message}),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if (data.errors) {
                    console.log(data.errors.msg);
                } else {
                    nav(`/blog_page/post/${data.post._id}`);
                }
            } catch (err) {
                console.log(err);
            }
        }

        const editPost = async () => {
            try {
                const response = await fetch(`https://my-blog-api-29.herokuapp.com/post/${id}/update`, {
                    method:'post',
                    body: JSON.stringify({title: postTitle, message}),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                if (data.errors) {
                    console.log(data.errors.msg);
                } else {
                    nav(`/blog_page/post/${data.post._id}`);
                }
            } catch (err) {
                console.log(err);
            }
        }

        if (id) {
            editPost();
        } else {
            createPost();
        }
    }

    return (
        <div className="post_control">
            <h1>{title}</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="getTitle field">
                    <label>Title: </label>
                    <input type="text" required={true} 
                        value={postTitle} onChange={(e) => handleTitle(e)}/>
                </div>
                <textarea name="message" className="post_msg_area"
                    onChange={(e) => handleChange(e)} required={true}
                    value={message} />
                <input className="submit" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default PostControl;