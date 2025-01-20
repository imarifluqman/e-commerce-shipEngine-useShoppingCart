// schemas/order.js
import { Rule } from "@sanity/types";
export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "orderId",
      title: "Order ID",
      type: "string",
      description: "Unique identifier for the order",
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: "customer",
      title: "Customer",
      type: "reference",
      to: [{ type: "customer" }], // Assuming you have a "customer" document schema
      description: "Reference to the customer placing the order",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "products" }], // Assuming you have a "product" document schema
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule: Rule) => Rule.required().min(1),
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              validation: (Rule: Rule) => Rule.required().min(0),
            },
          ],
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      description: "Total price for the order",
      validation: (Rule: Rule) => Rule.required().min(0),
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      description: "Date and time when the order was placed",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      description: "Date and time when the order was last updated",
    },
  ],
};
