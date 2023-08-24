import { Avatar, Button, Form, Input, InputNumber, Modal, Row, Select, Typography, Upload } from 'antd';
import { useEffect, useState } from 'react';

import { Checkbox } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { CategoryAPI } from '../../apis/Category.api';
import { CollectionAPI } from '../../apis/Collection.api';
import { ProductAPI } from '../../apis/Product.api';
import { UploadAPI } from '../../apis/Upload.api';
import { useAppDispatch } from '../../app/hooks';
import { UpdateProduct } from '../../app/reducers/Product/Product.reducer';
import { error, success } from '../../helper/toastifyNoti.helper';
import { ICategory } from '../../interface/Category.interface';
import { ICollection } from '../../interface/Collection.interface';
import { IProduct } from '../../interface/Product.interface';
import '../index.css';

interface EditProductProps {
  isModalOpen: boolean;
  setIsModalOpen: (el: boolean) => void;
  record: IProduct;
}

const { Option } = Select;

export default function ModalEditProduct(props: EditProductProps) {
  const [form] = Form.useForm();
  const { isModalOpen, setIsModalOpen, record } = props;
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<ICategory[]>([]);
  const [collection, setCollection] = useState<ICollection[]>([]);
  const plainOptions = ['S', 'M', 'L', 'XL', 'XXL'];

  const onFinishFailed = () => {
    error();
  };

  useEffect(() => {
    CategoryAPI.fetchAll().then((res) => setCategory(res.data));
  }, []);

  useEffect(() => {
    CollectionAPI.fetchAll().then((res) => setCollection(res.data));
  }, []);
  useEffect(() => {
    form.setFieldsValue(record);
    // eslint-disable-next-line
  }, [isModalOpen, record]);
  const onFinish = (product: IProduct) => {
    if (record.id)
      ProductAPI.update(record.id, product)
        .then((result) => {
          dispatch(UpdateProduct(result.data));
          setIsModalOpen(false);
          success();
        })
        .catch((err) => {
          error();
        });
  };

  const upload = (product: IProduct, info: UploadChangeParam, index: number) => {
    const { categories, ...record } = product;
    UploadAPI.upload(info.file.originFileObj as File).then((result) => {
      const photoURL = result.data.files[0].path;
      if (record.id && record.image) {
        const newArray: string[] = record.image.slice();
        newArray.fill(photoURL, index, index + 1);
        ProductAPI.update(record.id, { ...record, image: newArray }).then((result) => {
          dispatch(UpdateProduct(result.data));
        });
      }
    });
  };

  return (
    <>
      <Modal
        cancelText
        destroyOnClose={true}
        open={isModalOpen}
        forceRender
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        title={<Typography.Text>Thêm sản phẩm</Typography.Text>}>
        <Row>
          <Form
            form={form}
            colon={false}
            autoComplete="off"
            className="w-full"
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}>
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              required>
              <Input />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="descaption"
              required>
              <Input />
            </Form.Item>
            <Form.Item
              label="Size"
              name={'size'}>
              <Checkbox.Group
                options={plainOptions}
                defaultValue={['Apple']}
              />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              required>
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Danh mục"
              name="categoriesId"
              required>
              <Select
                value={record.categoriesId}
                style={{ width: 180 }}>
                {category.length > 0 &&
                  category.map((cateProduct: ICategory, index: number) => {
                    return (
                      <Option
                        key={index}
                        value={cateProduct.id}>
                        {cateProduct.name}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Bộ sưu tập"
              name="collectionId">
              <Select
                value={record.collectionId}
                style={{ width: 180 }}>
                {collection.length > 0 &&
                  collection.map((el: ICollection, index: number) => {
                    return (
                      <Option
                        key={index}
                        value={el.id}>
                        {el.name}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name="image"
              preserve={false}
              required>
              <>
                {record.image?.map((res, index) => {
                  return (
                    <Upload
                      key={index}
                      customRequest={(options) => {
                        if (options.onSuccess) {
                          options.onSuccess('ok');
                        }
                      }}
                      onChange={(e) => upload(record, e, index)}
                      maxCount={1}
                      showUploadList={false}>
                      <Avatar
                        src={res}
                        size="large"
                      />
                    </Upload>
                  );
                })}
              </>
            </Form.Item>
            <Form.Item
              label="Đường dẫn"
              name="path">
              <Input disabled />
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
