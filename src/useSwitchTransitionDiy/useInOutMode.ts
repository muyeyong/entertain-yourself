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


const useInOutMode = (props: Props) => {
  const timeRef1 = useRef<Canceller>({})
  const timeRef2 = useRef<Canceller>({})
  useEffect(() => {
    const { list, setList, ref, mode, state, time } = props
    if (!mode ||mode !== 'in-out') return
    const [lastItem, secondLastItem] = list.reverse()

    // 先进来，在出去
    // 存在两个状态

    // 如果state改变了，lastItem.stage === 'enter' && secondLastItem不存在，就将新增一个状态 stage='from'
    if (lastItem.state !== state &&
        lastItem.stage === 'enter' 
      ) {
        console.log('1')
        ref.current++
        setList(list => list.slice(-1).concat({ state, key: ref.current, stage: 'from'}))
      }

    // 如果state没有改变，存在两个状态，lastItem.stage === 'from' & secondLastItem.stage === 'enter',
    // 改变secondLast.stage = 'leave'
    if (lastItem.state === state &&
        lastItem.stage === 'from' 
      ) {
        console.log('2')
        setAnimationFrameTimeout(() => {
          setList([secondLastItem, {...lastItem, stage: 'enter'}])
        })
      }

    // 如果state没有变，存在两种状态，stage都为enter,
    if (lastItem.state === state && 
        lastItem.stage === 'enter' &&
        secondLastItem?.stage === 'enter'
      ) {
        console.log('3')
        clearAnimationFrameTimeout(timeRef1.current)
        timeRef1.current = setAnimationFrameTimeout(() => {
          setList([{...secondLastItem, stage: 'leave'}, lastItem ])
        }, time)
      }

    // 如果state没有变化，存在两种状态，lastItem.stage === 'entry'& secondLastItem.stage === 'leave',在指定时间内将secondLastItem移除
      if (secondLastItem && 
         secondLastItem?.stage === 'leave') {
          console.log('4')
          clearAnimationFrameTimeout(timeRef2.current)
          timeRef2.current = setAnimationFrameTimeout(() => {
            setList([lastItem])
          }, time)
         }
    
    return () => {
      clearAnimationFrameTimeout(timeRef1.current)
      clearAnimationFrameTimeout(timeRef2.current)
    };
  }, [props])
}

export default useInOutMode