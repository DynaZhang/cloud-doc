import {useState, useEffect} from 'react'

export const useKeyPress = (targetKeyCode) => {
  const [keyPressed, setKeyPressed] = useState(false)

  const handleKeyDown = (e) => {
    const keyCode = e.keyCode
    if (keyCode === targetKeyCode)  {
      setKeyPressed(true)
    }
  }

  const handleKeyup = (e) => {
    const keyCode = e.keyCode
    if (keyCode === targetKeyCode)  {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyup)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyup)
    }
  }, [])

  return keyPressed
}

export default useKeyPress
