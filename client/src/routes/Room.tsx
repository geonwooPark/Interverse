import '../PhaserGame'
import Chat from '../components/Chat'

import StageContainer from '../components/EnterStage/StageContainer'
import { useEffect, useState } from 'react'
import PasswordStage from '../components/EnterStage/PasswordStage'
import NameStage from '../components/EnterStage/NameStage'
import { getCookie } from '../utils/cookie'
import { useParams, useSearchParams } from 'react-router-dom'
import RoomTitle from '../components/RoomTitle'
import ButtonContainer from '../components/ButtonContainer'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

function Room() {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const title = searchParams.get('title') as string
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

  useEffect(() => {
    const game = phaserGame.scene.keys.game as Game
    game.setupKeys()
  }, [])

  return (
    <div>
      <RoomTitle title={title} />
      {adminCookie?.roomNum !== params.roomId &&
        userCookie?.roomNum !== params.roomId &&
        stage < 2 && <StageContainer>{enterStage[stage].elem}</StageContainer>}
      <ButtonContainer />
      <Chat />
    </div>
  )
}

export default Room
