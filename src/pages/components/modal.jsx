export const Modal = ({ handleClose, nextImage, previousImage, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <div className="controls">
          <button onClick={handleClose} className="close"><i className='material-icons'>close</i></button>
          <button onClick={previousImage} className="previous">
             <i className="material-icons">arrow_back</i>
          </button>
          <button onClick={nextImage} className="next"> 
             <i className="material-icons">arrow_forward</i>
            </button>
          </div>
        </section>
      </div>
    );
  };