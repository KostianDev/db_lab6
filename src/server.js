import express from 'express';
import router from './routers/router.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});