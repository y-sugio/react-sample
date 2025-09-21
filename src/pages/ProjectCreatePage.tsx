// /src/pages/ProjectCreatePage.tsx
import { Button, Form, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProjectMutation } from "../stores/project.api";
import { useNavigate } from "react-router-dom";

// cache invalidation is handled by the mutation; no extra dispatch needed

const schema = z.object({
  name: z.string().trim().min(1, "案件名は必須です").max(100, "100文字以内で入力してください"),
});
type FormValues = z.infer<typeof schema>;

export default function ProjectCreatePage() {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {  name: "", },
  });

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (v) => {
    try {
      await createProject({
        name: v.name,
      }).unwrap();

      message.success("作成しました");
      reset();
      navigate("/projects");
    } catch (e: any) {
      message.error(e?.data?.message ?? e?.message ?? "作成に失敗しました");
    }
  });

  return (
    <Form layout="vertical" onFinish={onSubmit} style={{ maxWidth: 720 }}>
      <Form.Item label="案件名" required hasFeedback validateStatus={errors.name ? "error" : undefined} help={errors.name?.message}>
        <Controller name="name" control={control} render={({ field }) => <Input {...field} />} />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isLoading} disabled={!isValid || isLoading}>作成</Button>
    </Form>
  );
}
