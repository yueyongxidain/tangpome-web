import { Avatar, Input, Select, Table, Tag } from 'antd';
import { isEmpty, isUndefined } from 'lodash'
import { observer } from 'mobx-react'
import * as React from 'react';
import './user.less'
import store from './userStore'
const Option = Select.Option
const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, index) => {
            return index + 1
        }
    },
    {
        title: '头像',
        dataIndex: 'avatarUrl',
        key: 'avatarUrl',
        render: (text) => {
            return <Avatar src={text} />
        }
    },
    {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName'
    },
    {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        render: (text) => {
            if (text) { return <Tag color="cyan">男</Tag> }
            else { return <Tag color="magenta">女</Tag> }
        }
    },
    {
        title: '国家',
        dataIndex: 'country',
        key: 'country'
    },
    {
        title: '省',
        dataIndex: 'province',
        key: 'province'
    },
    {
        title: '市',
        dataIndex: 'city',
        key: 'city'
    },
    {
        title: '加入时间',
        dataIndex: 'createdAt',
        key: 'createdAt'
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action'
    }
];


@observer
class App extends React.Component<any, {}> {

    public componentDidMount = () => {
        // 发请求
        const { pageNum, pageSize } = store
        store.findUser({ pageNum, pageSize })

    }
    // 分页点击事件
    pageChange = (pageNum, pageSize) => {
        this.props.user.findUser({ pageNum, pageSize })
    }
    // 性别改变
    genderChange = (value) => {
        const { pageNum, pageSize, where } = store
        !isUndefined(value) ?
            store.findUser({ pageNum, pageSize, where: { ...where, gender: value } }) :
            store.findUser({ pageNum, pageSize })
    }
    // 昵称改变
    nickNameChange = (value) => {
        const { pageNum, pageSize, where } = store
        !isEmpty(value) ?
            this.props.user.findUser({ pageNum, pageSize, where: { ...where, nickName: value } }) :
            this.props.user.findUser({ pageNum, pageSize, where })
    }
    public render() {
        const { datasource, loading, pageNum, pageSize, total } = store
        return (
            <div>
                <div className='user-search'>
                    <Input.Search placeholder="昵称" style={{ width: '120px' }} onSearch={this.nickNameChange} />
                    <Select
                        placeholder="性别 ALL"
                        style={{ width: 120 }}
                        onChange={this.genderChange}
                        allowClear={true}
                    >
                        <Option value="1">男</Option>
                        <Option value="0">女</Option>
                    </Select>
                </div>

                <Table
                    columns={columns}
                    dataSource={datasource}
                    loading={loading}
                    rowKey='openid'
                    pagination={
                        {
                            current: pageNum,
                            pageSize,
                            onChange: this.pageChange,
                            total
                        }

                    }
                />
            </div>
        )
    }
}

export default App;
