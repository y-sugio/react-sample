import { Button, Layout, Space, Typography } from "antd";
import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <Layout.Header
      style={{
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        paddingInline: 16,
        gap: 12,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          background: "#1677ff",
        }}
        aria-label="logo"
      />
      <Typography.Title level={4} style={{ margin: 0 }}>
        案件管理
      </Typography.Title>

      <span style={{ marginLeft: "auto" }} />
      <Space>
        <Button type="primary">
          <Link to="/projects/new">案件作成</Link>
        </Button>
      </Space>
    </Layout.Header>
  );
}

