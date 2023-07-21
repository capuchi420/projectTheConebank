import React, { useState } from 'react';
import styled from 'styled-components';

export default function Home() {
  const [ isTransferOpen, setIsTransferOpen ] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isRequestOpen, setIsRequestOpen ] = useState(false);

  const handleTransferModal = () => {
    setIsTransferOpen(true);
    setIsModalOpen(true);
  }

  const handleTransferModalClose = () => {
    setIsTransferOpen(false);
    setIsModalOpen(false);
  }

  const handleRequestModal = () => {
    setIsRequestOpen(true);
    setIsModalOpen(true);
  }

  const handleRequestModalClose = () => {
    setIsRequestOpen(false);
    setIsModalOpen(false);
  }

  return (
    <Container className={(isModalOpen ? "open" : "")}>
      <nav>
        <h1>The Conebank</h1>
      </nav>
      <header>
        <div className='content'>
          <div className='info'>
            <p>username</p>
            <p>email</p>
            <p>id</p>
            <p>+1000$</p>
          </div>
          <div className='options'>
            <button className='transfer' onClick={handleTransferModal}>Transfer</button>
            <button className='request' onClick={handleRequestModal}>Request</button>
            <button className='logout'>Logout</button>
          </div>
        </div>
      </header>
      <main>
        <section className='requests'>
          <div className='request-list'>
            <h6>Requests</h6>
            <div className='request'>
              <p>username</p>
              <p className='money'>100$</p>
              <div className='options'>
                <button className='accept'>Accept</button>
                <button className='decline'>Decline</button>
              </div>
            </div>
            <div className='request'>
              <p>username</p>
              <p className='money'>100$</p>
              <div className='options'>
                <button className='accept'>Accept</button>
                <button className='decline'>Decline</button>
              </div>
            </div>
            <div className='request'>
              <p>username</p>
              <p className='money'>100$</p>
              <div className='options'>
                <button className='accept'>Accept</button>
                <button className='decline'>Decline</button>
              </div>
            </div>
          </div>
        </section>
        <section className='history'>
          <h6>History</h6>
          <div className='review'>
            <p>19. 07. 2023.</p>
            <p>Sent 100$ to username</p>
          </div>
          <div className='review'>
            <p>19. 07. 2023.</p>
            <p>Sent 100$ to username</p>
          </div>
          <div className='review'>
            <p>19. 07. 2023.</p>
            <p>Sent 100$ to username</p>
          </div>
        </section>
      </main>
      <footer>
        <p>Copyright &copy; All Rights Reserved</p>
      </footer>

      <div className={`modalTransfer `+(isTransferOpen ? 'open' : 'closed')}>
        <div className='background'>
          <div className='modal'>
            <form>
              <input type="text" placeholder='To' />
              <input type="text" placeholder='Amount' />
              <div className='options'>
                <button type='submit' className='send'>Send</button>
                <button onClick={handleTransferModalClose} className='exit'>Exit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={`modalTransfer `+(isRequestOpen ? 'open' : 'closed')}>
        <div className='background'>
          <div className='modal'>
            <form>
              <input type="text" placeholder='From' />
              <input type="text" placeholder='Amount' />
              <div className='options'>
                <button type='submit' className='send'>Request</button>
                <button onClick={handleRequestModalClose} className='exit'>Exit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  &.open{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  nav{
    width: 100vw;
    background-color: #2B823A;
    padding: .6rem;

    h1{
      color: #fff;
      font-size: 1.5rem;
      text-align: center;
    }
  }

  header{
    width: 100vw;
    background-image: linear-gradient(to bottom, #2b823a, #fff);

    div.content{
      div.info{
        padding-top: 1rem;
        text-align: center;
        color: #fff;

        p:last-child{
          margin-top: 1rem;
          text-shadow: 1px 1px 4px #000;
          font-size: 1.5rem;
        }
      }

      div.options{
        padding: 1rem;

        button{
          display: block;
          margin-bottom: .5rem;
          width: 100%;
          padding: .8rem 1.6rem;
          border-radius: 1.3rem;
          border: none;
          font-size: 1rem;

          &.transfer{
            color: #fff;
            background-color: #246068;
          }

          &.request{
            color: #fff;
            background-color: #2B823A;
          }

          &.logout{
            color: #ff0000;
            background: transparent;
            border: 1px solid #ff0000;
          }

          &:hover{
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .7);
          }
        }
      }
    }
  }

  main{
    padding: 1rem;

    section.requests{
      div.request-list{
        background-color: #D9D9D9;
        padding: .5rem;

        h6{
          font-size: 1rem;
        }

        div.request{
          margin-top: 1rem;
          width: 100%;
          background-color: #fff;
          padding: .5rem;
          border-radius: .4rem;
          text-align: center;

          p{
            font-size: 1rem;

            &.money{
              font-size: 1.3rem;
            }
          }

          div.options{
            margin-top: .5rem;
            display: flex;
            justify-content: space-between;

            button{
              font-size: 1rem;
              border: none;
              border-radius: 1.3rem;
              padding: .8rem 1.6rem;
              width: 7.8rem;

              &.accept{
                color: #fff;
                background-color: #2B823A;
              }

              &.decline{
                color: #ff0000;
                border: 1px solid #ff0000;
                background: transparent;
              }

              &:hover{
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .7);
              }
            }
          }
        }
      }
    }

    section.history{
      margin-top: 1.5rem;
      padding: .5rem;

      h6{
        font-size: 1.5rem;
        font-family: 'Michroma', sans-serif;
        text-align: center;
      }

      div.review{
        box-shadow: 0px 0px 4px #000;
        padding: .5rem;
        margin-top: 1rem;
        border-radius: .4rem;
        text-align: center;
        font-size: 1rem;
      }
    }
  }

  footer{
    width: 100vw;
    background-color: #000;
    color: #fff;
    font-size: 1rem;
    text-align: center;
    padding: .6rem;
  }

  div.modalTransfer{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    &.open{
      display: block;
    }

    &.closed{
      display: none;
    }
    

    div.background{
      background-color: rgba(0, 0, 0, .7);
      height: 100%;
      width: 100%;
      padding: 1rem;

      div.modal{
        margin-top: 30%;
        width: 100%;
        background-color: rgba(255, 255, 255, .7);
        border-radius: 1.5rem;
        padding: 1rem;

        form{
          width: 100%;

          input{
            width: 100%;
            margin-bottom: .5rem;
            padding: 1rem;
            font-size: 1rem;
            border: none;
            border-radius: .5rem;
            background-color: rgba(255, 255, 255, .8);

            &:focus{
              outline: none;
              background-color: #fff;
            }
          }

          div.options{
            display: flex;
            justify-content: space-between;

            button{
              font-size: 1rem;
              padding: .8rem 1.6rem;
              width: 8.3rem;
              border: none;
              border-radius: 1.3rem;

              &:hover{
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .7);
              }

              &.send{
                background-color: #2b823a;
                color: #fff;
              }

              &.exit{
                background: transparent;
                border: 1px solid #ff0000;
                color: #ff0000;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (min-width: 768px){
    header{
      padding-left: 2rem;
      padding-right: 2rem;

      div.content{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        justify-content: center;
      }
    }

    main{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding-left: 2rem;
      padding-right: 2rem;
      gap: 1rem;
      justify-content: center;
    }

    div.modal{
      max-width: 500px;
      display: block;
      margin: auto;
    }
  }

  @media only screen and (min-width: 1366px){
    header{
      div.content{
        grid-template-columns: repeat(2, 500px);
      }
    }

    main{
      grid-template-columns: repeat(2, 500px);
    }

    div.modal{
      margin-top: 150px !important;
    }
  }
`;