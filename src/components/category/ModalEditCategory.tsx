import { Button, Form, Input, Modal, Row, Typography } from 'antd';
import { useEffect } from 'react';
import { CategoryAPI } from '../../apis/Category.api';
import { useAppDispatch } from '../../app/hooks';
import { UpdateCategory } from '../../app/reducers/Category/Category.reducer';
import { error, success } from '../../helper/toastifyNoti.helper';
import { ICategory } from '../../interface/Category.interface';
import '../index.css';

interface IEditCategoryProps {
  isModalOpen: boolean;
  setIsModalOpen: (el: boolean) => void;
  record: ICategory;
}
const ModalEditCategory = (props: IEditCategoryProps) => {
  const [form] = Form.useForm();
  const { isModalOpen, setIsModalOpen, record } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    form.setFieldsValue({
      name: record.name,
      path: record.path,
    });
  }, [record, form, isModalOpen]);
  const onFinishFailed = () => {
    error();
  };

  const onFinish = (values: ICategory) => {
    if (record.id) {
      CategoryAPI.update(record.id, values)
        .then((result) => {
          success();
          dispatch(UpdateCategory(result.data));
          setIsModalOpen(false);
        })
        .catch(() => {
          error();
        });
    }
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        destroyOnClose={true}
        forceRender
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        title={<Typography.Text>Chỉnh sửa danh mục</Typography.Text>}>
        <Row>
          <Form
            form={form}
            colon={false}
            preserve={false}
            autoComplete="off"
            className="w-full"
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}>
            <Form.Item
              label="Tên danh mục"
              name="name"
              required>
              <Input />
            </Form.Item>
            <Form.Item
              label="Đường dẫn"
              required
              name="path">
              <Input />
            </Form.Item>
            <Row className="justify-end">
              <Button
                className="mr-4"
                onClick={() => setIsModalOpen(false)}>
                Đóng
              </Button>
              <Button
                type="primary"
                htmlType="submit">
                Lưu
              </Button>
            </Row>
          </Form>
        </Row>
      </Modal>
    </>
  );
};

export default ModalEditCategory;
