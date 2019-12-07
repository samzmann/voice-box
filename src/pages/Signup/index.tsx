import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { PageContainer } from '../../elements/PageContainer'
import { SignupForm } from '../../components/SignupForm'

const Signup: React.FC<RouteComponentProps> = () => (
  <PageContainer>
    <h1>Signup Page</h1>
    <SignupForm />
  </PageContainer>
)

export default Signup
