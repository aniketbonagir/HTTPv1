import React, {Component} from 'react';
import Post from '../../../components/Post/Post';
import FullPost from "../FullPost/FullPost";
import axios from "../../../axios";
import "./Posts.css";
// import {Link} from 'react-router-dom';
import { Route } from 'react-router-dom';

class Posts extends Component {
    state = {
        post: []
    }

    componentDidMount() {
        axios.get('/posts').then(response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'MadMax'
                }
            })
            this.setState({ post: updatedPosts })
        })
        .catch(error => {
            // this.setState({ error: true });
            console.log(error);
        })
    }

    postSelectedHandler = (id) => {
        this.props.history.push('/posts/' + id)
    }


    render() {
        let posts = <p style={{ textAlign: "center" }}>Something went wrong</p>
        if (!this.state.error) {
            posts = this.state.post.map(item => {
                return (
                    // <Link to={'/' + item.id} key={item.id}>
                    <Post key={item.id} title={item.title} author={item.author} clicked={() => this.postSelectedHandler(item.id)} />
                    // </Link>
                )
            });
        }
        return (            
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;