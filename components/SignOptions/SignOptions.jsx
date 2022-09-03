import styles from './SignOptions.module.scss';
import TextInput from '../inputs/TextInput';
import CheckboxExpander from '../inputs/CheckboxExpander';
import Button from '../Button';
import { useEffect, useState } from 'react';

const Options = ({ localOptions, setLocalOptions, signId }) => {
    let [submitButtonLabel, setSubmitButtonLabel] = useState('Save');
    let [submitButtonIcon, setSubmitButtonIcon] = useState('/check.svg');

    // function submit(e) {
    //     setSubmitButtonLabel('Saving');
    //     setSubmitButtonIcon('/loading.svg');
    //     const url = `https://subway-arrivals.herokuapp.com/signinfo/${signId}?minArrivalTime=${localOptions.minimum_time}&warnTime=${localOptions.warn_time}&signDirection=${localOptions.direction || ''}&signRotation=${localOptions.rotating}&numArrivals=${localOptions.max_arrivals_to_show}&cycleTime=${localOptions.rotation_time}&autoOff=${localOptions.shutoff_schedule}&autoOffStart=${formatTime(localOptions.turnoff_time)}&autoOffEnd=${formatTime(localOptions.turnon_time)}`;
    //     console.log(url);
    //     fetch(url, {method: 'POST'})
    //     .then(res => res.json())
    //     .then(() => {
    //         setTimeout(() => {
    //             setSubmitButtonLabel('Saved!');
    //             setSubmitButtonIcon('/check.svg');
    //             setTimeout(() => {
    //                 setSubmitButtonLabel('Save');
    //             }, 2500);
    //         }, 1000);
    //     })
    // }

    function inputHandler(e) {
        const value = e.target.value;
        const property = e.target.id;
        
        if (value != '') {
            setLocalOptions(prevOptions => {
                return { ...prevOptions, [property]: value};
            });
        }
    }
    
    function checkboxHandler(e) {
        const value = e.target.checked;
        const property = e.target.id;

        if (property === 'direction' && value === false) {
            value = '';
        }
        setLocalOptions(prevOptions => {
            return { ...prevOptions, [property]: value};
        });
    }

    return (
        <div className={styles['options__container']}>
            <form className={styles.options}>
                <h2>Sign options</h2>
                <TextInput
                    className={styles.input}
                    id="minimum_time"
                    label="Show arrivals no earlier than..."
                    type="number"
                    value={localOptions.minimum_time}
                    unit="minutes"
                    inputHandler={inputHandler}/>
                <TextInput 
                    className={styles.input}
                    id="warn_time"
                    label="Warn when trains are arriving within..."
                    type="number"
                    value={localOptions.warn_time}
                    unit="minutes"
                    inputHandler={inputHandler}/>
                <CheckboxExpander
                    id="direction"
                    label= "Choose a direction to show"
                    description="Only show arrivals for trains going in the chosen direction"
                    checked={localOptions.direction !== ""}
                    inputHandler={checkboxHandler}>
                    <fieldset id="direction" onChange={inputHandler} >
                        <label className="checkbox-expander__label" htmlFor="">
                            <input id="direction" type="radio" name="direction" value="N" defaultChecked={(localOptions.direction === 'N')}/>
                            Uptown
                        </label>
                        <label className="checkbox-expander__label" htmlFor="">
                            <input id="direction" type="radio" name="direction" value="S" defaultChecked={(localOptions.direction === 'S')}/>
                            Downtown
                        </label>
                    </fieldset>
                </CheckboxExpander>
                <CheckboxExpander
                    id="rotating"
                    label="Rotate the second row"
                    description="The first row of the sign will always show the next upcoming train, while the second line will cycle through as many arrivals as you specify."
                    checked={localOptions.rotating}
                    inputHandler={checkboxHandler}>

                    <TextInput 
                        className={styles.input}
                        id="max_arrivals_to_show"
                        label="Show up to..."
                        type="number"
                        value={localOptions.max_arrivals_to_show}
                        unit="arrivals"
                        inputHandler={inputHandler}/>
                    <TextInput 
                        className={styles.input}
                        id="rotation_time"
                        label="Cycle the second row every..."
                        type="number"
                        value={localOptions.rotation_time}
                        unit="seconds"
                        inputHandler={inputHandler}/>

                </CheckboxExpander>
                <CheckboxExpander
                    id="shutoff_schedule"
                    label="Turn the display off automatically"
                    description="The display will power itself off during the specified times"
                    checked={localOptions.shutoff_schedule}
                    inputHandler={checkboxHandler}>
                    <TextInput 
                        className={styles.input}
                        id="turnoff_time"
                        label="Turn off at..."
                        type="time"
                        value={localOptions.turnoff_time}
                        unit=""
                        inputHandler={inputHandler}/>
                    <TextInput 
                        className={styles.input}
                        id="turnon_time"
                        label="Turn on at..."
                        type="time"
                        value={localOptions.turnon_time}
                        unit=""
                        inputHandler={inputHandler}/>

                </CheckboxExpander>
            </form>
        </div>
    )
}

export default Options;