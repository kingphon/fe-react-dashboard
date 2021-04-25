import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Switch,
  RadioGroup,
  FormControlLabel,
  ThemeProvider,
  Radio,
  createMuiTheme,
  Slider
} from "@material-ui/core";


export default function Test({ control }) {
  const methods = useFormContext();
  return (<Controller
    name="Checkbox"
    control={control}
    render={({ field: { onChange, value } }) => (
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => onChange(e.target.checked)}
            checked={value}
            color='primary'
            // {...rest}
          />
        }
        label="cc"
      />
    )}
  />)
}
