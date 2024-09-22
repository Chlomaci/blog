import React, {FC} from "react";
import {useAppSelector} from "../hooks/redux";
import NightButton from "./UI/NightButton";
import './style/header.scss'
import {Button, createTheme, ThemeProvider} from "@mui/material";
import {grey} from "@mui/material/colors";

const Header: FC<{onModal: () => void}> = ({onModal}) => {

    const {login} = useAppSelector(state => state.userReducer)
    const btnTheme = createTheme({
        palette: {
            primary: {
                main: grey[900]
            }
        },
    });

    return (
        <header className="header">
            <div className="header__name">{login}</div>
            <ThemeProvider theme={btnTheme} >
                <Button variant="text" onClick={onModal}>
                    Добавить пост
                </Button>
            </ThemeProvider>
            <ul className="header__menu">
                <li className="header__item">Посты</li>
                <li className="header__item">О блоге</li>
                <NightButton/>
            </ul>
        </header>
    )
}

export default Header;