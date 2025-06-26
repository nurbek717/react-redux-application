
function Input({lable, state, setState, type = 'text'}) {
  return (
    <div className="form-floating pb-2">
    <input type={type} className="form-control" value={state} onChange={e => setState(e.target.value)}  id="floatingInput" placeholder={lable}/>
    <label htmlFor="floatingInput">{lable}</label>
    </div>
  )
}

export default Input
