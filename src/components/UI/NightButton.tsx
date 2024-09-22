import React, {FC, useState} from 'react'
import DayNightToggle from 'react-day-and-night-toggle'

const NightButton: FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    return (
        <DayNightToggle
            onChange={() => setIsDarkMode(!isDarkMode)}
            checked={isDarkMode}
        />
    )
}

export default NightButton;