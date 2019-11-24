import React from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components'
import { padding } from '../../constants/padding'
import { ButtonStandard } from '../../elements/buttons'

const Container = styled.div`
  flex-direction: row;
  padding: ${padding.m}px;
`

const Left = styled.div`
  flex: 1;
  flex-direction: row;
  align-items: center;
`

const Center = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Right = styled.div`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`

const Space = styled.div`
  width: ${padding.s}px;
`

const ButtonContainer = styled.div`
  align-self: center;
`

// TODO: fix mobile layout, add burger nav

const Nav = () => {
  return (
    <Container>
      <Left>
        <ButtonContainer>
          <Link to="/">
            <ButtonStandard label="Home" />
          </Link>
        </ButtonContainer>
        <Space />
        <ButtonContainer>
          <Link to="/record">
            <ButtonStandard label="Record" />
          </Link>
        </ButtonContainer>
      </Left>
      <Center>
        <h3>vbox</h3>
      </Center>
      <Right>
        <ButtonContainer style={{ alignSelf: 'flex-end' }}>
          <Link to="/signup">
            <ButtonStandard label="Start your channel" />
          </Link>
        </ButtonContainer>
      </Right>
    </Container>
  )
}

export default Nav
