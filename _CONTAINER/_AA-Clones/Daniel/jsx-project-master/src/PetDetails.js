import React from "react";
import PetDetailList from "./PetDetailList.js";
import OwnersList from "./OwnersList";

const PetDetails = (props) => (
    <>
        <PetDetailList pet={props.pet} />
        <OwnersList owners={props.pet.Owners}></OwnersList>
    </>
);

PetDetails.defaultProps = {
    pet: {
        PetType: {},
    },
};

export default PetDetails;
