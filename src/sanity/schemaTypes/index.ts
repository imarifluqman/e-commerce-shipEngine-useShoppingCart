import { type SchemaTypeDefinition } from "sanity";

import postForm from "./post-form";
import products from "./products";
import order from "./order";
import customer from "./customer";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postForm, products, order, customer],
};
