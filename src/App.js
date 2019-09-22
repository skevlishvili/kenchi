import React, { Component } from "react";
import "../src/App.scss";

import kenchi from "../src/images/kenchi.png";

class App extends Component {
  state = {
    kanjiGrade: [],
    translationsWord: "",
    kanji: [],
    grade: "grade-1",
    active: null
  };

  getWords = async () => {
    let grade = this.state.grade;
    let wordArray = [];

    await fetch(`https://kanjiapi.dev/v1/kanji/${grade}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          kanjiGrade: data
        });
        console.log(data, "data");
        console.log(this.state.kanjiGrade, "state");
      });

    this.state.kanjiGrade.map(kanji => {
      fetch(`https://kanjiapi.dev/v1/kanji/${kanji}`)
        .then(res => res.json())
        .then(data => {
          // this.setState({
          //   kanji: data
          // });
          wordArray.push(data);
          this.setState({
            kanji: wordArray
          });
        });
    });
  };

  handleCardFlip = () => {
    this.setState({
      cardSwitch: !this.state.cardSwitch
    });
  };

  searchWord = async () => {
    let wordArray = [];
    let translationWord = this.state.translationsWord;

    await fetch(`https://kanjiapi.dev/v1/kanji/${translationWord}`)
      .then(res => res.json())
      .then(data => {
        wordArray.push(data);
      });
    this.setState({
      kanji: wordArray
    });

    // console.log(data, "data");
    console.log(this.state.kanji, "state");
  };

  handleInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div className="nav">
          <ul>
            <li>
              <a class="active" href="/">
                KENCHI
              </a>
            </li>
            <li>
              <img src={kenchi}></img>
            </li>
            <li style={{ float: "right" }}>
              <a class="active" href="/">
                ABOUT
              </a>
            </li>
          </ul>
        </div>
        <div className="search-input-wrapper">
          <input
            placeholder="Enter Kanji"
            onChange={this.handleInputChange}
            id="translationsWord"
            className="search-input"
          />
          <div className="landing__grade-picker-wrapper">
            <div className={"landing__grade-picker"}>
              <select
                id="grade"
                onChange={this.handleInputChange}
                className="landing__grade-picker-select"
              >
                <option>grade-1</option>
                <option>grade-2</option>
                <option>grade-3</option>
                <option>grade-4</option>
                <option>grade-5</option>
                <option>grade-6</option>
                <option>grade-7</option>
                <option>grade-8</option>
              </select>
            </div>
          </div>
          <div className="button-flex">
            <button onClick={this.getWords} className="search-word-button">
              Kanji
            </button>
            <button onClick={this.searchWord} className="search-word-button">
              Search
            </button>
          </div>
        </div>
        {this.state.kanji.map((data, i) => {
          return (
            <div
              className="word-card"
              onClick={() => {
                if (this.state.active === i) {
                  this.setState({
                    active: null
                  });
                } else {
                  this.setState({
                    active: i
                  });
                }
              }}
            >
              <div
                style={{
                  display: this.state.active !== i ? "block" : "none"
                }}
                className="header-kanji"
              >
                {data.kanji}
              </div>
              <div
                style={{
                  display: this.state.active === i ? "block" : "none"
                }}
              >
                <div>KANJI: {data.kanji}</div>
                <div>GRADE: {data.grade}</div>
                <div>STROKE_COUNT: {data.stroke_count}</div>
                <div>MEANINGS: {data.meanings[0]}</div>
                <div>KUN READINGS: {data.kun_readings}</div>
                <div>READINGS: {data.on_readings}</div>
                <div>NAME READINGS: {data.name_readings}</div>
                <div>JLPT: {data.jlpt}</div>
                <div>UNICODE: {data.unicode}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
