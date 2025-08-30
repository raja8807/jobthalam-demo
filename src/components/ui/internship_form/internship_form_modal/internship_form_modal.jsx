import React, { useState } from "react";
import styles from "./internship_form_modal.module.scss";
import CustomInput from "../../cuatom_input/cuatom_input";
import { Form } from "react-bootstrap";
import ControlLabel from "../../contol_label/control_label";
import CustomButton from "../../custom_button/custom_button";
import { useCreateIntershipEnquirySubmission } from "@/api_hooks/home/home.hooks";

const PersonalInfoForm = ({ setShow, jobId }) => {


    const [isAgreed, setIsAgreed] = useState(false);

    const initialvalues = {
        first_name: "",
        last_name: "",
        gender: "Male",
        dob: "",
        email: "",
        phone_number: "",
        // Address
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        zip: "",
        // Education
        collage_name: "",
        major: "",
        passed_out_year: "",
        cgpa: "",
    }

    const [values, setValues] = useState(
        {
            ...initialvalues
        }
    );

    const { mutateAsync, isLoading: submitIsLoading } =
        useCreateIntershipEnquirySubmission();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await mutateAsync({
                ...values,
                admin_job_id: jobId,
            });
            setValues({
                ...initialvalues
            });
            alert("Thank you for showing interest. We will get back to you soon");
            setShow(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form}
                onSubmit={handleSubmit}
            >
                {/* Full Name */}
                <div className={styles.row}>
                    <ControlLabel>Full Name</ControlLabel>
                    <div className={styles.twoCol}>
                        <CustomInput
                            value={values.first_name}
                            onChange={(e, v) => {
                                setValues(prev => ({ ...prev, first_name: v }))
                            }
                            }
                            type="text" placeholder="First Name"

                        />
                        <CustomInput
                            value={values.last_name}
                            onChange={(e, v) => {
                                setValues(prev => ({ ...prev, last_name: v }))
                            }
                            }
                            type="text" placeholder="Last Name"

                        />
                    </div>
                </div>

                <br />

                {/* Gender */}
                <div className={styles.row}>
                    <ControlLabel>Gender</ControlLabel>
                    <div className={styles.inline}>
                        <label><Form.Check checked={values.gender === 'Male'}
                            onChange={(e) => {
                                setValues(prev => ({ ...prev, gender: e.target.checked ? 'Male' : 'Female' }))
                            }}
                        /> &nbsp;Male</label>
                        <label><Form.Check checked={values.gender === 'Female'}
                            onChange={(e) => {
                                setValues(prev => ({ ...prev, gender: !e.target.checked ? 'Male' : 'Female' }))
                            }}
                        /> &nbsp;Female</label>
                    </div>
                </div>
                <br />
                {/* Birth Date */}
                <div className={styles.row}>
                    <CustomInput
                        value={values.dob}
                        onChange={(e, v) => {
                            setValues(prev => ({ ...prev, dob: v }))
                        }
                        }
                        type="Date" label={'Date Of Birth'} />
                </div>



                {/* Email */}
                <div className={styles.row}>

                    <CustomInput
                        value={values.email}
                        onChange={(e, v) => {
                            setValues(prev => ({ ...prev, email: v }))
                        }
                        }
                        type="email" placeholder="ex: myname@example.com"
                        label={'E-mail'}
                    />
                </div>


                <div className={styles.row}>

                    <CustomInput
                        value={values.phone_number}
                        onChange={(e, v) => {
                            setValues(prev => ({ ...prev, phone_number: v }))
                        }
                        }
                        type="text" placeholder="98765 4321"
                        label={'Phone Number'}
                    />
                </div>

                {/* Permanent Address */}
                <div className={styles.row}>
                    <ControlLabel>Address</ControlLabel>
                    <CustomInput
                        value={values.address_line_1}
                        onChange={(e, v) => {
                            setValues(prev => ({ ...prev, address_line_1: v }))
                        }
                        }
                        type="text" placeholder="Street Address" />
                    <CustomInput
                        value={values.address_line_2}
                        onChange={(e, v) => {
                            setValues(prev => ({ ...prev, address_line_2: v }))
                        }
                        }
                        type="text" placeholder="Address Line 2" />
                    <div className={styles.twoCol}>
                        <CustomInput
                            value={values.city}
                            onChange={(e, v) => {
                                setValues(prev => ({ ...prev, city: v }))
                            }
                            }
                            type="text" placeholder="City" />
                        <CustomInput
                            value={values.state}
                            onChange={(e, v) => {
                                setValues(prev => ({ ...prev, state: v }))
                            }
                            }
                            type="text" placeholder="State / Province" />
                    </div>
                    <div className={styles.twoCol}>
                        <CustomInput
                            value={values.zip}
                            onChange={(e, v) => {
                                setValues(prev => ({ ...prev, zip: v }))
                            }
                            }
                            type="text" placeholder="Postal / Zip Code" />
                    </div>
                </div>
                <hr />
                {/* Education Section */}
                <h3 className={styles.sectionTitle}>Education</h3>

                <div className={styles.row}>

                    <CustomInput
                        value={values.collage_name}
                        onChange={(e, v) => {
                            setValues(prev => ({ ...prev, collage_name: v }))
                        }
                        }
                        type="text" label={'Name of College'} />
                </div>


                <div className={styles.row}>
                    <CustomInput
                        value={values.major}
                        onChange={(e, v) => {
                            setValues(prev => ({ ...prev, major: v }))
                        }
                        }
                        type="text" label={'Major'} />
                </div>

                <div className={styles.row}>
                    <CustomInput
                        value={values.passed_out_year}
                        onChange={(e, v) => {
                            setValues(prev => ({ ...prev, passed_out_year: v }))
                        }
                        }
                        type="text" label={'Passed Out Year'} />
                </div>
                <div className={styles.row}>
                    <CustomInput
                        value={values.cgpa}
                        onChange={(e, v) => {
                            setValues(prev => ({ ...prev, cgpa: v }))
                        }
                        }
                        type="number" label={'CGPA'} min={0} max={10} />
                </div>
                <CustomButton type="submit" isLoading={submitIsLoading}>Next</CustomButton>
            </form>
        </div>
    );
};

export default PersonalInfoForm;
