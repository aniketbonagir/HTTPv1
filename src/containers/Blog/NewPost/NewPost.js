import React, { Component } from 'react';
import axios from 'axios';
// import {Redirect} from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max'
        // submitted: false
    }

    onAddPostDataHandler = () => {
        const postData = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }
        axios.post('/posts', postData).then(resp => {
            console.log(resp);
            this.props.history.replace('/posts');
            // this.setState({ submitted: true});
        });
    }

    render () {
        // { this.state.submitted && <Redirect to="/posts" /> }

        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.onAddPostDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;