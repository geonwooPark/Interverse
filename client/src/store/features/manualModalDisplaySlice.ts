import { createSlice } from '@reduxjs/toolkit'

interface ModalType {
  isOpen: boolean
}

const initialState: ModalType = { isOpen: false }

export const ManualModalDisplaySlice = createSlice({
  // store의 이름
  name: 'manual-modal-display',
  // 초기값
  initialState,
  // 처리하고자 하는 메서드
  reducers: {
    openManualModal: (state) => {
      state.isOpen = true
    },
    closeManualModal: (state) => {
      state.isOpen = false
    },
  },
})

export const { openManualModal, closeManualModal } =
  ManualModalDisplaySlice.actions
