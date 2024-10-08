import express from "express";
import mysql from "mysql";
import cors from 'cors';
import multer from 'multer'; 
import path from 'path'; // Import path (optional, but useful for handling file paths)


const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass_12345",
    database: "test"
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save files with a unique name
    }
});

const upload = multer({ storage });

app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory

app.use(express.json());
app.use(cors());

db.connect((err) => {
    if (err) {
        console.log("Database connection failed: ", err);
    } else {
        console.log("Connected to the database");
    }
});

app.get("/", (req, res) => {
    res.json("Hello, this is the backend");
});

// Fetch all books
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json("error exists");
        return res.json(data);
    });
});

// Fetch a specific book by ID (Newly Added Route)
app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "SELECT * FROM books WHERE id = ?";
    db.query(q, [bookId], (err, data) => {
        if (err) {
            console.error("Error fetching book:", err);
            return res.status(500).json("An error occurred");
        }
        return res.json(data[0]); // Send the first item from the result array
    });
});

// Add a new book
app.post("/books", upload.single('cover'), (req, res) => {
    const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.file ? req.file.filename : null, // Store the filename of the uploaded cover
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been created!");
    });
});


// Delete a book by ID
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted!");
    });
});

// Update a book by ID
app.put("/books/:id", upload.single('cover'), (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.file ? req.file.filename : req.body.cover, // Use the new file if uploaded, else keep existing
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been updated!");
    });
});


app.listen(8800, () => {
    console.log("connected to backend");
});
