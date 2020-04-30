import React, { useContext } from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components'
import { padding } from '../../constants/padding'
import { ButtonStandard } from '../../elements/buttons'
import { UserContext, UserContextType } from '../../context/userContext'

const Container = styled.div`
  flex-direction: row;
  padding: ${padding.m}px;
`

const Left = styled.div`
  align-items: center;
`

const Right = styled.div`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

const Space = styled.div`
  width: ${padding.s}px;
`

// TODO: fix mobile layout, add burger nav

const Nav = () => {
  const { user } = useContext<UserContextType>(UserContext)

  return (
    <Container>
      <Left>
        <Link to="/">
          <ButtonStandard label="vbox" />
        </Link>
      </Left>
      <Right>
        {user ? (
          <Link to={`/${user.urlSuffix}`}>
            <ButtonStandard label="You" />
          </Link>
        ) : (
          <>
            <Link to="/signup">
              <ButtonStandard label="Login" />
            </Link>
            <Space />
            <Link to="/signup">
              <ButtonStandard label="Signup" />
            </Link>
          </>
        )}
        <Space />
        <Link to="/record">
          <ButtonStandard label="Record a Message" />
        </Link>
      </Right>
    </Container>
  )
}

export default Nav
