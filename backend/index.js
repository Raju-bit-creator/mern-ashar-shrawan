const express= require('express')
var cors = require('cors')
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const dbConnect = require('./db')
const app = express()
dbConnect()
//  get post update delete crud
const port= 5000
app.use(cors())
app.use(express.json())


// Ensure the uploads directory exists
const ensureUploadsDirectoryExists = () => {
   const dir = path.join(__dirname, 'uploads');
   if (!fs.existsSync(dir)) {
       fs.mkdirSync(dir, { recursive: true });
   }
};

// Call this to create the directory if it doesn't exist
ensureUploadsDirectoryExists();

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
       ensureUploadsDirectoryExists(); // Ensure the directory exists before saving the file
       cb(null, path.join(__dirname, 'uploads')); // Use absolute path
   },
   filename: function (req, file, cb) {
       let ext = path.extname(file.originalname);
       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
       cb(null, file.fieldname + '-' + uniqueSuffix);
   }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
   res.send({ filePath: `/uploads/${req.file.filename}` });
});



 app.get('/', (req, res)=>{
    res.send('hello nepal')
 })

app.use('/api/auth', require('./routes.js/Auth'))
app.use('/api/product',upload.array("myfile"), require('./routes.js/Product'))

 app.listen(port,()=>{
  console.log(`api is listening on port: ${port}`);
})
//crud create read update delete