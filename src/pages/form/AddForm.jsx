import { Box, Checkbox, deprecatedPropType, FormControlLabel, Stack, Typography } from '@mui/material';
import { CircularButton } from '../../components/sidebar';
import { CustomSelect } from '../../components/custom-select';
import { useEffect, useState } from 'react';
import { useSLABackend } from '../../hooks/useSLABackend';
import { useScheduleBackend } from '../../hooks/useScheduleBackend';
import { CustomFilledInput } from '../../components/custom-input';
import { useFormBackend } from '../../hooks/useFormBackend';
import { useData } from '../../context/DataContext';
import { useNotification } from '../../hooks/useNotification';
import { AgentSelect } from '../agent/AgentSelect';
import { SLASelect } from '../sla/SLASelect';
import { ScheduleSelect } from '../schedule/ScheduleSelect';
import { FormSelect } from '../form/FormSelect';
import { StatusSelect } from '../status/StatusSelect';
import { PrioritySelect } from '../priority/PrioritySelect';
import { GroupSelect } from '../group/GroupSelect';
import { DepartmentSelect } from '../department/DepartmentSelect';
import CustomDataGrid from '../../components/data-grid';
import { FormFieldDataGrid } from './FormFieldDataGrid';

export const AddForm = ({ handleCreated, handleEdited, editForm }) => {
    const { createForm, updateForm } = useFormBackend();

    const [isFormValid, setIsFormValid] = useState(false)

    const [fields, setFields] = useState([])

    const [formData, setFormData] = useState({
        title: '',
        instructions: '',
        notes: '',
    });

    const validateForm = () => {
        return formData.title !== ''
    }

    useEffect(() => {
        if (editForm) {
            editForm.fields.forEach((field, idx) => {
                field.id = idx
            })
            setFormData(editForm)
            setFields(editForm.fields)
        }

    }, [editForm]);

    const prepareFormData = () => {
        const { title, instructions, notes } = formData
        return {
            title: title,
            instructions: instructions,
            notes: notes,
            ...(editForm && { form_id: formData.form_id })
        }
    }

    useEffect(() => {
        setIsFormValid(validateForm())
    }, [formData]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleAction = () => {
        if (editForm) {
            updateForm(prepareFormData(formData))
                .then(res => {
                    handleEdited();
                })
                .catch(err => console.error(err));
        } else {
            createForm(prepareFormData(formData))
                .then(res => {
                    handleCreated();
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <>
            <Typography
                variant="h1"
                sx={{ mb: 1.5 }}
            >
                {editForm ? 'Edit form' : 'Add new form'}
            </Typography>

            <Typography variant="subtitle2">
                {editForm ? 'Edit the details for this form' : 'We will gather essential details about the new form. Complete the following steps to ensure accurate setup and access.'}
            </Typography>

            <Box
                sx={{
                    background: '#FFF',
                    m: 4,
                    p: 4,
                    pt: 3,
                    borderRadius: '12px',
                    textAlign: 'left',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, mb: 2 }}
                >
                    Form information
                </Typography>

                <CustomFilledInput
                    label="Title"
                    onChange={handleInputChange}
                    value={formData.title}
                    name="title"
                    mb={2}
                    fullWidth
                />

                <CustomFilledInput
                    label="Instructions"
                    onChange={handleInputChange}
                    value={formData.instructions}
                    name="instructions"
                    mb={2}
                    fullWidth
                    rows={3}
                />

                <CustomFilledInput
                    label="Notes"
                    onChange={handleInputChange}
                    value={formData.notes}
                    name="notes"
                    mb={2}
                    fullWidth
                    rows={3}
                />

                {editForm &&
                    <>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 600, mb: 2 }}
                        >
                            Fields
                        </Typography>

                        <FormFieldDataGrid
                            rows={fields}
                            setRows={setFields}
                            form_id={editForm.form_id}
                        />
                    </>}


            </Box>

            <Stack
                direction="row"
                spacing={1.5}
                sx={{ justifyContent: 'center' }}
            >
                <CircularButton
                    sx={{ py: 2, px: 6 }}
                    onClick={handleAction}
                    disabled={!isFormValid}
                >
                    {editForm ? 'Edit' : 'Create'} form
                </CircularButton>
            </Stack>
        </>
    );
};
