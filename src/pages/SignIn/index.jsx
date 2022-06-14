import { useState, useContext } from 'react';

import Loading from "../../components/Loading";

import { Wrapper, ContainerPresentation, Logo, Title, ContainerSignIn, StyledLink} from "./style";

import { AuthContext } from '../../contexts/auth';

const Login = () => {

  const [ formData, setFormData ] = useState({
    email:"",
    password:""
  });
  const [isLoading, setIsLoading] = useState( {placeholder: "Log In", disabled: false} );
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    login(formData.email,formData.password,isLoading,setIsLoading);

    isLoading.placeholder = <Loading height={100} width={100} />
    isLoading.disabled = true;
    setIsLoading({...isLoading});
  }


  const handleInputChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Wrapper>
      <ContainerPresentation>
        <Logo>linkr</Logo>
        <Title>save, share and discover <br></br> the best links on the web</Title>
      </ContainerPresentation>
      <ContainerSignIn onSubmit={handleLogin}>    
          <input
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            placeholder="e-mail"
            disabled={isLoading.disabled && "disabled"}
            required
          />
          <input
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            placeholder="password"
            disabled={isLoading.disabled && "disabled"}
            required
          />
          <button type="submit" disableButton={isLoading.disabled}>
            {isLoading.placeholder}
          </button>
        <StyledLink to="/signup">First time? Create an account!</StyledLink>
        </ContainerSignIn>
    </Wrapper>
  );
}

export default Login;