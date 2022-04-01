import { useState, useRef, ReactNode, Fragment } from 'react'
import useDefaultMode from './useDefaultMode'
import useInOutMode from './useInOutMode'
import useOutInMode from './useOutInMode'


export interface ListItem<S = any> {
  state: S,
  key: number,
  stage: string,
  mode?: string
}

type RenderCallback = (state: any, stage: string) => ReactNode

const useSwitchTransitionDiy = (state: any, time: number, mode?:string) => {
  const keyRef = useRef(0)
  const firstListItem = {
    state,
    key: keyRef.current,
    stage: 'enter'
  }
  const [list, setList] = useState<Array<ListItem>>([firstListItem])

  useDefaultMode({list, setList, state, ref: keyRef, time, mode})
  useInOutMode({list, setList, state, ref: keyRef, time, mode})
  useOutInMode({list, setList, state, ref: keyRef, time, mode})


  const transition = (callBack: RenderCallback) => {
    return list.map(listItem =>(
      <Fragment key={listItem.key}>
        {callBack(listItem.state, listItem.stage)}
      </Fragment>
    ))
  }
  return transition
}

export default useSwitchTransitionDiy

