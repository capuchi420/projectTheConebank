import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Register() {
    const [ user, setUser ] = useState({
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    });

    const handleChange = (e) => {
        setUser(user => {
            return {...user, [e.target.name]: e.target.value}
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch('http://localhost:1234/user/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(response => response.json()).then(data => {
            if(data.status){
                let date = new Date(new Date().getTime() + (2*24*60*60*1000));
                document.cookie = `_id=${data.createdUser._id};expires=${date}`;
                window.location.href = "/";
            }else{
                alert(data.msg);
            }
        })
    }
  return (
    <Container>
        <div className='header'>
            <h1>Welcome To <span>The Conebank</span></h1>
            <h4>The Future of Banking</h4>
        </div>
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <div className='email'>
                    <input type="text" placeholder='Username' name='username' value={user.username} onChange={handleChange} />
                </div>
                <div className='email'>
                    <input type="email" placeholder='Email' name='email' value={user.email} onChange={handleChange} />
                </div>
                <div className='password'>
                    <input type="password" placeholder='Password' name='password' value={user.password} onChange={handleChange} />
                </div>
                <div className='email'>
                    <input type="password" placeholder='Repeat Password' name='repeatPassword' value={user.repeatPassword} onChange={handleChange} />
                </div>
                <button>Register</button>
                <p>Already have an account? <Link to="/login">Login Now</Link></p>
            </form>
        </div>
        <footer>
            <p>Copyright &copy; All Rights Reserved</p>
        </footer>
    </Container>
  )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url('./assets/background.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    padding: 0 1rem;
    z-index: 1;

    &::after{
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: linear-gradient(to bottom, transparent,#000);
        z-index: -1;
    }

    div.header{
        color: #fff;
        text-align: center;
        padding-top: 3rem;
        z-index: 3;
        
        h1{
            font-size: 1.5rem;

            span{
                color: #2b823a;
            }
        }

        h4{
            font-size: 1.1rem;
            font-family: 'Michroma', sans-serif;
            text-shadow: 0px 4px 4px #000;
        }
    }

    div.form{
        background-color: rgba(255, 255, 255, .5);
        padding: 1rem;
        border-radius: 1.6rem;
        max-width: 31rem;
        margin: 2rem auto 0 auto;

        form{
            div.email{
                width: 100%;
                margin-bottom: .8rem;

                input{
                    width: 100%;
                    padding: .8rem;
                    border: none;
                    border-radius: .5rem;
                    font-size: 1rem;
                    opacity: .7;

                    &:focus{
                        outline: none;
                        opacity: 1;
                    }
                }
            }

            div.password{
                width: 100%;
                margin-bottom: .8rem;

                input{
                    width: 100%;
                    padding: .8rem;
                    border: none;
                    border-radius: .5rem;
                    font-size: 1rem;
                    opacity: .7;

                    &:focus{
                        outline: none;
                        opacity: 1;
                    }
                }
            }

            button{
                color: #fff;
                background-color: #2b823a;
                border: none;
                font-size: 1rem;
                padding: .8rem 1.6rem;
                border-radius: 1.3rem;
                display: block;
                margin: auto;
                width: 9.6rem;
                transition: all .2s ease;

                &:hover{
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .7);
                }
            }

            p{
                margin-top: .4rem;
                text-align: center;
                color: #fff;
                font-size: .9rem;

                a{
                    color: #246068;
                    text-decoration: none;
                }
            }
        }
    }

    footer{
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        color: #fff;
        text-align: center;
        padding: .5rem;
        font-size: .8rem;
    }
`;
