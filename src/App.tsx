// /src/App.tsx
import { Layout, Menu } from "antd";
import { BrowserRouter, Link } from "react-router-dom";
import { AppRoutes } from "./router/index";
import AppHeader from "./components/AppHeader";

export default function App() {
  return (
    <BrowserRouter>
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <AppHeader />
        <Layout style={{ height: "calc(100vh - 64px)", overflow: "hidden" }}>
          <Layout.Sider
            collapsible
            style={{
              height: "100%",
              position: "sticky",
              top: 64,
              overflow: "auto",
            }}
          >
            <Menu
              theme="dark"
              mode="inline"
              items={[
                { key: "list", label: <Link to="/projects">案件一覧</Link> },
                { key: "new", label: <Link to="/projects/new">案件作成</Link> },
              ]}
            />
          </Layout.Sider>
          <Layout.Content style={{ padding: 16, height: "100%", overflow: "auto" }}>
            <AppRoutes />
          </Layout.Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}
