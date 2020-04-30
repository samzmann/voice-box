import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { PageContainer } from '../../elements/PageContainer'
import { LoginForm } from '../../components/LoginForm'

const Login: React.FC<RouteComponentProps> = () => (
  <PageContainer>
    <h1>Login</h1>
    <LoginForm />
  </PageContainer>
)

export default Login
