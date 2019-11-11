import React from 'react'
import ReactCanvasNest from 'react-canvas-nest';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import './regist.css'
import api from '../../apis'

class NormalLoginForm extends React.Component {
  state = {
    loading: false
  }
  handleSubmit = e => {
    e.preventDefault()
    this.setState({ loading: true })

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values, 'value')
        let { username, pwd, verifyInput } = values
        api.verify.checkVerify(verifyInput).then(res => {
          if (!res) {
            message.error('验证码错误')
            this.setState({ loading: false })
            return
          }
          api.user.regist({ username, pwd }).then(res => {
            message.success("注册成功!请登录")
            this.props.history.push('/login')
          }).catch(e => {
            message.error(e.message)
          }).finally(() => {
            this.setState({ loading: false })
          })
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1 className="login">注册</h1>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入您的账号!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="手机号或邮箱"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('pwd', {
            rules: [{ required: true, message: '请设置您的密码!' }, { min: 8, message: '密码长度不能小于8位!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入您的密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('verifyInput', {
            rules: [{ required: true, message: '请输入验证码!' }]
          })(
            <Input
              placeholder="请输入验证码"
              style={{ width: 200 }}
            />
          )}
          &nbsp;
          &nbsp;
          &nbsp;
          <img src="/api/verify/getVerify" alt="" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={this.state.loading}
          >
            注册
          </Button>
          <a onClick={() => this.props.history.push('/login')}>已有账号 现在登录</a>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
)


const Login = props => {
  return <div className="md-warp">
    <WrappedNormalLoginForm {...props} />
    <ReactCanvasNest className='canvasNest' config={{ pointColor: "#1DA57A" }} style={{ zIndex: 0 }} />
  </div>
}

export default Login