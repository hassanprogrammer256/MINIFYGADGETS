import { Spinner } from 'flowbite-react'
import React from 'react'

const Loading = () => {
  return (
    <div className="fixed top-0 w-full h-full flex bg-modal justify-center align-center flex-col z-30">
        <div className="flex justify-center flex-col text-white font-black gap-6"><h1 className="text-white text-7xl  font-black text-center">PLEASE WAIT......</h1>
<div
    className="d-flex justify-content-center align-items-center "
>
    <div
        className="spinner-border text-light spinner-border-lg"
        role="status"
    >
    </div>
</div>

        </div>

</div> 
  )
}

export default Loading