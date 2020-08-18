import React from "react"

const Input = (props) => {
  const [value, setValue] = React.useState(props.defaultValue)
  const handleChange = (event) => {
    setValue(event.target.value)
    props.onChange(event.target.value, props.name)
  }
  return (
    <input name={props.name}
      value={value}
      onChange={handleChange}
      type={props.type}
    />
  )
}

const Select = (props) => {
  const [value, setValue] = React.useState(props.defaultValue)
  const handleChange = (event) => {
    setValue(event.target.value)
    props.onChange(event.target.value, props.name)
  }
  return (
    <select value={value} onChange={handleChange} name={props.name}>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}



class Form extends React.Component {
    state = {};
    onChange = (value, name) => {
      this.setState({
        [name]: value
      });
    };
    onSubmit = (e) => {
      e.preventDefault();
      if (Object.keys(this.state).length) {
        this.props.onSubmit(this.state);
      } else {
        console.log("not valid");
      }
    };
    render() {
      console.log("form state", this.state);
  
      return (
        <form onSubmit={this.onSubmit} style={{display: "flex", width: "100px", margin: "0 auto", flexDirection: "column"}}>
          <legend>My Form</legend>
          <Input defaultValue="input" onChange={this.onChange} name="title" type="text" />
          <Select 
            name="select"
            onChange={this.onChange}
            options={[
              { value: 1, label: "JS" },
              { value: 2, label: "React" }
            ]}
          />
          <button style={{ display: "block", margin: "10px auto" }}>Submit</button>
        </form>
      );
    }
  }
  
  export default Form;