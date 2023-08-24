import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Row, Table, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { CategoryAPI } from '../../apis/Category.api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DeleteCategory, GetCategory, SetCategory } from '../../app/reducers/Category/Category.reducer';
import ModalAddCategory from '../../components/category/ModalAddCategory';
import ModalEditCategory from '../../components/category/ModalEditCategory';
import { ICategory } from '../../interface/Category.interface';

export default function Category() {
  const dataCategory = useAppSelector(GetCategory);
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    CategoryAPI.fetchAll().then((res) => {
      dispatch(SetCategory(res.data));
    });
  }, [dispatch]);

  const columns = [
    {
      title: 'STT',
      render: (_: null, __: ICategory, index: number) => {
        return <div className="font-bold">{index + 1}</div>;
      },
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      width: '40%',
    },
    {
      title: 'Đường dẫn',
      dataIndex: 'path',
      width: '40%',
    },
    {
      title: 'Thiết lập',
      render: (_: null, record: ICategory) => {
        return <TableItem record={record} />;
      },
    },
  ];
  return (
    <>
      <Row className="mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="mr-4"
          onClick={() => setIsModalOpen(true)}></Button>
      </Row>
      <ModalAddCategory
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Table
        columns={columns}
        dataSource={dataCategory}
        bordered
        rowKey="id"
        pagination={false}
      />
    </>
  );
}
interface ITableItemProps {
  record: ICategory;
}
function TableItem(props: ITableItemProps) {
  const { record } = props;
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const deleteRecord = () => {
    if (record.id) {
      CategoryAPI.delete(record.id)
        .then(() => {
          dispatch(DeleteCategory(record));
        })
        .catch((err) => {
          message.error('Error');
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
        onClick={() => setIsModalOpen(true)}>
        <EditOutlined style={{ fontSize: '130%' }} />
      </Typography.Link>

      <ModalEditCategory
        record={record}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
