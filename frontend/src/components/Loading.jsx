import { Spinner } from 'flowbite-react';
import React, { useContext } from 'react';
import { AppContext } from './AppContext';

const Loading = () => {
  const {fullpageloading,isLoading} = useContext(AppContext)
  return (

      fullpageloading ? <div className="fixed top-0 left-0 w-full h-full flex bg-modal justify-center items-center z-30">
        <div className="flex justify-center flex-col text-white font-black gap-6">
          <h1 className="text-white text-7xl font-black text-center">PLEASE WAIT......</h1>
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-light spinner-border-lg" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div> : isLoading ? <div className="flex justify-center">
        <div className="spinner-border-lg"></div>
      </div> : null

    
  );
} 

export default Loading;