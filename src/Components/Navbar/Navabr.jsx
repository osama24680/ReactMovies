import React from 'react'
import { Link } from 'react-router-dom'

export default function Navabr(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="home">Noxe</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {props.userData ? <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="home">Home</a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="About">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Movies">Movies</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Network">Network</Link>
                </li>

              </> : ""}

            </ul>


            <ul className="navbar-nav  mb-2 mb-lg-0">

              <li className="nav-item d-flex align-items-center me-3">
                <i className="fab mx-2 fa-instagram"></i>
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-youtube"></i>
                <i className="fab mx-2 fa-spotify"></i>
              </li>

              {props.userData ?
                <>
                  <li className="nav-item">
                    <span style={{cursor:"pointer"}} className="nav-link" onClick={props.logOut}>LogOut</span>
                  </li>
                </>
                :
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="Registor">Registor</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="Login">Login</Link>
                  </li>
                </>}
            </ul>

          </div>
        </div>
      </nav>

    </div>
  )
}
