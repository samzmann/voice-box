import React from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components'
import { padding } from '../../constants/padding'
import { ButtonStandard } from '../../elements/buttons/ButtonStandard'

const Container = styled.div`
  flex-direction: row;
  padding: ${padding.m}px;
`

const Left = styled.div`
  flex: 1;
  flex-direction: row;
`

const Right = styled.div`
  flex: 1;
  align-items: flex-end;
`

const Space = styled.div`
  width: ${padding.s}px;
`

const ButtonContainer = styled.div`
  align-self: center;
`
// TODO: fix mobile layout, ButtonStandard should be one line only, not sure if optional onClick is a good idea

const Nav = () => {
  return (
    <Container>
      <Left>
        <ButtonContainer>
          <Link to="/">
            <ButtonStandard>Home</ButtonStandard>
          </Link>
        </ButtonContainer>
        <Space />
        <ButtonContainer>
          <Link to="/record">
            <ButtonStandard>Record</ButtonStandard>
          </Link>
        </ButtonContainer>
      </Left>
      <Right>
        <ButtonContainer style={{ alignSelf: 'flex-end' }}>
          <Link to="/signup">
            <ButtonStandard>Start your channel</ButtonStandard>
          </Link>
        </ButtonContainer>
      </Right>
    </Container>
  )
}

export default Nav
