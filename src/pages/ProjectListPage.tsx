import { useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { useGetProjectsQuery } from "../stores/project.api";
import type { Project } from "../stores/project.api";

export default function ProjectsListPage() {
  const [q, setQ] = useState("");
  // APIは配列を返す前提。今回はフロント側でのフィルタのみ簡易対応
  const { data, isFetching } = useGetProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  return (
    <>
      <Space style={{ marginBottom: 12 }}>
        <Input.Search
          allowClear
          placeholder="名称で検索"
          onSearch={(v) => {
            setQ(v);
          }}
          style={{ width: 320 }}
        />
        <Button type="primary">
          <Link to="/projects/new">案件作成</Link>
        </Button>
      </Space>

      <Table<Project>
        rowKey="projectId"
        loading={isFetching}
        dataSource={(data ?? []).filter((p) => !q || p.name.includes(q))}
        pagination={false}
        columns={[
          { title: "ID", dataIndex: "projectId", sorter: (a, b) => a.projectId - b.projectId, width: 80 },
          { title: "案件名", dataIndex: "name", sorter: (a, b) => a.name.localeCompare(b.name), render: (v, r) => <Link to={`/projects/${r.projectId}`}>{v}</Link> },
          { title: "版数", dataIndex: "version", sorter: (a, b) => a.version - b.version, width: 100 },
          { title: "作成日", dataIndex: "createDate", sorter: (a, b) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime(), width: 180 },
          { title: "更新日", dataIndex: "updateDate", sorter: (a, b) => new Date(a.updateDate).getTime() - new Date(b.updateDate).getTime(), width: 180 },
        ]}
      />
    </>
  );
}
