import app from './app';

const port: Number = 3000;
app.listen(port, () => {
    console.log(`Express server started on port ${port}`);
});
