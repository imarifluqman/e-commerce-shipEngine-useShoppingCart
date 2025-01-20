// schemas/customer.ts
import { Rule } from "@sanity/types";
export default {
  name: "customer",
  title: "Customer",
  type: "document",
  fields: [
    {
      name: "firstName",
      title: "First Name",
      type: "string",
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: Rule) => Rule.email(),
    },
  ],
};
