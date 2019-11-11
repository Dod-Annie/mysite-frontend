import React from 'react'
import ReactCanvasNest from 'react-canvas-nest';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import './login.css'
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
        console.log('Received values of form: ', values)
        api.user.login(values).then(res => {
          if (res.code !== 200) {
            message.error(res.message)
          } else {
            message.success("登录成功")
          }
        }).catch(e => {
          message.error(e.message)
        }).finally(() => {
          this.setState({ loading: false })
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1 className="login">登录</h1>
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
            rules: [{ required: true, message: '请输入您的密码!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>记住我</Checkbox>)}

          <a className="login-form-forgot" href="">
            忘记密码
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={this.state.loading}
          >
            登录
          </Button>
          <a onClick={() => {
            console.log('this.p', this.props)
            // this.props.history.push('regist')
          }}>没有账号 现在注册</a>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
)


const Login = () => {
  return <div className="md-warp">
    <WrappedNormalLoginForm />
    <ReactCanvasNest className='canvasNest' config={{ pointColor: "#1DA57A" }} style={{ zIndex: 0 }} />
  </div>
}

export default Login