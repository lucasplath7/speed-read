function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useEffect, useState } from 'react';
import './index.css';
var isEmoji = function isEmoji(word) {
  return /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g.test(word);
};
var calcHighlightPoint = function calcHighlightPoint(word) {
  return isEmoji(word) ? -1 : Math.floor(word.replace(/[\W]/g, '').length / 2);
};
var textToWords = function textToWords(text) {
  return text.split(/\s+/);
};
var ONE_MINUTE = 60 * 1000;
var charTimeout = function charTimeout(text, wpm) {
  if (!text || typeof text !== 'string') throw new Error('Text must be a string');
  var words = textToWords(text);
  var totalTime = Math.trunc(words.length / wpm * ONE_MINUTE);
  return totalTime / words.join('').length;
};
export default function SpeedRead(props) {
  var initialState = {
    charTempo: charTimeout(props.text, props.wpm),
    currentWordIndex: 0,
    playing: false,
    standardTempo: Math.trunc(ONE_MINUTE / props.wpm),
    startTimeout: props.startTimeout ? props.startTimeout : 800,
    text: props.text,
    words: textToWords(props.text),
    wpm: props.wpm,
    textUpdated: false,
    timeout: null
  };
  var _useState = useState(initialState),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  useEffect(function () {
    handleChangeText();
  }, [props.text]);
  useEffect(function () {
    props.playing ? start() : stop();
  }, [props.playing]);
  useEffect(function () {
    handleUpdateWPM();
  }, [props.wpm]);
  useEffect(function () {
    if (state.playing && props.playing && state.text === props.text && state.wpm === props.wpm && state.currentWordIndex < state.words.length && !state.timeout) {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        timeout: setTimeout(displayNextWord, state.currentWordIndex === 0 ? 1000 : getNextWordTimeout())
      }));
    }
  });
  function start() {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      playing: true
    }));
  }
  function stop() {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      playing: false
    }));
  }
  var displayNextWord = function displayNextWord() {
    if (state.text === props.text) {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        currentWordIndex: state.currentWordIndex + 1
      }));
    }
  }.bind({
    props: props,
    state: state
  });
  function handleChangeText() {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      charTempo: charTimeout(props.text, state.wpm),
      currentWordIndex: 0,
      text: props.text,
      words: textToWords(props.text),
      timeout: clearTimeout(state.timeout)
    }));
  }
  function handleUpdateWPM() {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      charTempo: charTimeout(props.text, props.wpm),
      standardTempo: Math.trunc(ONE_MINUTE / props.wpm),
      wpm: props.wpm,
      timeout: clearTimeout(state.timeout)
    }));
  }
  function getNextWordTimeout() {
    var word = state.words[state.currentWordIndex];
    var wordTimeout = word.length * state.charTempo;
    var delay = /^\(|[,.)]$/.test(word) || isEmoji(word);
    if (delay) wordTimeout += state.standardTempo;

    // ensure, the timeout between words is not less than a wpm
    return Math.max(wordTimeout, state.standardTempo);
  }
  var currentWordIndex = state.currentWordIndex;
  var word = currentWordIndex !== -1 && state.words[currentWordIndex];
  var highlightIndex = word && calcHighlightPoint(word);
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, word && /*#__PURE__*/React.createElement("div", {
    className: "spritz"
  }, /*#__PURE__*/React.createElement("div", {
    className: "leftSide"
  }, highlightIndex !== -1 && word.slice(0, highlightIndex)), /*#__PURE__*/React.createElement("div", {
    className: "highlight"
  }, highlightIndex === -1 ? word : word[highlightIndex]), /*#__PURE__*/React.createElement("div", {
    className: "rightSide"
  }, highlightIndex !== -1 && word.slice(highlightIndex + 1))), word && state.startTimeout && /*#__PURE__*/React.createElement("div", {
    style: {
      transition: "transform linear ".concat(state.startTimeout, "ms")
    },
    className: props.playing ? 'timeoutBlockHidden' : 'timeoutBlock'
  }));
}