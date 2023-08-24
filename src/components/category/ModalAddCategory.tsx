import { Button, Form, Input, Modal, Row, Typography } from 'antd';

import { CategoryAPI } from '../../apis/Category.api';
import { useAppDispatch } from '../../app/hooks';
import { AddCategory } from '../../app/reducers/Category/Category.reducer';
import { ICategory } from '../../interface/Category.interface';
import '../index.css';
import { success, error } from '../../helper/toastifyNoti.helper';
import { useEffect } from 'react';

interface AddCategoryProps {
  isModalOpen: boolean;
  setIsModalOpen: (el: boolean) => void;
}

export default function ModalAddCategory(props: AddCategoryProps) {
  const [form] = Form.useForm();
  const { isModalOpen, setIsModalOpen } = props;
  const dispatch = useAppDispatch();

  const initialValue: ICategory = { name: '', path: '' };

  useEffect(() => {
    form.setFieldsValue(initialValue);
    // eslint-disable-next-line
  }, [isModalOpen]);
  const onFinishFailed = () => {
    error();
  };
  const onFinish = (values: ICategory) => {
    CategoryAPI.create(values)
      .then((result) => {
        dispatch(AddCategory(result.data));
        success();
        setIsModalOpen(false);
      })
      .catch((err) => {
        error();
      });
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        forceRender
        destroyOnClose={true}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        title={<Typography.Text>Thêm Danh mục</Typography.Text>}>
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
}
