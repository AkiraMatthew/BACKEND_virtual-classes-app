import express from 'express';
import { adminJs, adminJsRouter } from './adminJS';
import { sequelize } from './database';

const app = express();

app.use(express.static('public'))

// app.use(path, routes);
app.use(adminJs.options.rootPath, adminJsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    sequelize.authenticate().then(() => {
        console.log('DB connection successful')
    })
    console.log(`Server started at PORT ${PORT}`)
});