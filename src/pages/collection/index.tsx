import { useEffect, useState } from 'react';
import { CollectionAPI } from '../../apis/Collection.api';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Row, Table, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ICollection } from '../../interface/Collection.interface';
import { GetCollection, SetCollection, DeleteCollection } from '../../app/reducers/Collection/Collection.reducer';
import ModalAddCollection from '../../components/collection/ModalAddCollection';
import ModalEditCollection from '../../components/collection/ModalEditCollection';

export default function Collection() {
  const dataCollection = useAppSelector(GetCollection);
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    CollectionAPI.fetchAll().then((res) => {
      dispatch(SetCollection(res.data));
    });
  }, [dispatch]);

  const columns = [
    {
      title: 'STT',
      render: (_: null, __: ICollection, index: number) => {
        return <div className="font-bold">{index + 1}</div>;
      },
    },
    {
      title: 'Tên bộ sưu tập',
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
      render: (_: null, record: ICollection) => {
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
      <ModalAddCollection
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Table
        columns={columns}
        dataSource={dataCollection}
        bordered
        rowKey="id"
        pagination={false}
      />
    </>
  );
}
interface ITableItemProps {
  record: ICollection;
}
function TableItem(props: ITableItemProps) {
  const { record } = props;
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const deleteRecord = () => {
    if (record.id) {
      CollectionAPI.delete(record.id)
        .then(() => {
          dispatch(DeleteCollection(record));
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

      <ModalEditCollection
        record={record}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
