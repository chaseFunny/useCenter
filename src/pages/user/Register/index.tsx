import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message, Tabs } from 'antd';
import React from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, Link } from 'umi';
import Footer from '@/components/Footer';
import { register } from '@/services/ant-design-pro/api';
import styles from './index.less';

const Register: React.FC = () => {
  /** 点击注册 */
  const handleSubmit = async (values: API.RegisterParams) => {
    // 校验 两次密码是否一致
    const { userPassword, checkPassword } = values;
    // const validPattern =  "[`~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";

    if (userPassword !== checkPassword) {
      message.error({ content: '两次密码输入不一致，请重新确认' });
      return;
    }
    try {
      // 注册
      const id = await register(values);

      if (id > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 回到登录访问的位置 */
        // if (!history) return;
        // const { query } = history.location;
        // const { redirect } = query as {
        //   redirect: string;
        // };
        history.push('/user/login');
        return;
      } else {
        throw new Error(`register error id = ${id}`);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          logo={
            <img
              alt="logo"
              src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1012/avatar.jpg"
            />
          }
          title="User Center"
          subTitle={'不拖延的第一个从0到1的后台系统'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs>
            <Tabs.TabPane key="account" tab={'注册成为新用户'} />
          </Tabs>

          <>
            <ProFormText
              name="userAccount"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入账号'}
              rules={[
                {
                  required: true,
                  message: '账号是必填项！',
                },
              ]}
            />
            <ProFormText.Password
              name="userPassword"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入密码'}
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
                {
                  min: 8,
                  type: 'string',
                  message: '长度不能小于八位',
                },
              ]}
            />
            <ProFormText.Password
              name="checkPassword"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请再次输入密码'}
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
                {
                  min: 8,
                  type: 'string',
                  message: '长度不能小于八位',
                },
              ]}
            />
          </>
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link
              style={{
                float: 'right',
                marginBottom: '10px',
              }}
              to="/user/login"
            >
              去登录
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
