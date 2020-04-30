import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ButtonStandard } from '../../elements/buttons'
import styled from 'styled-components'
import { color } from '../../constants/color'
import { padding } from '../../constants/padding'
import { getChannelBy } from '../../utils/database'
import Loading from '../Loading'
import { navigate } from '@reach/router'
import firebase from '../../firebase'
import { UserContext, UserContextType } from '../../context/userContext'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: ${padding.s}px;
`

const ErrorLabel = styled.div`
  margin-top: ${padding.s}px;
  color: ${color.Yellow};
`

const Input = styled.input`
  background-color: inherit;
  border-style: solid;
  border-width: 2px;
  border-color: ${color.LightGrey};
  color: inherit;
  font-family: inherit;
  font-size: 16px;
  padding: ${padding.s}px;

  &:focus {
    outline: none;
  }
`

const ButtonContainer = styled.button`
  align-self: center;
  background-color: ${color.DarkGrey};
  font-size: 100%;
  font-family: inherit;
  color: inherit;
  border: 0;
  padding: 0;

  &:focus {
    outline: none;
  }
`

const Space = styled.div`
  width: ${padding.m}px;
  height: ${padding.m}px;
`

const ShowPassword = styled.a`
  font-size: 16px;
  font-weight: 400;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

export const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState(null)

  const { setUser } = useContext<UserContextType>(UserContext)

  const { errors, handleChange, handleSubmit, touched, values } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('must be a valid email')
        .required('required'),
      password: Yup.string().required('required'),
    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setLoading(true)
      setLoginError(null)
      try {
        const { user } = await firebase.auth.signInWithEmailAndPassword(
          values.email,
          values.password
        )

        // get channel from server, and save to context
        const channelFromServer = await getChannelBy('ownerId', user.uid)

        setUser(channelFromServer)

        resetForm()
        navigate(channelFromServer.urlSuffix)
      } catch (error) {
        console.log('Error in onSubmit:', error)
        if (error.code === 'auth/user-not-found') {
          setErrors({ email: 'This email does not exist.' })
        } else if (error.code === 'auth/wrong-password') {
          setErrors({ password: 'Wrong password.' })
        } else {
          setLoginError('Something went wrong, please try again.')
        }
        setLoading(false)
      }
    },
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        onChange={handleChange}
        value={values.email}
        autoComplete="off"
      />
      {touched.email && errors.email && <ErrorLabel>{errors.email}</ErrorLabel>}

      <Space />

      <Label htmlFor="password">
        Password (
        <ShowPassword
          style={{ width: 20, height: 20 }}
          onClick={() =>
            setShowPassword(currentShowPassword => !currentShowPassword)
          }
        >
          {showPassword ? 'hide' : 'show'}
        </ShowPassword>
        )
      </Label>
      <Input
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        onChange={handleChange}
        value={values.password}
        autoComplete="off"
      />

      {touched.password && errors.password && (
        <ErrorLabel>{errors.password}</ErrorLabel>
      )}

      <Space />

      {loginError && <ErrorLabel>{loginError}</ErrorLabel>}

      <Space />

      {loading ? (
        <Loading />
      ) : (
        <ButtonContainer type="submit">
          <ButtonStandard label="Login" />
        </ButtonContainer>
      )}
    </Form>
  )
}
