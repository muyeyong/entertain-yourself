import { FC, useState } from 'react'
import { Button } from 'react-bootstrap'
import useSwitchTransitionDiy from '../useSwitchTransitionDiy'
import { useSwitchTransition } from '../useSwitchTransition'

const SwitchDiy: FC = () => {
  const [state, setState] = useState<number>(0)
  const transition = useSwitchTransitionDiy(state, 300, 'out-in')
  return <div style={{ display: 'flex', justifyContent: 'center',alignItems: 'center', flexDirection: 'column'}}>
      <Button style={{margin: '10px'}} onClick={() => setState(pre => pre + 1)} >切换</Button>
      <div>
        {
          transition((state, stage) => {
            return <span
                style={{
                  transition: '.3s',
                  opacity: stage === 'enter' ? 1 : 0,
                  position: 'absolute',
                  transformOrigin: 'center bottom',
                  transform: {
                    from:'translateX(-100%) rotate(-60deg) scale(.5)',
                    enter: 'translateX(0)',
                    leave: 'translateX(100%) rotate(60deg) scale(.5)'
                  }[stage]
                }}
                  >
             {state}
            </span>
          })
        }
      </div>
  </div>
}

export default SwitchDiy