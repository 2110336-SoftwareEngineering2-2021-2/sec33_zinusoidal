
import { NONAME } from "dns";
import React from "react";
import { SymbolDisplayPartKind } from "typescript";
import { COLOR } from "../CONSTANT";

const LoginForm: React.FC = ({ children }) => {
  return (
    <div
      style={{
        //remove when background color change
        border:"1px #000000 solid",
        //remove when background color change
        margin:0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 390,
        height: 531,
        background: "#FFFFFF",
        padding:50,
        rowGap: 30,
        borderRadius:20,
        position:"absolute",
        left:162,
        top:210,

        color: "#000000",
        fontFamily: "Baloo 2",
        fontWeight: "bold",
      }}
    >
        <p style={{
          color: COLOR["violet/800"],
          margin:0,
          fontSize: 64
        }}
        >Fortune 168</p>
        <p style={{
          margin:0,
          width:"100%",
          fontSize: 36,
        }}
        >Login</p>

        <div style={{
            margin:0,
            width:"100%"
            }}>
          <p style={{
            margin:0,
            fontSize: 16
            }}
          >Username</p>
          <input type="text" id="fname" name="fname" style={{
            width:"100%",
            height:32,
            borderRadius:8,
            }}/>
        </div>   
        <div style={{
            width:"100%"
            }}>
          <p style={{
            margin:0,
            fontSize: 16
            }}
          >Password</p>
          <input type="password" id="fname" name="fname" style={{
            width:"100%",
            height:32,
            borderRadius:8,
            }}/>
        </div>    

        <div style={{
            display:"flex",
            width:"100%",
            fontSize: 16,
            columnGap:8,
            justifyContent:"space-between"

            }}>
          <div style={{
            display:"flex",
            columnGap:8,
            alignItems: "center",
            textAlign: "center",
            }}>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style={{
              width:24,
              height:24,
            }}/>
            <p style={{
                }}>Remember me</p>
          </div>
          <p style={{
              textDecoration:"none",
              color: COLOR["magenta/300"],
              
              }}>Forget password?</p>
        </div>  

        <button style={{
            border:"none",
            width:"100%",
            height:55,
            backgroundColor:COLOR["violet/400"],
            textDecoration:"none",
            color: "#ffffff",
            borderRadius: 10000,
            fontFamily: "Baloo 2",
            fontWeight: "bold",
            fontSize: 24}}
        >Login</button>
        
        {children}
    </div>

  );
};

export default LoginForm;