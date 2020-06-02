import React from 'react';
import { Card } from "@material-ui/core";
import './App.css';
import axios from "axios";
import styled from "styled-components";

const StyledImg = styled.img`
  width: 100px;
  height: 100px;
`;

const StyledCard = styled(Card)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 50%;
  margin: 20px 25%;
  padding: 10px 0;
`;

class App extends React.Component {
  state = {
    users: [],
  }

  componentDidMount() {
    axios.get("https://api.github.com/users/simonh24/followers")
    .then(res => {
      console.log(res.data)
      for (let i = 0; i < res.data.length; i++) {
        this.setState({
          users: [...this.state.users, res.data[i]]
        })
      }
      console.log(this.state.users)
    })

    axios.get("https://api.github.com/users/simonh24")
      .then(res => {
        console.log(res.data)
        this.setState({
          users: [res.data, ...this.state.users]
        })
      })
  }

  render() {
    console.log(this.state.users);
    return (
      <div className="App">
        {
          this.state.users.map(user => {
            return (
              <StyledCard>
                <StyledImg src={user.avatar_url} alt="user avatar"></StyledImg>
                <p>Name: {user.login}</p>
                <a href={user.html_url}>{user.html_url}</a>
              </StyledCard>
            )
          })
        }
      </div>
    );
  }
}

export default App;
