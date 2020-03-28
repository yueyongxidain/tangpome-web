import { Button, Divider, Icon, Table, Tooltip } from 'antd';
import { inject, observer } from 'mobx-react'
import * as moment from 'moment'
import * as React from 'react';
import './childrenSong.less'
import Modal from './detail'

let page: any = null

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
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text) => {
            return <span><Icon type='customer-service' /> {text}</span>
        }
    },
    {
        title: '地址',
        dataIndex: 'adress',
        key: 'adress',
        width: '40%',
        render: (text) => {
            return <Tooltip title={text} >
                <a href={text}>{text.slice(0, 60)}</a>
            </Tooltip>
        }
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text) => {
            return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    {
        title: '更新时间',
        dataIndex: 'updatedId',
        key: 'updatedId',
        render: (text) => {
            return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
            return (<span>

                <a onClick={() => page.edit(record)}>编辑</a>
                <Divider type="vertical" />
                <a onClick={() => page.delete(record.id)}>删除</a>
            </span>)
        }
    }
];

@inject('Carousel')
@observer
class App extends React.Component<any, {}> {

    componentDidMount = () => {
        page = this
        this.props.Carousel.findGoods()
    }
    edit = (record) => {
        const { save } = this.props.Carousel
        save({
            visible: true,
            current: record
        })
    }

    // 创建新商品
    create = () => {
        const { save } = this.props.Carousel
        save({
            visible: true,
            current: {}
        })
    }

    // 删除文革
    delete = (id) => {
        this.props.Carousel.delete(id)
    }
    public render() {
        const { datasource, loading } = this.props.Carousel
        return (
            <div>
                <div style={{ margin: '12px' }}>
                    <Button onClick={this.create} type="primary">增加儿歌</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={datasource}
                    loading={loading}
                    rowKey='id'
                    pagination={false}
                />
                <Modal />
            </div>
        )
    }
}

export default App;
