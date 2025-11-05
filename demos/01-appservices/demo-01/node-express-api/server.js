let express = require('express');
let path = require('path')
let fs = require('fs')

var bodyParser = require('body-parser')

// express app instance
let app = express();

const port = 3001;

// public files behind route /static
let static_file_path = path.join(__dirname, 'public');
app.use('/static', express.static(static_file_path));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//--------------------------------------------------------------------------
// Nocache Middleware

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

//--------------------------------------------------------------------------
// API

// static filestore path for api file up and download
let static_filestore_path = path.join(__dirname, 'filestore');


app.get('/', nocache, (req, res) => {
    res.send('Hello World!');
});

app.get('/api/:area/:detail', nocache, (req,res) => {
	res.header("content-type", "application/json");
	let area = req.params.area
    let detail = req.params.detail
    let file_path=path.join(static_filestore_path,'message.json')

    fs.readFile(file_path,(err,data) => {
    	res.end(data)	
    })
})

app.post('/api/:area/:detail', nocache, (req, res) => {
    let area = req.params.area
    let detail = req.params.detail
    let data = req.body
    
    console.log(`POST Info area : ${area} - detail : ${detail}`)

    console.log('Data ', data)

    let file_path=path.join(static_filestore_path,'message.json')
    fs.writeFile(file_path, JSON.stringify(data,null,2), (err) => {
        if (err) throw err;  // TODO: Never do this in production - shutdown of server
        console.log('The file has been saved!');

        let data_ok={
        	area:area,
        	detail:detail,
        	status:'OK'
        }

        res.send(JSON.stringify(data_ok));
    });
    
});

app.put('/api', nocache, (req, res) => {
    res.send('Got a PUT request at /api');
});

app.delete('/api/:id', nocache, (req, res) => {
    res.send('Got a DELETE request for id: ' + req.params.id);
});

app.listen(port,()=>{console.log('express - listen')});


//*******************************************************************
// TEAPOT
app.get('/teapot',nocache,
    function(req, res){
        res.header("content-type", "text/plain");
        res.statusCode = 200;
        res.end('I am a teapot');
    });

//*******************************************************************
// Close
function _close(signal) {
    console.log('received signal [' + signal + ']..');
    process.exit(0);
}

process.on( "SIGHUP",  () => _close('SIGHUP'));
process.on( "SIGINT",  () => _close('SIGINT'));
process.on( "SIGQUIT", () => _close('SIGQUIT'));
process.on( "SIGABRT", () => _close('SIGABRT'));
process.on( "SIGTERM", () => _close('SIGTERM'));

