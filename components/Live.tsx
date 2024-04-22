import React, { useCallback, useEffect, useState } from 'react'
import { useMyPresence, useOthers } from "@/liveblocks.config"
import LiveCursors from "./cursor/LiveCursors"
import CursorChat from './cursor/CursorChat';
import { CursorMode } from '@/types/type';

const live = () => {
    const others = useOthers();
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;

    const [cursorState, setCursorState] = useState({
      mode: CursorMode.Hidden,
    })
    
  const handlePointerMove = useCallback((event: React.PointerEvent)=>{
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({cursor : { x, y }});
  },[])

  const handlePointeLeave = useCallback((event: React.PointerEvent)=>{
    event.preventDefault();
    setCursorState({ mode:CursorMode.Hidden })
    updateMyPresence({cursor : null, message: null});
  },[])

  const handlePointerDown= useCallback((event: React.PointerEvent)=>{
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({cursor : { x, y }});
  },[])

  useEffect(()=>{
    const onKeyUp = (e: KeyboardEvent)=>{
      if(e.key === '/'){
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: '',
        })
      }else if(e.key === 'Escape'){
        updateMyPresence({ message: ''})
        setCursorState({ mode:CursorMode.Hidden})
      }

    }
    const onKeyDown = (e: KeyboardEvent)=>{
      if(e.key === '/'){
        e.preventDefault()
      }
    }
    
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onKeyDown);

    return() => {
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('keydown', onKeyDown);
    }

  },[updateMyPresence])

  return ( 
    <div
     onPointerMove={handlePointerMove}
     onPointerLeave={handlePointeLeave}
     onPointerDown={handlePointerDown}
     className='h-[100vh] w-full flex items-center justify-center text-center'
    >
       <h1 className="text-3xl text-white font-mono">Live Blocks Ligma</h1>

      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}

        <LiveCursors others={others}/>
    </div>
  )
}

export default live