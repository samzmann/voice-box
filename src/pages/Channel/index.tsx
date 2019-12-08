import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { getChannelByUrlSuffix } from '../../utils/database'
import Loading from '../../components/Loading'
import { PageContainer } from '../../elements/PageContainer'

interface ChannelPageProps extends RouteComponentProps {
  urlSuffix?: string
}

const Channel: React.FC<ChannelPageProps> = ({ urlSuffix }) => {
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const getChannel = async () => {
      setLoading(true)
      try {
        if (urlSuffix) {
          const chnl = await getChannelByUrlSuffix(urlSuffix)
          console.log('channel', chnl)
          isMounted && setChannel(chnl)
          isMounted && setLoading(false)
        }
      } catch (error) {
        console.log(error)
        isMounted && setLoading(false)
        isMounted && setError('Something went wrong, please reload the page.')
      }
    }

    getChannel()

    return () => {
      isMounted = false
    }
  }, [urlSuffix])

  return (
    <PageContainer>
      <h1>Channel Page</h1>
      {loading && <Loading />}
      {channel && <h3>{channel.name}</h3>}
      {error && <div>{error}</div>}
    </PageContainer>
  )
}

export default Channel
