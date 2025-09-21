import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Project = {
  projectId: number;
  name: string;
  version: number;
  createDate: string;
  updateDate: string;
};

export type Page<T> = { items: T[]; total: number };

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE ?? "/api",
    credentials: "include",
  }),
  tagTypes: ["Projects"],
  endpoints: (b) => ({
    // 一覧
    getProjects: b.query<Project[], void>({
      query: () => ({ url: "/projects" }),
      providesTags: (res) =>
        res && Array.isArray(res)
          ? [
              ...res.map((p) => ({ type: "Projects" as const, id: p.projectId })),
              { type: "Projects", id: "LIST" },
            ]
          : [{ type: "Projects", id: "LIST" }],
    }),

    // 詳細
    getProject: b.query<Project, number>({
      query: (id) => `/projects/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Projects", id }],
    }),

    // 作成（name だけ送る想定）
    createProject: b.mutation<Project, { name: string }>({
      query: (body) => ({ url: "/projects", method: "POST", body }),
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
    }),

    // 更新（必要なら：/projects/:projectId に PUT）
    updateProject: b.mutation<Project, { projectId: number; name: string }>({
      query: ({ projectId, ...rest }) => ({
        url: `/projects/${projectId}`,
        method: "PUT",
        body: rest, // name など
      }),
      invalidatesTags: (_r, _e, arg) => [{ type: "Projects", id: arg.projectId }],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} = projectsApi;
