var term = null;
var buf = '';

window.addEventListener('resize', () => {
  if (!term) {
    return;
  }

  term.fit();
});

function connect() {
  var socket = io(location.origin, {path: '/wetty/socket.io'})
  Terminal.applyAddon(fit);

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
      if (!term) {
          buf += data;
          return;
      }
      term.write(data);
  });

  socket.on('disconnect', function() {
      console.log('Socket.io connection closed, reconnecting');
      term.destroy();
      term = null;
      connect();
  });
};
connect();
