import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
const Footer = () => {
  return (
    <div className="foot">
      {localStorage.getItem("admintoken") ? (
        <>
          <footer class="page-footer font-small cyan darken-3">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class=" flex-center">
                    {/* <a class="fb-ic">
                  <i class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x">
                  
                  </i>
                </a> */}
                    {/* <LinkedInIcon className="space"
                  fontSize="large"
                  onClick={() => window.open("https://www.Linkedin.com")}
                />
                <a>
                  <i class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x">
                    {" "}
                  </i>
                </a> */}
                    {/* <InstagramIcon className="space"
                  fontSize="large"
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fdirect%2Finbox%2F%3F__coig_login%3D1"
                    )
                  }
                /> */}
                    {/* <a class="gplus-ic">
                  <i class="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x">
                    {" "}
                  </i>
                </a> */}
                    {/* https://twitter.com/SheharyarHere?fbclid=IwAR19xg2GVOBJ3NPFHH_oerr8MuATFqOaTTFlcuhvJcwJvhn873shPW1Q45U 
                <TwitterIcon className="space"
                  fontSize="large"
                  onClick={() =>
                    window.open(
                      "https://twitter.com/SheharyarHere?fbclid=IwAR19xg2GVOBJ3NPFHH_oerr8MuATFqOaTTFlcuhvJcwJvhn873shPW1Q45U "
                    )
                  }
                /> */}
                    {/* <a class="li-ic">
                  <i class="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x">
                    {" "}
                  </i>
                </a> */}
                  </div>
                </div>
              </div>
            </div>

            <div class="footer-copyright text-center" id="ab">
              © 2022 Copyright:
              <a href="/" id="ab">
                {" "}
                www.BusGo.com
              </a>
            </div>
          </footer>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Footer;
