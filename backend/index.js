const connectToMongo = require('./db');
connectToMongo();
const bodyParser = require('body-parser');

const express = require('express');
const { body, validationResult } = require('express-validator');
var cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const Student = require('./models/Student');

app.post('/api/register', [
], async (req, res) => {
  const errors = validationResult(req);
  try {
    let student = await Student.findOne({ rollNo: req.body.rollNo });
    if (student) {
      return res.status(400).json({ error: 'A Student with this rollNo already exists!' });
    }

    student = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      rollNo: req.body.rollNo,
      password: req.body.password,
      contactNumber: req.body.contactNumber,
    });

    return res.status(200).json({ success: true, message: 'Student registered successfully!' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
});


app.get('/api/fetchStudents', async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    console.error('Error fetching student data:', error);

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/updateStudent/:id', async (req, res) => {
  const studentId = req.params.id;
  
  try {
      const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, { new: true });
      res.json(updatedStudent);
  } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/deleteStudent/:id', async (req, res) => {
  const studentId = req.params.id;
  
  try {
      const deletedStudent = await Student.findByIdAndDelete(studentId);
      res.json({ message: `Deleted student with ID ${studentId}`, deletedStudent });
  } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.listen(PORT, () => {
  console.log(`Student Management System is running on port ${PORT}`);
});
