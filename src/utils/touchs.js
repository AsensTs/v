/* eslint-disable no-unused-vars */
import store from '@/store'
import router from '@/router'
import { navigator } from '@/config'
let startx, starty, movex, movey, endx, endy, nx, ny, angle;

/**
 * @Param {number} order:  route level
 * */ 
const goRoute = (order) => {
  if (order >= 1 || order <= navigator.length) {
    navigator.forEach(item => {
      if (item.meta.order === order) {
        router.push('/'+ item.name);
      }
    })
  } else {
    return false;
  }
}

const touchs = (event) => {
  if (event.type === 'touchstart') {
    let touches = event.touches[0];
    startx = Math.floor(touches.pageX);
    starty = Math.floor(touches.pageY);
  } else if (event.type === 'touchmove') {
    let touches = event.touches[0];
    movex = Math.floor(touches.pageX);
    movey = Math.floor(touches.pageY);
  } else if ( event.type === 'touchend' || event.type === 'touchcancel' ) {
    let changedTouches = event.changedTouches[0]
    endx = Math.floor(changedTouches.pageX);
    endy = Math.floor(changedTouches.pageY);

    nx = endx - startx;
    ny = endy - starty;

    angle = Math.atan2(ny, nx) * 180 / Math.PI;
    
    const currentRoute = router.currentRoute.value;
    if(angle<45 && angle>=-45){
      event.preventDefault();
      let order = currentRoute.meta.order - 1;
      goRoute(order);
      return false;
    }else if(angle<135 && angle>=45){
      return false;
    }else if((angle<=180 && angle>=135) || (angle>=-180 && angle<-135 )){
      event.preventDefault();
      let order = currentRoute.meta.order + 1;
      goRoute(order);
      return false;
    }else if(angle<=-45 && angle >=-135){
      return false;
    }
  }
}

const touch = (dom) => {
  dom.addEventListener('touchstart',touchs,false);
  dom.addEventListener('touchmove',touchs,false);
  dom.addEventListener('touchend',touchs,false);
}

export default touch;