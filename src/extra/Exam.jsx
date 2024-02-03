import React, { useEffect, useState } from 'react';
import Code from '../component/Code';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../services/operations/authapi';
import exam from '../image/exam.jpg';
const Exam = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLogout = () => {
    // event.preventDefault();
   
    dispatch(logout(navigate))

   
  };


  useEffect(() => {
    const disableContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', disableContextMenu);

    const disableKeyboardShortcuts = (e) => {
      e.preventDefault();
    };
    document.addEventListener('keydown', disableKeyboardShortcuts);

    const disableNavigation = () => {
      window.onbeforeunload = () => 'Are you sure you want to leave?';
    };
    disableNavigation();

    const handleFullscreenChange = () => {
      const wasFullscreen = isFullscreen;
      setIsFullscreen(!!document.fullscreenElement);

      // Check if we were in fullscreen and now exited
      if (wasFullscreen && !document.fullscreenElement) {
        console.log('Exited fullscreen');
        handleLogout();

      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Tab gained focus');
      } else if (isFullscreen) {
        handleLogout();
        console.log('Tab lost focus while in fullscreen');
        
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('keydown', disableKeyboardShortcuts);
      window.onbeforeunload = null;
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isFullscreen]);

  const enterFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  return (
    <div>
      {isFullscreen ? (
        <div>
          <Code/>
        </div>
      ) : (
        <div className='min-h-[50vh] relative'>
        <img src={exam} width='100%' className='flex-row' />
        <button className='bg-blue-300 hover:bg-blue-400 text-blue font-bold py-2 px-4 rounded z-10 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2' onClick={enterFullscreen}>
          Go to Fullscreen
        </button>
      </div>
      )}
    </div>
  );
};

export default Exam;
