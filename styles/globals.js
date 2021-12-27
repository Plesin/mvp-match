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
    '&:hover': {
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
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
  '&.MuiInput-root': {
    '&:hover': {
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
  },
  '& .MuiSvgIcon-root': {
    color: 'white',
  },
}

export const accordionStyles = {
  marginBottom: '1rem',
  '&:last-of-type': {
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
    padding: '22px 24px',
    '& .MuiAccordionSummary-content': { margin: 0 },
  },
}

export const accordionDetailsStyles = {
  backgroundColor: '#F1FAFE',
  padding: '1rem 0 0',
}

export const tableStyles = {
  '& th': { border: 0, padding: '8px' },
  '& th:first-of-type, & td:first-of-type': { paddingLeft: '1.43rem' },
  '& th:last-of-type, & td:last-of-type': { paddingRight: '1.43rem' },
}

export const tableRowStyles = {
  '& td': { border: 0, padding: '8px', fontSize: '1rem' },
  '&:nth-of-type(odd)': { backgroundColor: '#F1FAFE' },
  '&:nth-of-type(even)': { backgroundColor: 'white' },
}
