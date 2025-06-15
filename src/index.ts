// console.log('hello world');

import express from 'express';

import notesRoutes from  './modular/notes.routes';
import prisma from './config/database';

const app = express();

app.use((req,res,next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
})

app.use('/api/notes', notesRoutes)

app.use(express.json());

app.get('/users/:id', (req,  res) => {
    const id = req.params.id
    res.send('users dengan' + id);
})

app.get('/users', (req,  res) => {
    const name = req.query.name
    res.send('users dengan nama' + name);
})

app.get('/notes', async (req,res) => {
    await prisma.notes.create({
        data: {
            title: 'note 1',
            content: 'bisa'
        }
    })
    res.status (200).json({
        message: 'data berhasil dibuat'
    })
})

 app.listen(3000, () => {
        console.log('server is running on port 3000');
    })