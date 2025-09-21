// /src/router/index.tsx
import { Routes, Route } from "react-router-dom";
import ProjectsListPage from "../pages/ProjectListPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import ProjectCreatePage from "../pages/ProjectCreatePage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProjectsListPage />} />
      <Route path="/projects" element={<ProjectsListPage />} />
      <Route path="/projects/new" element={<ProjectCreatePage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
    </Routes>
  );
}