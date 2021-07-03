function Arrow(props) {
  let { onLeft, onRight } = props;
  return <div className="arrow_box">
    <span className="left" onClick={onLeft}> &lt; </span>
    <span className="right" onClick={onRight}> &gt; </span>
  </div>
}

export default Arrow