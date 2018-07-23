import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
const FormItem = Form.Item;
import axios from 'axios'
axios.defaults.headers.post['Content-Type']="application/json"
class NormalLoginForm extends React.Component {
    handleSubmit  (e){
        e.preventDefault();
        let { history} =this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            axios({
               method:"POST",
               url:"/api/getUserToken",
                data:values
            }).then(function (data) {
                history.push('user')
            })
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem>
                    {getFieldDecorator('login', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {/*{getFieldDecorator('remember', {*/}
                        {/*valuePropName: 'checked',*/}
                        {/*initialValue: true,*/}
                    {/*})(*/}
                        {/*<Checkbox>Remember me</Checkbox>*/}
                    {/*)}*/}
                    {/*<a className="login-form-forgot" href="">Forgot password</a>*/}
                    <FormItem
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}
                    >
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    </FormItem>
                    {/*Or <a href="">register now!</a>*/}
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default (props)=>{
    return (<WrappedNormalLoginForm {...props}/>)
}