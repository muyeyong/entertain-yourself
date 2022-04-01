import { useState } from "react";
import { Button } from "react-bootstrap";
import { useTransition } from "../useTransition";

export  default function  Emoji () {
  const [state, setState] = useState(true)
  const cryTrans = useTransition(state, 2000)
  const smileTrans = useTransition(!state, 2000)

  const cryAnimationStyle = {
    from: {
      opacity: 0,
      transform: "translateX(-100%)"
    },
    enter: {
      opacity: 1,
      transform: "translateX(0)"
    },
    leave: {
      opacity: 0,
      transform: "translateX(100%)"
    }
  }[cryTrans.stage];

  const smileAnimationStyle = {
    from: {
      opacity: 0,
      transform: "translateX(-100%)"
    },
    enter: {
      opacity: 1,
      transform: "translateX(0)"
    },
    leave: {
      opacity: 0,
      transform: "translateX(100%)"
    }
  }[smileTrans.stage];

  return  <div style={{width: '200px', margin: '20px auto'}}>
            <Button style={{marginBottom: '20px'}} onClick={() => setState(!state)}>切换</Button> <br></br>
            {
              cryTrans.shouldMount&&
              <span
                style={{
                  transition: "2s",
                  position: "absolute",
                 ...cryAnimationStyle
                }}
              >
                🤣
              </span>
            }
            {
              smileTrans.shouldMount && <span
               style={{
                transition: "2s",
                position: "absolute",
                 ...smileAnimationStyle
               }}
             >😝</span>
            }
          </div>
      }

