import { Prisma, Projects } from "@prisma/client";
import { prisma } from "../../../config/db";
import { deleteFileFormCloudinary } from "../../../config/cloudinary.config";

// * create project
const createProject = async (payload: Prisma.ProjectsCreateInput): Promise<Projects> => {
  const result = await prisma.projects.create({
    data: payload,
  });
  return result;
};

// * get all projects
const getAllProjects = async (): Promise<Partial<Projects>[]> => {
  const result = await prisma.projects.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      shortDescription: true,
      liveLink: true,
      frontendLink: true,
      backendLink: true,
      photo: true,
      altText: true,
      category: true,
      technologies: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

// * get project by id
const getProjectById = async (id: string): Promise<Projects | null> => {
  const result = await prisma.projects.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// * update project
const updateProject = async (
  id: string,
  payload: Partial<Prisma.ProjectsUpdateInput> & { deletePhoto?: string }
): Promise<Projects> => {
  const { deletePhoto, ...rest } = payload;

  const result = await prisma.projects.update({
    where: {
      id,
    },
    data: rest,
  });

  if (deletePhoto) {
    await deleteFileFormCloudinary(deletePhoto);
  }

  return result;
};

// * delete project
const deleteProject = async (id: string): Promise<void> => {
  const result = await prisma.projects.delete({
    where: {
      id,
    },
  });

  await deleteFileFormCloudinary(result.photo);
};

export const projectService = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
