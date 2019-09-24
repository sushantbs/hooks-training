import React from "react";
import socketLibrary from "../../lib/socketLibrary";

class LandingPage extends React.Component {

  state = {
    messages: [],
    inputString: "",
    meta: null,
    postingMessage: false
  }

  constructor() {
    super();
    this.connection = null;
  }

  updateState(stateVar, stateVal) {
    this.setState({
      [stateVar]: stateVal
    })
  }

  _detectAndHandleEnter() {

  }

  async componentDidMount() {
    // make the socket connection
    this.connection = await socketLibrary.connect({
      url: "/socket/endpoint"
    });

    this.connection.on("message", msg => this._consumeMessage(msg));
    this.connection.on("meta", meta => this._consumeMetadata(meta));
  }

  async postMessage() {
    this.setState({
      postingMessage: true
    })
    const resp = await this.connection.post("message", this.state.inputString);
    if (resp.success) {
      this.setState({
        inputString: ""
      });
    } else {
      // handle post errors here
    }
  }

  _consumeMessage(message) {
    this.setState({
      messages: [
        ...this.state.messages,
        message
      ]
    });
  }

  _consumeMetadata(meta) {
    this.setState({
      meta
    });
  }

  _detectAndHandleEnter(e) {
    if (e.keyCode === 13) {
      this.postMessage();
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="chat-container">
          {
            this.state.messages.map(message => (
              <div className={`message ${message.sender === "me" ? `my-message` : `others-message`}`}>
                <div className="sender-name">{message.sender}</div>
                <div className="message-content">{message.content}</div>
              </div>
            ))
          }
        </div>
        <div className="">
          <input type="text" value={this.state.inputString} onKeyDown={e => this._detectAndHandleEnter(e)} onChange={e => this.updateState("inputString", e.target.value)} />
          <input type="button" value="Send" onClick={e => this.postMessage(e)} />
        </div>
      </div>
    )
  }
}

export default LandingPage