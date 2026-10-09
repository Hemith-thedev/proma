import { Schema, model } from "mongoose";

const accountStatusEnum = [
  "pending",
  "active",
  "disabled",
  "rejected",
  "archived",
];
const roleEnum = ["admin", "team_leader", "member"];
const accessRequestStatusEnum = [
  "pending",
  "accepted",
  "rejected",
  "cancelled",
];
const presenceStatusEnum = ["available", "away", "busy", "offline"];
const attendanceStatusEnum = ["present", "absent", "late", "remote", "leave"];

export const userSchema = new Schema(
  {
    details: {
      username: { type: String, required: true, trim: true },
      first_name: { type: String, required: true, trim: true },
      last_name: { type: String, required: true, trim: true },
      age: { type: String, required: true },
      role: { type: String, enum: roleEnum, required: true },
      about: { type: String, default: "" },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      password: { type: String, required: true },
      team_leaders_ids: [{ type: String }],
    },
    meta: {
      account_status: {
        type: String,
        enum: accountStatusEnum,
        default: "pending",
      },
      access_request_status: {
        type: String,
        enum: accessRequestStatusEnum,
        default: "pending",
      },
      attendace_status: {
        type: String,
        enum: attendanceStatusEnum,
        default: "present",
      }, // Note: kept your spelling from the interface ra!
      presence_status: {
        type: String,
        enum: presenceStatusEnum,
        default: "offline",
      },
    },
    preferences: {
      enable_animations: { type: Boolean, default: true },
      enable_age: { type: Boolean, default: true },
      enable_high_contrast: { type: Boolean, default: false },
      enable_motion_blur: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  },
);

export default User = model("User", userSchema);
