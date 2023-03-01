import { ResourceWithOptions } from "adminjs";
import { Category, Course } from "../../models";
import { CategoryResourceOptions } from "./category";
import { courseResourceOptions } from "./course";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: CategoryResourceOptions
    },
    {
        resource: Course,
        options: courseResourceOptions
    }
]