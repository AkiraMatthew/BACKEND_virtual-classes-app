import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { User } from "../models/User";
import bcrypt from 'bcrypt';

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
    databases: [sequelize],
    rootPath: '/admin',
    resources: adminJsResources,
    branding: {
        companyName: 'OneBitFlix',
        //svg file not working for some reason, needs to dive into it later
        logo: 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSR25pXWrOVuXm2XF6vqtB2Y4l7WMAVnIWZi7V2wQ7qdfNXOy8iD3i9GiQcyjRRiCtFADvZrJePUdfDtTU',
        theme: {
            colors: {
                primary100: '#ff0043',
                primary80: '#ff1a57',
                primary60: '#ff3369',
                primary40: '#ff4d7c',
                primary20: '#ff668f',
                grey100: '#151515',
                grey80: '#333333',
                grey60: '#4d4d4d',
                grey40: '#666666',
                grey20: '#dddddd',
                filterBg: '#333333',
                accent: '#151515',
                hoverBg: '#151515',
            }
        }
    }
});

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        const user = await User.findOne({ where: { email: email } });

        if(user && user.role === 'admin'){
            const matched = await bcrypt.compare(password, user.password);

            if(matched){
                return user
            };
        };

        return false
    },
    cookiePassword: 'cookie-password'
}, null, {
    resave: false,
    saveUninitialized: false
});