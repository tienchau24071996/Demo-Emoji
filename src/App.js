import React, { Component } from "react";

import "./App.css"
import "emoji-mart/css/emoji-mart.css";
import data from "emoji-mart/data/messenger.json";
import { NimblePicker } from "emoji-mart";
import { Emoji, emojiIndex } from "emoji-mart";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isClicked: false
    };
  }

  showBoxEmoji = () => {
    this.setState({
      isClicked: !this.state.isClicked
    });
  };

  handleChange = e => {
     let value = e.target.value;
     if((value.charAt(0) === ":") && (value[value.length - 1] === ":") && (value.length >= 3)) {
     this.setState({ text: this.renderEmojiChar(value) })
     } else {
      this.setState({ text: e.target.value })
     }

     if (/\s/.test(value)) {
      let value1 = value.split(" ")
      value1 = value1[value1.length - 1]
      if((value1.charAt(0) === ":") && (value1[value1.length - 1] === ":") && (value1.length >= 3)) {
        let value2 = value.replace(value1, this.renderEmojiChar(value1))
      this.setState({ text: value2 })
      } else {
       this.setState({ text: e.target.value })
      }
    }
  };

  renderEmojiChar = (value) => {
    value = value.replace(/:/g, '')
    let search = []
    if (value) {
        search = emojiIndex.search(value).map(o => o.native)
        return search[0];
    }
  }

  addEmoji = e => {
    let emoji = e.native;
    this.setState({
      text: this.state.text + emoji,
      isClicked: !this.state.isClicked
    },() => {
      let abc = document.getElementById("abc");
      abc.focus()
    });
  };
  
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ text: "" }); //reset the field to empty
  };

  getValue = () => {
    console.log(this.state.text);
  }
  

  render() {
    let { isClicked } = this.state;
    return (
      <div className="App">
        {isClicked ? (
          <NimblePicker
            title="Pick your emoji…"
            emoji="point_up"
            set="google"
            data={data}
            onSelect={this.addEmoji}
          />
        ) : null}
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <input
            id="abc"
            className="my-textarea"
            style={{
              padding: "10px 18px",
              borderRadius: "6px",
              border: "1px solid #d0c8c8"
            }}
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="Type a message here then hit ENTER"
          />
          <span>
            <Emoji
              emoji="santa"
              set="emojione"
              size={32}
              onClick={this.showBoxEmoji}
            />
          </span>
          <br />
          <button type="submit" onClick={this.getValue}>Submit</button>
        </form>
      </div>
    );
  }
}
