import { ResourceWithOptions } from "adminjs";
import { Category } from "../../../models";
import { CategoryResourceOptions } from "./category";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: CategoryResourceOptions
    }
]