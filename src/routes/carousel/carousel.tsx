import { Avatar, Divider, Table } from 'antd';
import { observer } from 'mobx-react'
import * as React from 'react';
import './carousel.less'
import store from './carouselStore'
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
        title: '图像',
        dataIndex: 'picUrl',
        key: 'picUrl',
        render: (text) => {
            if (text) {
                return <Avatar src={text} />
            } else {
                return <a>暂无</a>
            }
        }
    },
    {
        title: '关联商品名称',
        dataIndex: 'nickName',
        key: 'nickName',
        render: (text) => {
            if (text) {
                return <Avatar src={text} />
            } else {
                return <a >暂无</a>
            }
        }
    },
    {
        title: '更新时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
            return (<span>

                <a onClick={() => page.hasOwnProperty('edit') ? page['edit'](record) : null}>编辑</a>
                <Divider type="vertical" />
                <a >清空</a>
            </span>)
        }
    }
];

@observer
class App extends React.Component<any, {}> {

    public componentDidMount = () => {
        // tslint:disable-next-line: no-console
        console.log(this)
        page = this
        // 发请求
        // tslint:disable-next-line: no-console
        // console.log(this.props)
        store.findCarousel()

    }
    edit = () => {
        //
        // tslint:disable-next-line: no-console
        console.log('编辑')
        const { save } = store
        save({
            visible: true
        })
    }
    public render() {
        const { datasource, loading } = store

        if (datasource.length < 5) {
            for (let i = datasource.length === 0 ? 0 : (datasource.length - 1); i < 5; i++) {
                datasource.push({
                    id: datasource.length
                })
            }
        }
        // tslint:disable-next-line: no-console
        // console.log(datasource)
        return (
            <div>
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
