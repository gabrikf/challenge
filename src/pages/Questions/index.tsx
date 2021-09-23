import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { FormGroup } from '@mui/material';

const Questions = () => {
    return (
        <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
    )
}
export default Questions