var term = null;
var socket = io(location.origin, {path: '/wetty/socket.io'})
var buf = '';

Terminal.applyAddon(fit);
/* TODO
function Wetty(argv) {
    this.argv_ = argv;
    this.io = null;
    this.pid_ = -1;
}

Wetty.prototype.run = function() {
    this.io = this.argv_.io.push();

    this.io.onVTKeystroke = this.sendString_.bind(this);
    this.io.sendString = this.sendString_.bind(this);
    this.io.onTerminalResize = this.onTerminalResize.bind(this);
}

Wetty.prototype.sendString_ = function(str) {
    socket.emit('input', str);
};

Wetty.prototype.onTerminalResize = function(col, row) {
    socket.emit('resize', { col: col, row: row });
};
*/

window.addEventListener('resize', () => {
  if (!term) {
    return;
  }

  term.fit();
})

socket.on('connect', function() {
    term = new Terminal();
    term.open(document.getElementById('terminal'));
    if (buf && buf !== '') {
      term.write(buf);
      buf = '';
    }
    term.on('data', (data) => {
      socket.emit('input', data);
    });
    term.on('resize', () => {
      socket.emit('resize', { col: term.cols, row: term.rows });
    });
    term.fit();
});

socket.on('output', function(data) {
    console.log('raw', data);
    data = data.split('\u0007').join('');
    console.log('filter', data);
    if (!term) {
        buf += data;
        return;
    }
    term.write(data);
});

socket.on('disconnect', function() {
    console.log('Socket.io connection closed');
});
