export const paperStyles = {
  backgroundColor: '#F1FAFE',
  borderRadius: '10px',
  boxShadow: 'none',
  padding: '19px',
  marginTop: '27px',
}

export const datePickerStyles = {
  input: {
    backgroundColor: '#1BC5BD',
    color: 'white',
    borderRadius: '5px',
    padding: '5px 8px',
    width: '85px',
  },
  label: {
    color: 'white',
    top: '-10px',
  },
  button: {
    borderRadius: 0,
    border: 'none',
    color: 'white',
  },
  '&.MuiFormControl-root': {
    backgroundColor: '#1BC5BD',
    borderRadius: '5px',
  },
  fieldset: {
    border: 'none',
  },
}

export const selectStyles = {
  height: '32px',
  width: '150px',
  backgroundColor: '#1BC5BD',
  color: 'white',
  borderRadius: '5px',
  padding: '8px 13px',
  '& .MuiSvgIcon-root': {
    color: 'white',
  },
}

export const accordionStyles = {
  marginBottom: '1rem',
  '&:last-child': {
    marginBottom: 0,
  },
  boxShadow: 'none',
  borderRadius: '10px',
  '&.MuiPaper-root': { borderRadius: '10px' },
  '&.MuiPaper-root::before': {
    display: 'none',
  },
}

export const accordionSummaryStyles = {
  padding: 0,
  '& .MuiAccordionSummary-content': {
    margin: 0,
    padding: '26px 24px',
    '& .MuiAccordionSummary-content': { margin: 0 },
  },
}
