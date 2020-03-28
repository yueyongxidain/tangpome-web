import { Avatar, Button, Divider, Table, Tag } from 'antd';
import { observer } from 'mobx-react'
import * as React from 'react';
import './lullaby.less'
import store from './lullabyStore'
import Modal from './modal'
let page: object = {}
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
        title: '歌曲名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '地址',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
            if (text * 1 === 1) {
                return <Tag color="#87d068">营业中</Tag>
            } else {
                return <Tag color="#f50">休息中</Tag>
            }
        }
    },
    {
        title: '封面图',
        dataIndex: 'coverImage',
        key: 'coverImage',
        render: (text) => {
            if (text) {
                return <Avatar src={text} />
            } else {
                return <a >暂无</a>
            }
        }
    },
    {
        title: '创建时间',
        dataIndex: 'businessTime',
        key: 'businessTime',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
            return (<span>

                <a onClick={() => page.hasOwnProperty('edit') ? page['edit'](record) : null}>编辑</a>
                <Divider type="vertical" />
                <a onClick={() => page.hasOwnProperty('edit') ? page['edit'](record) : null}>休息</a>
                <Divider type="vertical" />
                <a onClick={() => page.hasOwnProperty('edit') ? page['edit'](record) : null}>营业</a>
                <Divider type="vertical" />
                <a onClick={() => page.hasOwnProperty('delete') ? page['delete'](record) : null}>冻结</a>
            </span>)
        }
    }
];

@observer
class App extends React.Component<any, {}> {

    public componentDidMount = () => {
        page = this
        store.findMserchant()
    }
    edit = () => {
        // const { save } = store
        // save({
        //     visible: true
        // })
    }
    // 创建新商家
    create = () => {
        const { save } = store
        save({
            visible: true
        })
    }
    public render() {
        const { datasource, loading } = store
        return (
            <div>
                <div style={{ margin: '12px' }}>
                    <Button onClick={this.create} type="primary">创建新商家</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={datasource}
                    loading={loading}
                    rowKey='index'
                    pagination={false}
                />
                <Modal />
            </div>
        )
    }
}

export default App;
