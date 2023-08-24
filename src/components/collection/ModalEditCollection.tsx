import { Button, Form, Input, Modal, Row, Typography } from 'antd';
import { useEffect } from 'react';
import { CollectionAPI } from '../../apis/Collection.api';
import { useAppDispatch } from '../../app/hooks';
import { UpdateCollection } from '../../app/reducers/Collection/Collection.reducer';
import { error, success } from '../../helper/toastifyNoti.helper';
import { ICollection } from '../../interface/Collection.interface';
import '../index.css';

interface IEditCollectionProps {
  isModalOpen: boolean;
  setIsModalOpen: (el: boolean) => void;
  record: ICollection;
}
const ModalEditCollection = (props: IEditCollectionProps) => {
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

  const onFinish = (values: ICollection) => {
    if (record.id) {
      CollectionAPI.update(record.id, values)
        .then((result) => {
          dispatch(UpdateCollection(result.data));
          setIsModalOpen(false);
          success();
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
        title={<Typography.Text>Chỉnh sửa bộ sưu tập</Typography.Text>}>
        <Row>
          <Form
            preserve={false}
            form={form}
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
};

export default ModalEditCollection;
