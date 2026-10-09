import mongoose, { Schema, Model } from "mongoose";

const PriorityEnum = ["low", "medium", "high", "urgent"];

const StatusEnum = ["in_progress", "completed", "delayed", "removed"];

export const TodoSchema = Schema(
  {
    label: { type: String, trim: true },
    priority: {
      type: string,
      enum: PriorityEnum,
      default: "medium",
    },
    status: {
      type: string,
      enum: StatusEnum,
      default: "in_progress",
    },
    members: {
      type: [
        {
          id: { type: String, trim: true },
          priority: {
            type: string,
            enum: PriorityEnum,
            default: "medium",
          },
          status: {
            type: string,
            enum: StatusEnum,
            default: "in_progress",
          },
        },
      ],
    },
    completedAt: { type: mongoose.SchemaTypes.Date },
  },
  {
    timestamps: true,
  },
);

export const Todo = Model("Todo", TodoSchema);
