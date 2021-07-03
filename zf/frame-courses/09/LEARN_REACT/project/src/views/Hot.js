import React from 'react';
import { Table, Button, Space } from 'antd';
// import { getHotData } from '../store/actions/getdata'
import { hot_getData } from '../api/index'

const columns = [
  {
    title: '商品名称',
    dataIndex: 'configName',
  },
  {
    title: '跳转链接',
    dataIndex: 'redirectUrl',
    render: (text, record) => (<a>{text}</a>)
  },
  {
    title: '排序值',
    dataIndex: 'configRank',
  },
  {
    title: '商品编号',
    dataIndex: 'goodsId',
  },
  {
    title: '添加时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    render: (text, record) => (
      <Space size="middle">
        <a>修改</a>
        <a>删除</a>
      </Space>
    ),
  },
];

class Hot extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    data: [],
    pageNumber: 1,
    total: 1
  };
  componentDidMount() {
    this.getData()
  }
  getData() {
    hot_getData({
      pageNumber: this.state.pageNumber,
      pageSize: 10
    }).then(data => {
      console.log(data)
      this.setState({
        data: data.data.list.map(item => {
          item.key = item.configId
          return item
        }),
        total: data.data.totalCount
      })
    })
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  pageChange = (n) => {
    this.setState({
      pageNumber: n
    }, () => {
      this.getData()
    })
  }
  render() {
    const { loading, selectedRowKeys, data, pageNumber, total } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" className='add_btn'>
            +新增
          </Button>
          <Button type="primary" danger>
            批量删除
          </Button>
        </div>
        <Table size='small'
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={{
            defaultCurrent: pageNumber,
            total: total,
            onChange: this.pageChange
          }}
        />
      </div>
    );
  }
}
export default Hot