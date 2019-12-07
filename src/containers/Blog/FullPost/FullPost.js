import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        postObj: null
    }

    componentDidMount() {
        console.log(this.props);
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        if (this.props.match.params.id) {
            if (!this.state.postObj || (this.state.postObj && this.state.postObj.id !== +this.props.match.params.id)) {
                axios.get('/posts/' + this.props.match.params.id).then(resp => {
                    this.setState({ postObj: resp.data });
                })
            }
        }
    }

    render () {
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;
        if (this.props.match.params.id) {
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