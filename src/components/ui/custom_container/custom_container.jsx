const { Container } = require("react-bootstrap");

const CustomContainer = ({ children, ...props }) => {
  return <Container style={{
    // backgroundColor:'red'
  }} >{children}</Container>;
};

export default CustomContainer;
