import { Form, Icon, Input, message, Modal, Upload } from 'antd';
import 'braft-editor/dist/index.css'
import * as _ from 'lodash'
import { inject, observer } from 'mobx-react'
import * as React from 'react';
import './childrenSong.less'
import store from './childrenSongStore'
const { Dragger } = Upload;

@inject('Carousel')
@observer
class App extends React.Component<any, {
    visible: boolean
    fileList: any[]
    current: any

}> {
    static getDerivedStateFromProps(nextProps, prevState) {
        const nextState = {
            visible: nextProps.Carousel.visible
        }
        if (!nextProps.Carousel.visible) {
            return {
                ...nextState,
                current: undefined,
                fileList: []
            }
        }
        else {

            if (!_.isEmpty(nextProps.Carousel.current) && nextProps.Carousel.current !== prevState.current) {
                // 通过对比nextProps和prevState，返回一个用于更新状态的对象
                return {
                    ...nextState,
                    current: nextProps.Carousel.current,
                    fileList: [{
                        key: nextProps.Carousel.current.key,
                        uid: nextProps.Carousel.current.key,
                        name: nextProps.Carousel.current.key,

                    }]
                }
            }
            else {
                return { ...nextState }
            }
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            current: undefined,
            fileList: []
        }
    }

    handleOk = () => {
        // 确认点击事件
        const { form: { validateFields } } = this.props
        validateFields().then(async (value) => {
            value.key = value.audio.file.response.data.key
            value.audio = undefined
            await store.create(value).then(() => {
                this.props.Carousel.save({
                    visible: false,
                    current: undefined
                })
            })
        })
    }
    handleCancel = () => {
        // 取消点击事件
        const { save } = store
        save({
            visible: false,
            current: undefined
        })

    }
    handleChange = (e) => {
        this.setState({
        })
    }
    public render() {
        const props = {
            name: 'file',
            multiple: true,
            action: '/childrenSong/upload',
            fileList: this.state.fileList,
            onChange: (info) => {
                const { status } = info.file;
                // tslint:disable-next-line: no-console
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);

                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
                // tslint:disable-next-line: no-console
                this.setState({
                    fileList: [info.file]
                })
            }
        }
        const { Carousel: { current } } = this.props
        const { form: { getFieldDecorator } } = this.props
        // tslint:disable-next-line: no-console
        return (
            <Modal
                title={false}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form style={{ margin: '12px' }}>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            initialValue: current && current.name,
                            rules: [{ required: true, message: '请输入儿歌名称！' }],
                        })(
                            <Input
                                placeholder={'输入儿歌名称'}
                                onChange={this.handleChange}
                                style={{ width: '100%', marginBottom: '12px' }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('audio', {
                            initialValue: this.state.fileList,
                            rules: [{ required: true, message: '请上传音频文件' }],
                        })(
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">点击或者拖拽上传</p>
                            </Dragger>
                        )}
                    </Form.Item>
                </Form>
            </Modal >

        )
    }
}

export default Form.create()(App);
