// /src/pages/ProjectDetailPage.tsx
import { Descriptions, Skeleton, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../stores/project.api";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const pid = Number(id);
  const { data, isLoading } = useGetProjectQuery(pid, {
    skip: Number.isNaN(pid),
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) return <Skeleton active />;
  if (!data) return <Typography.Text type="danger">案件が見つかりません</Typography.Text>;

  return (
    <Descriptions bordered column={1} title={`案件詳細 / ${data.name}`}>
      <Descriptions.Item label="ID">{data.projectId}</Descriptions.Item>
      <Descriptions.Item label="案件名">{data.name}</Descriptions.Item>
      <Descriptions.Item label="バージョン">{data.version}</Descriptions.Item>
      <Descriptions.Item label="作成日">{data.createDate}</Descriptions.Item>
      <Descriptions.Item label="更新日">{data.updateDate}</Descriptions.Item>
    </Descriptions>
  );
}
