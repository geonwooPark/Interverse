import '../PhaserGame'
import StageContainer from '../components/EnterStage/StageContainer'
import { useState } from 'react'
import PasswordStage from '../components/EnterStage/PasswordStage'
import NameStage from '../components/EnterStage/NameStage'
import { getCookie } from '../utils/cookie'
import { useParams, useSearchParams } from 'react-router-dom'

function Room() {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const title = searchParams.get('title')
  const hashedPassword = decodeURIComponent(searchParams.get('hp') as string)

  const [stage, setStage] = useState(0)
  const adminCookie = getCookie('interverse_admin')
  const userCookie = getCookie('interverse_user')

  const enterStage = [
    {
      id: 101,
      elem: (
        <PasswordStage setStage={setStage} hashedPassword={hashedPassword} />
      ),
    },

    {
      id: 102,
      elem: <NameStage setStage={setStage} />,
    },
  ]

  return (
    <div>
      <span>{title}</span>
      {adminCookie?.roomNum !== params.roomId &&
        userCookie?.roomNum !== params.roomId &&
        stage < 2 && <StageContainer>{enterStage[stage].elem}</StageContainer>}
    </div>
  )
}

export default Room