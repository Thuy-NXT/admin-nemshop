import { useEffect, useState } from 'react';
import { ProductAPI } from '../../apis/Product.api';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Popconfirm, Row, Table, Typography, Upload } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { GetProduct, SetProduct, DeleteProduct, UpdateProduct } from '../../app/reducers/Product/Product.reducer';
import { IProduct } from '../../interface/Product.interface';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadAPI } from '../../apis/Upload.api';
import { CategoryAPI } from '../../apis/Category.api';
import { error } from '../../helper/toastifyNoti.helper';
import { ICategory } from '../../interface/Category.interface';
import { ICollection } from '../../interface/Collection.interface';
import { CollectionAPI } from '../../apis/Collection.api';
import ModalAddProduct from '../../components/product/ModalAddProduct';
import ModalEditProduct from '../../components/product/ModalEditProduct';
import GlobalLoading from '../../components/GlobalLoading';

export default function Product() {
  const [loading, setLoading] = useState<boolean>(true);
  const dataProduct = useAppSelector(GetProduct);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [collection, setCollection] = useState<ICollection[]>([]);

  useEffect(() => {
    ProductAPI.fetchAll().then((res) => {
      dispatch(SetProduct(res.data));
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    CategoryAPI.fetchAll().then((res) => {
      setCategory(res.data);
    });
  }, [dispatch]);

  useEffect(() => {
    CollectionAPI.fetchAll().then((res) => {
      setCollection(res.data);
    });
  }, [dispatch]);

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

  const columns = [
    {
      title: 'STT',
      render: (_: null, __: IProduct, index: number) => {
        return <Typography.Title level={5}>{index + 1}</Typography.Title>;
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'descaption',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
    },
    {
      title: 'Size',
      render: (_: null, record: IProduct) => {
        return <>{record.size?.map((el, index) => el + '-')}</>;
      },
    },
    {
      title: 'Đường dẫn',
      dataIndex: 'path',
    },
    {
      title: 'Danh mục',
      render: (_: null, record: IProduct) => {
        return (
          <>
            {category.map((el) => {
              if (el.id === record.categoriesId) {
                return el.name;
              }
              return null;
            })}
          </>
        );
      },
    },
    {
      title: 'Bộ sưu tập',
      render: (_: null, record: IProduct) => {
        return (
          <>
            {collection.map((el) => {
              if (el.id === record.collectionId) {
                return el.name;
              }
              return null;
            })}
          </>
        );
      },
    },
    {
      title: 'Hình ảnh',
      render: (_: null, record: IProduct) => {
        return (
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
        );
      },
    },
    {
      title: 'Thiết lập',
      render: (_: null, record: IProduct) => {
        return <TableItem record={record} />;
      },
    },
  ];
  return (
    <>
      <GlobalLoading loading={loading} />
      <Row className="mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="mr-4"
          onClick={() => setIsModalOpen(true)}></Button>
      </Row>
      <ModalAddProduct
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Table
        columns={columns}
        dataSource={dataProduct}
        bordered
        rowKey="id"
        pagination={false}
      />
    </>
  );
}
interface ITableItemProps {
  record: IProduct;
}
function TableItem(props: ITableItemProps) {
  const { record } = props;
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const deleteRecord = () => {
    if (record.id) {
      ProductAPI.delete(record.id)
        .then(() => {
          dispatch(DeleteProduct(record));
        })
        .catch((err) => {
          error();
        });
    }
  };
  return (
    <>
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa không?"
        onConfirm={deleteRecord}>
        <Typography.Link className="mr-4">
          <DeleteOutlined style={{ fontSize: '130%' }} />
        </Typography.Link>
      </Popconfirm>

      <Typography.Link
        className="mr-4"
        onClick={() => {
          setIsModalOpen(true);
        }}>
        <EditOutlined style={{ fontSize: '130%' }} />
      </Typography.Link>

      <ModalEditProduct
        record={record}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
