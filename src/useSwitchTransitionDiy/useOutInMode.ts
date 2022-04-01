import React, { useEffect, useRef } from 'react'
import { ListItem } from './index'
import { setAnimationFrameTimeout, Canceller, clearAnimationFrameTimeout } from '@/helpers/setAnimationFrameTimeout'

interface Props< S = any > {
  state: S,
  ref: React.MutableRefObject<number>,
  list: ListItem<S>[]
  mode?: string
  time: number
  setList: React.Dispatch<React.SetStateAction<ListItem<S>[]>>
}

const useOutInMode = (props: Props) => {
  const timerOut = useRef<Canceller>({})
  // 先出去，再进来
  useEffect(() => {
    const { state, ref, mode, time, list, setList} = props
    if (mode !== 'out-in') return
    const [lastState, secondLastState] = list

    if ( lastState.state !== state &&
       lastState.stage === 'enter' &&
       !secondLastState
      ) {
        console.log('1')
        ref.current ++
        setList(list.concat({ state, key: ref.current, stage: 'from'}))
      }

    // 存在两个状态
    if ( lastState.stage === 'enter' && 
        secondLastState?.stage === 'from'
      ) {
        console.log('2')
        setAnimationFrameTimeout(() => {
          setList([{...lastState, stage: 'leave'}, secondLastState])
        })
      }

    if (lastState.stage === 'leave' &&
        secondLastState?.stage === 'from'
      ) {
        console.log('3')
        clearAnimationFrameTimeout(timerOut.current)
        timerOut.current = setAnimationFrameTimeout(() => {
          setList([{...secondLastState, stage: 'enter'}])
        }, time)
      }
    return () => {
      clearAnimationFrameTimeout(timerOut.current)
    }
  }, [props])
}

export default useOutInMode