
// server.statics.js
import * as fs from "node:fs";
import * as http from "node:http";
import * as path from "node:path";

const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript",
  json: "application/json",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

const STATIC_PATH = path.join(process.cwd(), "./src");

const toBool = [() => true, () => false];

// Middleware (prepara el archivo para cargarlo en el servidor)
async function prepareFile(url) {
  const paths = [STATIC_PATH, url];
  
  if (url.endsWith("/")) {
    paths.push("index.html");

  }
  
  //Convierte todas las partes del Array en una cadena de texto
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  // Si no encuentra el archivo devolvera Error 404
  const streamPath = found ? filePath : STATIC_PATH + "/404.html";
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);

  return { found, ext, stream };
};

http.createServer(async (request, response) => {
    const url = new URL(`http://${request.headers.host}${request.url}`);
    const file = await prepareFile(url.pathname);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;

    console.log(url.pathname);

    // SETUP CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Content-Type', mimeType);
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.setHeader('Access-Control-Max-Age', 2592000); // 30 days
    response.writeHead(statusCode);

    file.stream.pipe(response);
  })
  .listen(process.env.PORT, process.env.IP);

  console.log('Server running at http://' + process.env.IP + ':' + process.env.PORT + '/');