import { Button, Form, Input, Modal, Row, Typography } from 'antd';
import { CollectionAPI } from '../../apis/Collection.api';
import { useAppDispatch } from '../../app/hooks';
import { AddCollection } from '../../app/reducers/Collection/Collection.reducer';
import { error, success } from '../../helper/toastifyNoti.helper';
import { ICollection } from '../../interface/Collection.interface';
import '../index.css';
import { useEffect } from 'react';

interface AddCollectionProps {
  isModalOpen: boolean;
  setIsModalOpen: (el: boolean) => void;
}

export default function ModalAddCollection(props: AddCollectionProps) {
  const [form] = Form.useForm();
  const { isModalOpen, setIsModalOpen } = props;
  const dispatch = useAppDispatch();

  const initialValue: ICollection = { name: '', path: '' };

  useEffect(() => {
    form.setFieldsValue(initialValue);
    // eslint-disable-next-line
  }, [isModalOpen]);
  const onFinishFailed = () => {
    error();
  };
  const onFinish = (values: ICollection) => {
    CollectionAPI.create(values)
      .then((result) => {
        dispatch(AddCollection(result.data));
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
        title={<Typography.Text>Thêm bộ sưu tập</Typography.Text>}>
        <Row>
          <Form
            form={form}
            preserve={false}
            colon={false}
            autoComplete="off"
            className="w-full"
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}>
            <Form.Item
              label="Tên bộ sưu tập"
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
