import React from "react";
import PetInformationItem from "./PetInformationItem";

const PetDetailList = (props) => (
    <>
        <h2>Details</h2>
        <dl>
            <PetInformationItem name="Name" value={props.pet.name} />
            <PetInformationItem name="Age" value={props.pet.age} />
            <PetInformationItem name="Type" value={props.pet.PetType.type} />
        </dl>
    </>
);

PetDetailList.defaultProps = {
    pet: {
        name: "loading...",
        PetType: {
            type: "loading...",
        },
        age: "loading...",
    },
};

export default PetDetailList;
