import { Icon,  message, Modal, Select, Upload } from 'antd';
import { observer } from 'mobx-react'
import * as React from 'react';
import './carousel.less'
import store from './carouselStore'
const Option = Select.Option
const { Dragger } = Upload;


@observer
class App extends React.Component<any, {
    fileList: any[],
    value: number | undefined,
    data: any[]
}> {
    constructor(props) {
        super(props)
        this.state = {
            fileList: [],
            value: undefined,
            data: []
        }
    }

    public componentDidMount = () => {
        // 发请求
        store.findCarousel()
    }

    handleOk = () => {
        // 确认点击事件
        const { fileList, value } = this.state
        if (fileList.length <= 0) {
            message.error('请上传图片')
        }
        // else if (isUndefined(value)) {
        //     message.error('请绑定商品')
        // }
        // 调用接口
        else {
            store.upset({
                file: fileList[0],
                goodId: value || 0
            })
        }
    }
    handleCancel = () => {
        // 取消点击事件
        const { save } = store
        this.setState({
            fileList: [],
            value: undefined,
            data: []
        }, () => {
            save({
                visible: false
            })
        })

    }
    handleSearch = value => {
        if (value) {
            // 请求 goods列表
        } else {
            this.setState({ data: [] });
        }
    };
    handleChange = value => {
        if (value) {
            // 请求 goods列表
        } else {
            this.setState({ data: [] });
        }
    }
    public render() {
        const props = {
            name: 'file',
            multiple: false,
            fileList: this.state.fileList,
            action: '/carousel/upload',

            onChange: (info) => {
                const { status } = info.file;
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
                this.setState({
                    fileList: [info.file]
                })
            },
            onRemove: () => {
                this.setState({
                    fileList: []
                })
            }
        };
        const {  visible } = store
        return (
            <Modal
                title={false}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                style={{ width: '320px' }}
            >
                <div style={{ margin: '12px' }}>
                    <Select
                        showSearch={true}
                        value={this.state.value}
                        placeholder={'输入搜索选择指定商品'}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={this.handleSearch}
                        onChange={this.handleChange}
                        notFoundContent={null}
                        style={{ width: '100%', marginBottom: '12px' }}
                    >
                        {
                            this.state.data.map((ele) => {
                                return <Option value={ele.value} key={ele.value}>{ele.name}</Option>
                            })
                        }
                    </Select>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或者拖拽上传</p>
                    </Dragger>

                </div>

            </Modal>
        )
    }
}

export default App;
