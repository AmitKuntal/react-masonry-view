function Image(props) {
  return (
    <img src={props.img} key={props.index} data-index={props.index} onClick={(e)=>props.handleClick(e)} alt=""/>
  );
}

export default Image;
