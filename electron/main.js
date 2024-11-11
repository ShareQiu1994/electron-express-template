// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'electron/preload.js'),
      webSecurity: false, // 跨域限制
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      contextIsolation: false, // 启用上下文隔离
      enableRemoteModule: false, // 禁用远程模块，出于安全考虑
      nodeIntegration: true // 启用Node.js集成
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('electron/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const server = express();

// // 启用 CORS
// server.use(cors());

// // 解析 JSON 请求体
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));

// // 设置路由（根据需要添加）
// server.get('/', (req, res) => {
//     res.send('Hello, Electron!');
// });

// // 启动服务器并监听端口（根据需要更改端口号）
// server.listen(3000, () => {
//     console.log('Server started on port 3000,http://localhost:3000/');
// });


/**
 * Module dependencies.
 */

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var expressApp = express();

// view engine setup
expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'hbs');

expressApp.use(logger('dev')); 
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));
expressApp.use(cookieParser());
expressApp.use(express.static(path.join(__dirname, 'public')));

expressApp.use('/', indexRouter);
expressApp.use('/users', usersRouter);

// catch 404 and forward to error handler
expressApp.use(function(req, res, next) {
  next(createError(404));
});

// error handler
expressApp.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var debug = require('debug')('express-project:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
expressApp.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(expressApp);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
