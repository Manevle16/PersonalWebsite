import React from 'react';

export default class Video extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            muted: true,
        }
    }

    switchMute = () => {
        const { muted } = this.state;
        this.setState({muted: !muted});
    }

    render(){
        const { muted } = this.state;
        return(
            <React.Fragment>
                {muted && <h3 onClick={this.switchMute} className="click">click me</h3>}
                <video className="umaru" onClick={this.switchMute} autoPlay muted={muted} loop>
                    <source src="https://matthewnevle-media.s3.us-east-2.amazonaws.com/UmaruChan.mp4" />
                </video>
            </React.Fragment>
        )
    }
}
