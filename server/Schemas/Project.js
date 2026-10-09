import mongoose, { Schema, Model } from "mongoose";

const ProjectProductionStatusEnum = [
  "in_progress",
  "hold",
  "rejected",
  "completed",
];

const ProjectVerificationStatusEnum = ["not_verified", "verified"];

export const ProjectSchema = Schema(
  {
    meta: {
      name: { type: String, trim: true },
      description: { type: String, trim: true },
      members: [{ type: String }],
      team_leader: { type: String, trim: true },
      production_status: {
        type: String,
        eunm: ProjectProductionStatusEnum,
        default: "in_progress",
      },
      verification_status: {
        type: String,
        eunm: ProjectVerificationStatusEnum,
        default: "not_verified",
      },
    },
  },
  { timestamps: true },
);

export const Project = Model("Project", ProjectSchema);
