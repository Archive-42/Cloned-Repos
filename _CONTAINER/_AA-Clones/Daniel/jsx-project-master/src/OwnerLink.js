import React from "react";

export default function OwnerLink(props) {
    return (
        <a href={props.href}>
            {props.firstName} {props.lastName}
        </a>
    );
}
