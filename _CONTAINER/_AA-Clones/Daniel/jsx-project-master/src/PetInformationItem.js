import React from "react";

const PetInformationItem = (props) => (
    <>
        <dt>{props.name}</dt>
        <dd>{props.value}</dd>
    </>
);
export default PetInformationItem;
