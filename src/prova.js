import {useParams} from "react-router-dom";

function Prova(props) {
    const { id } = useParams();
    console.log(id)

    return (
        <><br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <h1>{id}</h1></>
    )
}

export default Prova;