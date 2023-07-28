const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.encoding = options.encoding;
    this.row = '';
  }

  _transform(chunk, encoding, callback) {
    if (!chunk.includes(os.EOL)) {
      this.row += chunk;
    } else {
      const chunks = chunk.toString(this.encoding).split(os.EOL);
      chunks.forEach((chunk, index) => {
        if (index === 0) {
          this.push(this.row + chunk, this.encoding);
          this.row = '';
        } else if (index === chunks.length - 1) {
          this.row = chunk;
        } else {
          this.push(chunk, this.encoding);
        }
      });
    }
    callback();
  }

  _flush(callback) {
    this.push(this.row, this.encoding)
    callback();
  }
}

module.exports = LineSplitStream;
