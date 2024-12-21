import LoadingIcon from "./svg/loader_icon"

const Loader = (prop: {
    className?: string
}) => {
    return ( 
        <div>
            <LoadingIcon className={`animate-spin ${prop?.className}`}/>
        </div>
        )
}

export default Loader