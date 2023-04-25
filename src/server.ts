import express from 'express';
import cors from 'cors';
import { adminJs, adminJsRouter } from './adminJS';
import { sequelize } from './database';
import { router } from './routes';

const app = express();

app.use(cors()); //used for different origins requests security

app.use(express.static('public'));

// app.use(path, routes);
app.use(adminJs.options.rootPath, adminJsRouter);

//specifying the body to return as a json() request
app.use(express.json());

//routes
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    sequelize.authenticate().then(() => {
        console.log('DB connection successful');
    });
    console.log(`Server started at PORT ${PORT}`);
});
