import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        postObj: null
    }

    componentDidUpdate() {
        
        if(this.props.id) {
            if (!this.state.postObj || (this.state.postObj && this.state.postObj.id !== this.props.id)) {
                axios.get('/posts/' + this.props.id).then(resp => {
                    this.setState({ postObj: resp.data });
                })
            }           
        }
    }

    render () {
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{ textAlign: "center" }}>Loading Post!</p>;
        }
        if (this.state.postObj) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.postObj.title}</h1>
                    <p>{this.state.postObj.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        
        return post;
    }
}

export default FullPost;