## README

### Purpose And Background
The motivation for this component is the speed reading app, Spritz. It is based on the concept of presenting a body of text to the reader one word at a time while focusing the readers eye on an optimal position to facilitate comprehension at an adjustable words per minute.

This module was developed as an improvement upon a package I have since lost track of :(.  The original was class based and was prone to timing issues that made it impractical to adjust the words per minute or switch between text content options. I have refactored it as a functional react component and remediated the timing issues (at least on my machine!)

### Install

npm install speed-read-v1@latest

### Basic Usage
```javascript
// ...
  import SpeedRead from 'speed-read-v1';

// ...
  <SpeedRead
    className='reader'
    text={inputText}
    wpm={wpm}
    playing={isPlaying}
    style={{width: '300px'}}
  />
```

### Required Props

text <string>: Any text you want to be displayed through the reader (text can be switched which will cause the reader to stop playing if it is and can be started again)
wpm <number>: Words per minute for the text to be displayed when playing is true (can be adjusted while playing)
playing <bool>: Determines if text should be cycled through by the component (sets to false if text input changes) 