import React, { Component } from 'react';
// import axios from 'axios';
import axios from "../../axios";

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state ={
        post: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount () {
        axios.get('/posts').then(response => {
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'MadMax'
                }
            })
            this.setState({ post: updatedPosts})
        })
        .catch(error => {
            this.setState({ error: true});
        })
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        let posts = <p style={{textAlign: "center"}}>Something went wrong</p>
        if(!this.state.error) {
            posts = this.state.post.map(item => {
                return <Post key={item.id} title={item.title} author={item.author} clicked={() => this.postSelectedHandler(item.id)} />
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;