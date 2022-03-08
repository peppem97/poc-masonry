import React, {useState} from "react";
import spinner from "./assets/load.gif";
const ProgressiveImg = (props) => {
    const [loading, setLoading] = useState(true);

    return <img src={loading ? spinner : props.image}
                style={{width: '100%', height: '100%', objectFit: loading ? 'contain' : 'cover'}}
                alt=""
                loading="lazy"
                onLoad={() => {setLoading(false)}}/>
};
export default ProgressiveImg;