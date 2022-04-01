import { useEffect, RefObject, SetStateAction, Dispatch} from 'react'
import { ListItem } from './index'
import { setAnimationFrameTimeout, clearAnimationFrameTimeout } from '@/helpers/setAnimationFrameTimeout'

interface Props< S = any> {
  list: ListItem[]
  setList: Dispatch<SetStateAction<ListItem[]>>
  ref: React.MutableRefObject<number>
  state: S,
  mode?: string
  time: number
}

const  useDefaultMode = (props: Props) =>{
  useEffect(() => {
    if (props.mode && props.mode !== 'default') return
    const {list, setList, ref, state, time} = props
    const [lastState] = list.slice(-1)
    if (lastState.state === state) return

    // 设置新的值
    const preRef = ref.current
    ref.current++
    const currRef = ref.current
    setList(list => list.concat( { stage: 'from', key:currRef, state}))

    // 改变新值状态，源码里面用的 setTimeout是不是考虑到 setState延迟性？
    setAnimationFrameTimeout(() => {
      setList(list => {
       return list.map(s => {
          if (s.key === currRef) return {...s, stage: 'enter'}
          else return s
        })
      })
    })

    // 将上一个stage的状态改变
    setList(list => {
      return list.map(s => {
        if (s.key === preRef) return {...s, stage: 'leave'}
        else return s
      })
    })

    // 时间到了移除上一个状态
    setAnimationFrameTimeout(() => {
      setList(list => {
        return list.filter(s => s.key !== preRef)
      })
    }, time)


  }, [props])
}

export default useDefaultMode
