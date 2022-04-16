import { Fragment } from 'react'
import ReactDom from 'react-dom'
import classes from './Modal.module.css'

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>
}
const ModelOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}
const Modal = (props) => {
    const portalElement = document.getElementById('overlays');
  return (
    <Fragment>
      {ReactDom.createPortal(<BackDrop onClick={props.onClick}/>,portalElement)}
      {ReactDom.createPortal(<ModelOverlay>{props.children}</ModelOverlay>,portalElement)}
    </Fragment>
  )
}
export default Modal;
