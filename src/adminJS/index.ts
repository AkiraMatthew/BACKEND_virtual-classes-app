import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { brandingOptions } from "./branding";
import { dashboardOptions } from "./dashboard";
import { authOptions } from "./authentication";
//import { locale } from "./locale";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
    databases: [sequelize],
    rootPath: '/admin',
    resources: adminJsResources,
    branding: brandingOptions,
    dashboard: dashboardOptions,
    //locale: locale,
});

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
    adminJs, 
    authOptions, 
    null, 
    {
        resave: false,
        saveUninitialized: false
    }
);