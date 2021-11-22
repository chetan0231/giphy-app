import React,{useState} from "react";
import axios from 'axios'
import FacebookLogin from "react-facebook-login";
import fbLogin from './fbLogin'

export default function Login() {
    const [social,setSocial] = useState()
    const responseFacebook = async (response) => {
        let fbResponse  = await fbLogin(response.accessToken)
        console.log(fbResponse);
        console.log(response);
    }
  return (
    <div>
      <FacebookLogin
        appId="381643486845767"
        autoLoad={true}
        fields="name,email,picture"
        // onClick={componentClicked}
        callback={responseFacebook}
      />
    </div>
  );
}
