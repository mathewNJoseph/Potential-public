import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'
import config from '../config'

class SlackButton extends Component {
    constructor(props){
        super(props)
    }

    inviteToSlack() {
        var email = config.slackEmail;
        var SLACK_TOKEN = config.SLACK_TOKEN;
        var SLACK_INVITE_ENDPOINT = config.SLACK_INVITE_ENDPOINT;
        var QUERY_PARAMS = `email=${email}&token=${SLACK_TOKEN}&set_active=true`;
 
        axios.get(`${SLACK_INVITE_ENDPOINT}?${QUERY_PARAMS}`)
            .then((snapshot) => {
                
            })
            .catch((error) => {
                console.log(error.code)
            });
    }

    render(){
        return(
            <div>
            <button onClick={this.inviteToSlack}>Slack Button</button>
            <a href="https://join.slack.com/t/potentialcorp/shared_invite/zt-ogqzd8n5-BMk_bQxEyhmbXlagVZ3~lw" target="_blank"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
            </div>
        )
    }
}

export default SlackButton