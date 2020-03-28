import { Form,Input, Modal } from 'antd';
import {  observer } from 'mobx-react'
import * as React from 'react';
import './lullaby.less'
import store from './lullabyStore'


@observer
class App extends React.Component<any, {
    coverImage: any[],
    bannerImage: any[],
    value: number | undefined,
    data: any[],
    descLength: number,
    descValue: string
}> {
    constructor(props) {
        super(props)
        this.state = {
            coverImage: [],
            bannerImage: [],
            value: undefined,
            data: [],
            descLength: 0,
            descValue: ''

        }
    }

    handleOk = () => {
        // 确认点击事件
        const { form: { validateFields } } = this.props
        const { createMserchant } = store
        validateFields((error, values) => {
            if (error) {
                return
            }
            // 默认
            values.status =0
            createMserchant(values)
        })
    }
    handleCancel = () => {
        // 取消点击事件
        const { save } = store
        this.setState({
            coverImage: [],
            value: undefined,
            data: []
        }, () => {
            save({
                visible: false
            })
        })

    }

    public render() {
       
        const {  visible } = store
        const { form: { getFieldDecorator } } = this.props
        return (
            <Modal
                title={false}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                width='720px'
                style={{ top: 20 }}
            >
                <Form style={{ marginTop: '32px' }}>
                    <Form.Item label="商户名称" labelCol={{ sm: { span: 6 } }} wrapperCol={{ sm: { span: 18 } }}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入商品名称！' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="商户营业时间" labelCol={{ sm: { span: 6 } }} wrapperCol={{ sm: { span: 18 } }}>
                        {getFieldDecorator('businessTime', {
                            rules: [{ required: true, message: '请输入商品价格！' }],
                        })(
                            <Input style={{ width: '100%' }} />
                        )}
                    </Form.Item>
                    <Form.Item label="商户电话" labelCol={{ sm: { span: 6 } }} wrapperCol={{ sm: { span: 18 } }}>
                        {getFieldDecorator('telphone', {
                            rules: [{ required: true, message: '请选择所属商家！' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    {/* <Form.Item label="封面图" labelCol={{ sm: { span: 6 } }} wrapperCol={{ sm: { span: 18 } }}>
                        {getFieldDecorator('coverImage', {
                            // rules: [{ required: true, message: '请上传封面图！' }],
                            initialValue: this.state.coverImage
                        })(
                            <Upload
                                {...props}
                                listType="picture-card"
                            >
                                +
                                </Upload>
                        )}
                    </Form.Item> */}
                    <Form.Item label="商户地址" labelCol={{ sm: { span: 6 } }} wrapperCol={{ sm: { span: 18 } }}>
                        {getFieldDecorator('adress', {
                            rules: [{ required: true, message: '请输入商品简介！' }],
                        })(
                            <Input.TextArea
                                placeholder="请输入商户地址"
                                rows={4}
                                value={this.state.descValue}
                            />
                        )}
                    </Form.Item>
                </Form>
            </Modal >
        )
    }
}

export default Form.create()(App);
