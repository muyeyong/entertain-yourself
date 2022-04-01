import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { RiAddLine, RiSubtractLine } from 'react-icons/ri'
import { useSwitchTransition } from '../useSwitchTransition'

const modes = ['default', 'out-in', 'in-out']

export default  function BasicSwitchTransition() {
  const [mode, setMode] = useState('in-out')
  const [count, setCount] = useState(0)
  const transition = useSwitchTransition(count, 300, mode)

  return (
    <div className="BasicSwitchTransition">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <p>Select mode:</p>
        {modes.map((m) => (
          <label key={m}>
            {m}
            <input
              type="radio"
              name="mode"
              value={m}
              checked={m === mode}
              style={{ marginLeft: 2 }}
              onChange={() => setMode(m)}
            />
          </label>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          marginTop: 50,
        }}
      >
        <Button onClick={() => setCount(count - 1)}>
          <RiSubtractLine />
        </Button>
        <div
          style={{
            width: 150,
            display: 'grid',
            placeItems: 'center',
            perspective: 200,
          }}
        >
          {transition((state, stage) => (
            <h1
              style={{
                fontSize: '5em',
                position: 'absolute',
                transition: '.3s',
                opacity: stage === 'enter' ? 1 : 0,
                transform: {
                  from: 'translateY(-100%) rotateX(60deg) scale(.5)',
                  enter: 'translateY(0%)',
                  leave: 'translateY(100%) rotateX(-60deg) scale(.5)',
                }[stage],
              }}
            >
              {state}
            </h1>
          ))}
        </div>
        <Button onClick={() => setCount(count + 1)}>
          <RiAddLine />
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 40,
          marginTop: 100,
        }}
      >
        <Button onClick={() => setCount(count - 1)}>
          <RiSubtractLine />
        </Button>
        <div
          style={{
            width: 150,
            display: 'grid',
            placeItems: 'center',
            perspective: 200,
          }}
        >
          {transition((state, stage) => (
            <h1
              style={{
                fontSize: '2em',
                position: 'absolute',
                transition: '.3s',
                opacity: stage === 'enter' ? 1 : 0,
                transform: {
                  from: 'translateX(-100%) rotateY(-60deg) scale(.5)',
                  enter: 'translateX(0%)',
                  leave: 'translateX(100%) rotateY(60deg) scale(.5)',
                }[stage],
              }}
            >
              {state}
            </h1>
          ))}
        </div>
        <Button onClick={() => setCount(count + 1)}>
          <RiAddLine />
        </Button>
      </div>
    </div>
  )
}
