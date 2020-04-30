import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ButtonStandard } from '../elements/buttons'
import styled from 'styled-components'
import { color } from '../constants/color'
import { padding } from '../constants/padding'
import {
  checkAvailabilityAndCreateChannel,
  getChannelByName,
} from '../utils/database'
import Loading from './Loading'
import { navigate } from '@reach/router'
import firebase from '../firebase'
import { UserContext, UserContextType } from '../context/userContext'

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

const LabelLight = styled.label`
  font-size: 16px;
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

export const SignupForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [signupError, setSignupError] = useState(null)
  const [newUser, setNewUser] = useState(null)

  const { setUser } = useContext<UserContextType>(UserContext)

  const { errors, handleChange, handleSubmit, touched, values } = useFormik({
    initialValues: {
      channelName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      channelName: Yup.string()
        .min(2, 'too short (min 2)')
        .max(60, 'too long')
        .required('required'),
      email: Yup.string()
        .email('must be a valid email')
        .required('required'),
      password: Yup.string()
        .min(8, 'too short (min 8)')
        .required('required'),
    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setLoading(true)
      setSignupError(null)
      try {
        // In case channel creation fails further down the line, we keep the freshly created user and reuse it on retry.
        // So we skip createUserWithEmailAndPassword if newUser exists already
        let user = newUser
        if (!newUser || newUser.email !== values.email) {
          const {
            user: u,
          } = await firebase.auth.createUserWithEmailAndPassword(
            values.email,
            values.password
          )
          user = u
          setNewUser(user)
        }

        const urlSuffix = values.channelName
          .trim()
          .replace(/\s+/g, '-')
          .toLowerCase()

        await checkAvailabilityAndCreateChannel({
          name: values.channelName.trim(),
          urlSuffix,
          ownerId: user.uid,
        })

        // get channel from server, and save to context
        const channelFromServer = await getChannelByName(
          values.channelName.trim()
        )

        setUser(channelFromServer)

        resetForm()
        navigate(urlSuffix)
      } catch (error) {
        console.log('Error in onSubmit:', error)
        if (error.nameTaken) {
          setErrors({ channelName: 'This channel name is already taken.' })
        } else if (error.code === 'auth/email-already-in-use') {
          setErrors({ email: 'This email is already taken.' })
        } else {
          setSignupError('Something went wrong, please try again.')
        }
        setLoading(false)
      }
    },
  })

  const urlSuffix = values.channelName
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="channelName">Channel name</Label>
      <Input
        id="channelName"
        name="channelName"
        type="text"
        onChange={e => {
          handleChange(e)
          if (signupError) {
            setSignupError(null)
          }
        }}
        value={values.channelName}
        autoComplete="off"
      />
      {touched.channelName && errors.channelName && (
        <ErrorLabel>{errors.channelName}</ErrorLabel>
      )}

      <Space />

      <LabelLight>Your channel url will be:</LabelLight>
      <p>
        vbox.fm/
        <strong style={{ color: urlSuffix ? color.Yellow : 'inherit' }}>
          {urlSuffix || '...'}
        </strong>
      </p>

      <Space />

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

      {signupError && <ErrorLabel>{signupError}</ErrorLabel>}

      <Space />

      {loading ? (
        <Loading />
      ) : (
        <ButtonContainer type="submit">
          <ButtonStandard label="Submit" />
        </ButtonContainer>
      )}
    </Form>
  )
}
