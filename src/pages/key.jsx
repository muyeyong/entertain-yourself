import { useState } from "react";
import { Button } from "react-bootstrap";
import { useTransition } from "../useTransition";


export default function TransitionWithKey() {
  const [onOff, setOnOff] = useState(true);
  const { stage, shouldMount } = useTransition(onOff, 300);
  const [ keyT, setKeyT ] = useState(true)
  const [ stageT, setStageT] = useState('enter')

  return (
    <div  style={{ textAlign: 'center', marginTop: '50px'}}>
      <Button
        style={{
          marginBottom: 50
        }}
        onClick={() => {
          setOnOff(!onOff)
          setKeyT(!keyT)
          setStageT(stageT ==='entry' ? 'from' : 'entry' )
        }}
      >
        Toggle
      </Button>

      <br />

      <h1
        key={keyT}
        style={{
          transition: ".3s",
          opacity: stageT === "enter" ? 1 : 0.5,
          transform: {
            from: "translateX(-100%)",
            enter: "translateX(0%)",
            leave: "translateX(100%)"
          }[stageT]
        }}
      >
        I'm {stageT}
      </h1>
      <strong>
        Without key change, it always transforms between "enter" and "leave"
      </strong>

      <br />
      <br />
      <br />
      <br />

      <h1
        // key={shouldMount}
        style={{
          transition: ".3s",
          opacity: stage === "enter" ? 1 : 0,
          transform: {
            from: "translateX(-100%)",
            enter: "translateX(0%)",
            leave: "translateX(100%)"
          }[stage]
        }}
      >
        I'm {stage}
      </h1>
      <strong>
        With key change, it transforms from "from" to "enter" and "leave" as
        expected
      </strong>
    </div>
  );
}
