import {useNavigate} from "react-router-dom";
import {useCallback} from "react";

function GoLink(link) {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate(link, {replace: true}), [navigate]);

}

export default GoLink;