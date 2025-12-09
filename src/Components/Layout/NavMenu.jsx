import { useState } from "react";
import { NavLink } from "react-router-dom";
import UseWrapper from "../Common/UseWrapper";
import { Pages, Forms } from "../../Data/Pages";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import Content from "../../Data/Content";

export default function NavMenu(isActive) {
    let isOpen = isActive;
    const Links = [
        {
            title: "Pages",
            className: "pages",
            links: Pages
        },
        {
            title: "Forms",
            className: "forms",
            links: Forms
        }
    ];
    const Socials = [
        {
            icon: <Instagram />,
            label: "Instagram"
        },
        {
            icon: <Facebook />,
            label: "Facebook"
        },
        {
            icon: <Linkedin />,
            label: "Linkedin"
        }
    ];
    return (
        <header className="" style={{
            height: (isOpen) ? "100vh" : "0vh",
            overflow: "hidden"
        }}>
            <UseWrapper>
                <div className="top">
                    <div className="logo">
                        <p className={`${isOpen ? "open" : ""}`} style={{
                            fontSize: (isOpen) ? "5rem" : "2rem"
                        }}>ProMa</p>
                    </div>
                    <div className="links">
                        {Links.map((link, index) => (
                            <ul key={index} className={`${link.className}-links`}>
                                <p className={`${isOpen ? "open" : ""} links-title`}>{link.title}</p>
                                {link.links.map((link, index) => (
                                    <li key={index} className={`${isOpen ? "open" : ""} link`}>
                                        <NavLink to={link.slug} onClick={() => isOpen = !isOpen}>
                                            <p style={{
                                                fontSize: (isOpen) ? "2rem" : "0.5rem"
                                            }}>{link.title}</p>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
                <div className="bottom">
                    <div className="socials">
                        {Socials.map((social, index) => (
                            <div key={index} className="social">
                                <p>{social.label}</p>
                                <div className="icon">
                                    {social.icon}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="contact">
                        <div className="email">
                            {Content.pagesContents.contact.info.details[1].labels.map((label, index) => (
                                <p key={index} style={{
                                    fontSize: (isOpen) ? "1rem" : "0.5rem"
                                }}>{label}</p>
                            ))}
                        </div>
                        <div className="numbers">
                            {Content.pagesContents.contact.info.details[2].labels.map((label, index) => (
                                <p key={index} style={{
                                    fontSize: (isOpen) ? "1rem" : "0.5rem"
                                }}>{label}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </UseWrapper>
        </header>
    )
}