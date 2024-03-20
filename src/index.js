import React, { useEffect, useState } from 'react';

import './index.css';

const isEmoji = word => /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g.test(word);
const calcHighlightPoint = word => isEmoji(word) ? -1 : Math.floor(word.replace(/[\W]/g, '').length / 2);
const textToWords = text => text.split(/\s+/);
const ONE_MINUTE = 60 * 1000;

const charTimeout = (text, wpm) => {
    if (!text || typeof text !== 'string') throw new Error('Text must be a string');
  
    const words = textToWords(text);
    const totalTime = Math.trunc(words.length / wpm * ONE_MINUTE);
  
    return totalTime / words.join('').length;
};

export default function SpeedRead(props) {
  const initialState = {
    charTempo: charTimeout(props.text, props.wpm),
    currentWordIndex: 0,
    playing: props.playing || false,
    standardTempo: Math.trunc(ONE_MINUTE / props.wpm),
    startTimeout: props.startTimeout ? props.startTimeout : 800,
    text: props.text,
    words: textToWords(props.text),
    wpm: props.wpm,
    textUpdated: false,
    timeout: null,
  };

  const [ state, setState ] = useState(initialState);

  useEffect(() => {
    handleChangeText();
  }, [props.text])

  useEffect(() => {
    props.playing ? start() : stop();
  }, [props.playing]);

  useEffect(() => {
    handleUpdateWPM();
  }, [props.wpm])

  useEffect(() => {
    if ( 
      state.playing
      && props.playing
      && state.text === props.text
      && state.wpm === props.wpm
      && state.currentWordIndex < state.words.length
      && !state.timeout
    ) {
      setState({
        ...state,
        timeout: setTimeout(displayNextWord, state.currentWordIndex === 0 ? 1000 : getNextWordTimeout()),
      });
    }
  });

  function start() {
    setState({
      ...state,
      playing: true,
    });
  }

  function stop() {
    setState({
      ...state,
      playing: false,
    })
  } 

  const displayNextWord = (function displayNextWord() {
    if (state.text === props.text) {
      setState({
          ...state,
          currentWordIndex: state.currentWordIndex + 1,
      });
    }
  }).bind({props, state})

  function handleChangeText() {
    setState({
        ...state,
        charTempo: charTimeout(props.text, state.wpm),
        currentWordIndex: 0,
        text: props.text,
        words: textToWords(props.text),
        timeout: clearTimeout(state.timeout),
    });
  }

  function handleUpdateWPM() {
    setState({
        ...state,
        charTempo: charTimeout(props.text, props.wpm),
        standardTempo: Math.trunc(ONE_MINUTE / props.wpm),
        wpm: props.wpm,
        timeout: clearTimeout(state.timeout),
    })
  }

  function getNextWordTimeout() {
    const word = state.words[state.currentWordIndex];

    let wordTimeout = word.length * state.charTempo;

    const delay = /^\(|[,.)]$/.test(word) || isEmoji(word);
    if (delay) wordTimeout += state.standardTempo;

    // ensure, the timeout between words is not less than a wpm
    return Math.max(wordTimeout, state.standardTempo);
}

  const { currentWordIndex } = state;
  const word = currentWordIndex !== -1 && state.words[currentWordIndex];
  const highlightIndex = word && calcHighlightPoint(word);

  return (
      <div className="container">
        {
          word &&
          <div className="spritz">
            <div className="leftSide">
              {highlightIndex !== -1 && word.slice(0, highlightIndex)}
            </div>
            <div className="highlight">
              {highlightIndex === -1 ? word : word[highlightIndex]}
            </div>
            <div className="rightSide">
              {highlightIndex !== -1 && word.slice(highlightIndex + 1)}
            </div>
          </div>
        }
        {
          word && state.startTimeout &&
          <div
            style={{transition: `transform linear ${state.startTimeout}ms`}}
            className={props.playing ? 'timeoutBlockHidden' : 'timeoutBlock'}
          ></div>
        }
      </div>
    );
}