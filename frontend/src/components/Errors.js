


const Errors = ({errors})=>{
    if(!errors){
        return null
    }
    return(
        <ul className="error-messages">
            <li>
                {errors.message}
            </li>
        </ul>
    )
}
export default Errors