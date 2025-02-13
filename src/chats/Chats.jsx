import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { requestHelper } from '../helper/requestHelper';
import './Chats.scss';

export const Chats = ({ currentUser }) => {
    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState({
        text: '',
        id: '',
    });

    useEffect(() => {
        (async () => await loadPosts())();
    }, []);

    useEffect(() => {
        const socket = io('http://localhost:8080');

        socket.on('posts', (data) => {
            if (data.action === 'create') {
                addPost(data.post);
            } else if (data.action === 'update') {
                updatePost(data.post);
            } else if (data.action === 'delete') {
                loadPosts();
            }
        });
    }, []);

    const addPost = (post) => setPosts((prev) => [post, ...prev]);

    const updatePost = (post) => {
        setPosts((prev) => prev.map((item) => (item._id === post._id ? { ...post } : item)));
    };

    const loadPosts = async () => {
        try {
            const posts = await requestHelper({
                url: '/posts',
            });
            setPosts(posts.data.posts);
        } catch (error) {}
    };

    const editPostHandler = (post) => setPostContent({ text: post.content, id: post._id });

    const deletePostHandler = async (postId) => {
        try {
            await requestHelper({
                url: `/post/${postId}`,
                method: 'DELETE',
            });
        } catch (error) {}
    };

    const postChangeHandler = (e) => setPostContent((prev) => ({ ...prev, text: e.target.value }));

    const handlePostChanging = async (e) => {
        e.preventDefault();

        try {
            if (postContent.id) {
                await requestHelper({
                    method: 'PUT',
                    url: `/post/${postContent.id}`,
                    data: { content: postContent.text },
                });
                setPostContent({ text: '', id: '' });
            } else {
                await requestHelper({
                    method: 'POST',
                    url: '/post',
                    data: { content: postContent.text },
                });
            }
        } catch (error) {}
    };

    return (
        <div className="chat-wrapper">
            <div className="posts-wrapper">
                {!posts.length ? <div className="posts-empty">No posts found.</div> : <></>}
                {posts.map((post) => (
                    <div className="post-item" key={Math.random()}>
                        <div className="item-header">
                            <div className="item-bio">
                                <span className="name">
                                    {post.creator.firstName}&nbsp;{post.creator.lastName}
                                </span>
                                {post.createdAt !== post.updatedAt && <span>edited</span>}
                            </div>
                            <div className="item-date">
                                <span className="date">{new Date(post.createdAt).toLocaleDateString('en-US')}</span>
                                <span className="time">{new Date(post.createdAt).toLocaleTimeString()}</span>
                            </div>
                        </div>
                        <div className="item-content">
                            <div className="item-text">{post.content}</div>

                            <div className="item-actions">
                                {currentUser._id === post.creator._id && (
                                    <>
                                        <button className="edit-action" onClick={() => editPostHandler(post)}>
                                            Edit
                                        </button>
                                        <button className="delete-action" onClick={() => deletePostHandler(post._id)}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <form className="add-form">
                <input
                    id="content"
                    label="Content"
                    name="content"
                    onChange={postChangeHandler}
                    value={postContent.text}
                />
                <button type="submit" onClick={handlePostChanging}>
                    {postContent.id ? 'Update' : 'Add post'}
                </button>
            </form>
        </div>
    );
};
