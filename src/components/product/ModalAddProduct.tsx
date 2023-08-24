import { Button, Form, Input, InputNumber, Modal, Row, Select, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { ProductAPI } from '../../apis/Product.api';
import { UploadAPI } from '../../apis/Upload.api';
import { useAppDispatch } from '../../app/hooks';
import { AddProduct } from '../../app/reducers/Product/Product.reducer';
import { error, success } from '../../helper/toastifyNoti.helper';
import { IProduct } from '../../interface/Product.interface';
import '../index.css';
import { ICategory } from '../../interface/Category.interface';
import { CategoryAPI } from '../../apis/Category.api';
import { ICollection } from '../../interface/Collection.interface';
import { CollectionAPI } from '../../apis/Collection.api';
import { Checkbox } from 'antd';
import { eraserPaper } from '../../helper/eraserPaper.helper';
import GlobalLoading from '../GlobalLoading';

interface AddProductProps {
  isModalOpen: boolean;
  setIsModalOpen: (el: boolean) => void;
}

const { Option } = Select;

export default function ModalAddProduct(props: AddProductProps) {
  const [form] = Form.useForm();
  const { isModalOpen, setIsModalOpen } = props;
  const dispatch = useAppDispatch();
  const [imgPreview, setImgPreview] = useState<string>();
  const [fileImg, setFileImg] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [collection, setCollection] = useState<ICollection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const plainOptions = ['S', 'M', 'L', 'XL', 'XXL'];

  const initialValue: IProduct = { name: '', descaption: '', price: 0, image: [], size: [], categoriesId: '', collectionId: '', path: '' };
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
    form.setFieldsValue(initialValue);
    setImgPreview('');
    setFileImg([]);
    if (inputRef.current) inputRef.current.value = '';
    // eslint-disable-next-line
  }, [isModalOpen]);

  const onFinish = (record: IProduct) => {
    setLoading(true);
    let pathLink = '';
    if (record.name) pathLink = eraserPaper(record.name).toLowerCase().replaceAll(' ', '-');
    if (fileImg)
      UploadAPI.uploadMulti(fileImg).then((result) => {
        const photoURL = result.data.files.map((el: any) => {
          return el.path;
        });

        ProductAPI.create({
          ...record,
          image: photoURL,
          path: pathLink,
        })
          .then((result) => {
            dispatch(AddProduct(result.data));
            setIsModalOpen(false);
            success();
            setLoading(false);
          })
          .catch((err) => {
            error();
          });
      });
  };

  const preventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const count = e.target.files.length;
    for (let i = 0; i < count; i++) {
      const file = e.target.files[i];
      let url = window.URL.createObjectURL(file);
      setImgPreview(url);
      setFileImg((current) => [...current, file]);
    }
  };
  return (
    <>
      <GlobalLoading loading={loading} />
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
                value={''}
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
                value={''}
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
              <div className="">
                <input
                  ref={inputRef}
                  type="file"
                  onChange={(e) => {
                    setFileImg([]);
                    preventChange(e);
                  }}
                  multiple
                />
                <img
                  src={imgPreview}
                  alt=""
                  className="w-[150px] mt-5 object-cover"
                />
              </div>
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
