import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import axios from "axios/index";
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};

class DynamicRule extends React.Component {
    handleSubmit  (e){
        e.preventDefault();
        let { history} =this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            axios({
                method:"POST",
                url:"/api/addProjectToConfig",
                data:values
            }).then(function (data) {
                history.push('serverList')
            })
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem {...formItemLayout} label="项目名称">
                    {getFieldDecorator('projectname', {
                        rules: [{
                            required: true,
                            message: '项目名称',
                        }],
                    })(
                        <Input placeholder="项目名称" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="项目发布文件目录">
                    {getFieldDecorator('workparh', {
                        rules: [],
                    })(
                        <Input placeholder="最后不带斜线" />
                    )}
                </FormItem>

                    <FormItem
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}
                    >
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>

                </Form>
            </div>
        );
    }
}

const WrappedDynamicRule = Form.create()(DynamicRule);

export default WrappedDynamicRule