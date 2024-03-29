import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { searchUsers } from '@/services/ant-design-pro/api';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '索引',
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户昵称',
    dataIndex: 'username',
    copyable: true,
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    key: 'image',
    valueType: 'image',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    copyable: true,
    valueType: 'select',
    valueEnum: {
      null: { text: '-' },
      0: { text: '男' },
      1: { text: '女' },
    },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '邮件',
    dataIndex: 'email',
    copyable: true,
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'userStatus',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      null: { text: '-', status: 'Default' },
      1: {
        text: '禁用',
        status: 'Error',
        disabled: true,
      },
      0: {
        text: '正常',
        status: 'Success',
        disabled: true,
      },
    },
  },
  {
    disable: true,
    title: '角色',
    dataIndex: 'userRole',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      1: {
        text: '管理员',
        status: 'Success',
        disabled: true,
      },
      0: {
        text: '正常用户',
        status: 'Default',
        disabled: true,
      },
    },
  },
  // {
  //   disable: true,
  //   title: '角色',
  //   dataIndex: 'userRole',
  //   search: false,
  //   renderFormItem: (_, { defaultRender }) => {
  //     return defaultRender(_);
  //   },
  //   render: (_, record) => (
  //     <Space>
  //       {record.labels.map(({ name, color }) => (
  //         <Tag color={color} key={name}>
  //           {name}
  //         </Tag>
  //       ))}
  //     </Space>
  //   ),
  // },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
  },
  // {
  //   title: '创建时间',
  //   dataIndex: 'created_at',
  //   valueType: 'dateRange',
  //   hideInTable: true,
  //   search: {
  //     transform: (value) => {
  //       return {
  //         startTime: value[0],
  //         endTime: value[1],
  //       };
  //     },
  //   },
  // },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async () => {
        const userList = await searchUsers();
        return { data: userList } as any;
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户列表"
    />
  );
};
