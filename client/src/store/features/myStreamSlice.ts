import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface MyStreamType {
  stream: MediaStream | null
  controller: {
    video: boolean
    audio: boolean
  }
}

const initialState: MyStreamType = {
  stream: null,
  controller: {
    video: false,
    audio: false,
  },
}

export const MyStreamSlice = createSlice({
  // store의 이름
  name: 'my-stream',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    setStream: (state, action: PayloadAction<MediaStream>) => {
      state.stream = action.payload
    },
    controlStream: (state, action: PayloadAction<'video' | 'audio'>) => {
      if (action.payload === 'video') {
        state.controller = {
          ...state.controller,
          video: !state.controller.video,
        }
      }
      if (action.payload === 'audio') {
        state.controller = {
          ...state.controller,
          audio: !state.controller.audio,
        }
      }
    },
    handleAudio: (state) => {
      if (!state.stream) return
      const audioTrack = state.stream.getAudioTracks()[0]
      if (audioTrack.enabled) {
        audioTrack.enabled = false
      } else {
        audioTrack.enabled = true
      }
    },
    handleVideo: (state) => {
      if (!state.stream) return
      const videoTrack = state.stream.getVideoTracks()[0]
      if (videoTrack.enabled) {
        videoTrack.enabled = false
      } else {
        videoTrack.enabled = true
      }
    },
  },
})

export const { setStream, controlStream, handleAudio, handleVideo } =
  MyStreamSlice.actions
