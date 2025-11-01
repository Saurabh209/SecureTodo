import { useContext, useRef, useState } from "react";
import { Context } from "../../main";
import ShinyText from '../../../ReactBitsComponents/ShinyText'
import TextPressure from '../../../ReactBitsComponents/TextPressure/TextPressure'
import VariableProximity from "../../../ReactBitsComponents/VariableProximity/VariableProximity";





function UserStrip({ user }) {
    const containerRef = useRef(null);

    return (
        <div className="userStrip"
        >
            <div className="strip-left" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <img
                    src="/img/userProfile.png"
                    alt="App Logo"
                    style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "8px",
                       
                        padding: "6px",
                    }}
                />
                <div className="strip-left-text">
                    <div
                        ref={containerRef}
                        style={{ position: 'relative' }}
                    >
                        <p>
                            Welcome Back! {" "}
                            <span>
                                <VariableProximity
                                    label={`${user?.fullname}`}
                                    className={'variable-proximity-demo'}
                                    fromFontVariationSettings="'wght' 200, 'opsz' 19"
                                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                                    containerRef={containerRef}
                                    radius={100}
                                    falloff='linear'
                                />
                            </span>
                        </p>

                    </div>
                    {/* <div style={{ position: 'relative', }}>
                        <TextPressure
                            text={`Welcome back`}
                            flex={true}
                            alpha={false}
                            stroke={false}
                            width={true}
                            weight={true}
                            italic={true}
                            textColor="#ffffff"
                            strokeColor="#ff0000"
                            minFontSize={6}
                        />
                    </div> */}
                    <div
                        style={{
                            fontSize: "14px",
                            opacity: 0.85,
                        }}
                    >
                        <ShinyText
                            text={`Ready to continue your session`}
                            disabled={false}
                            speed={3}
                            className='custom-class'
                        />

                    </div>
                </div>
            </div>

            <div className="strip-right"
                style={{
                    textAlign: "right",
                    fontSize: "14px",
                    opacity: 0.95,
                    lineHeight: "1.4",
                }}
            >

                <div  style={{ fontWeight: "600" }}>@{user?.username}</div>
                <ShinyText
                    text={`${user?.email || "abc@gmail.com"}`}
                    disabled={false}
                    speed={4}
                    className='custom-class'
                />
            </div>
        </div>
    )


}

export default UserStrip